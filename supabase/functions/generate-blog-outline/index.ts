import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { topic, shortTailKeyword, longTailKeywords } = await req.json()

    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })
    const openai = new OpenAIApi(configuration)

    const prompt = `Generate a blog outline for the topic: "${topic}"
    Short-tail keyword: ${shortTailKeyword}
    Long-tail keywords: ${longTailKeywords.join(', ')}

    Follow this structure:
    1. Analyze the topic to create 5 user intent questions
    2. Transform these questions into engaging section titles
    3. Create 3 subsections for each section with:
       - Purpose
       - 3-5 main points
    4. Create an introduction using AIDA framework:
       - Attention (compelling statistic)
       - Interest (topic relevance)
       - Desire (benefits)
       - Action (encourage reading)
    5. Create a conclusion with:
       - Key takeaways
       - CTA for Kinova Digital Marketing Services

    Return the response in JSON format.`

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    })

    const outline = completion.data.choices[0].message?.content
    const outlineData = JSON.parse(outline || '{}')

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Insert outline into database
    const { data: blogOutline, error: outlineError } = await supabaseClient
      .from('blog_outlines')
      .insert({
        topic,
        short_tail_keyword: shortTailKeyword,
        long_tail_keywords: longTailKeywords,
        introduction: outlineData.introduction,
        conclusion: outlineData.conclusion
      })
      .select()
      .single()

    if (outlineError) throw outlineError

    // Insert sections
    const sectionsToInsert = outlineData.sections.map((section: any, index: number) => ({
      outline_id: blogOutline.id,
      title: section.title,
      order_index: index,
      subsections: section.subsections
    }))

    const { data: sections, error: sectionsError } = await supabaseClient
      .from('blog_sections')
      .insert(sectionsToInsert)
      .select()

    if (sectionsError) throw sectionsError

    return new Response(
      JSON.stringify({ outline: blogOutline, sections }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})