import { supabase } from "@/integrations/supabase/client";
import { BlogOutline, GenerateOutlineRequest } from "@/types/blog";

export const generateBlogOutline = async (
  data: GenerateOutlineRequest
): Promise<BlogOutline> => {
  const { data: response, error } = await supabase.functions.invoke('generate-blog-outline', {
    body: data
  });

  if (error) {
    throw new Error('Failed to generate blog outline');
  }

  return {
    introduction: response.outline.introduction,
    sections: response.sections.map((section: any) => ({
      title: section.title,
      subsections: section.subsections
    })),
    conclusion: response.outline.conclusion
  };
};

export const saveBlogMetadata = async (
  outlineId: string,
  metadata: {
    internalLinks: string[];
    externalLinks: string[];
    statistics: string[];
  }
) => {
  const { error } = await supabase
    .from('blog_metadata')
    .insert({
      outline_id: outlineId,
      internal_links: metadata.internalLinks,
      external_links: metadata.externalLinks,
      statistics: metadata.statistics
    });

  if (error) {
    throw new Error('Failed to save blog metadata');
  }
};

export const updateSectionContent = async (sectionId: string, content: string) => {
  const { error } = await supabase
    .from('blog_sections')
    .update({ content })
    .eq('id', sectionId);

  if (error) {
    throw new Error('Failed to update section content');
  }
};