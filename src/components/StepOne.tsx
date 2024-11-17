import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { generateBlogOutline } from "@/services/blogService";
import { BlogOutline } from "@/types/blog";

interface StepOneProps {
  onNext: (outline: BlogOutline) => void;
}

export const StepOne = ({ onNext }: StepOneProps) => {
  const [topic, setTopic] = useState("");
  const [shortTailKeyword, setShortTailKeyword] = useState("");
  const [longTailKeywords, setLongTailKeywords] = useState<string[]>([]);
  const { toast } = useToast();

  const generateOutlineMutation = useMutation({
    mutationFn: generateBlogOutline,
    onSuccess: (data) => {
      toast({
        title: "Outline Generated",
        description: "Your blog outline has been successfully generated!",
      });
      onNext(data);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to generate outline. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addLongTailKeyword = () => {
    setLongTailKeywords([...longTailKeywords, ""]);
  };

  const updateLongTailKeyword = (index: number, value: string) => {
    const newKeywords = [...longTailKeywords];
    newKeywords[index] = value;
    setLongTailKeywords(newKeywords);
  };

  const removeLongTailKeyword = (index: number) => {
    setLongTailKeywords(longTailKeywords.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateOutlineMutation.mutate({
      topic,
      shortTailKeyword,
      longTailKeywords: longTailKeywords.filter(Boolean),
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 animate-fade-in bg-white shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="topic" className="text-text-primary">Blog Topic</Label>
          <Input
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter your blog topic"
            className="w-full border-gray-200 focus:border-secondary"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortTail" className="text-text-primary">Short-Tail Keyword</Label>
          <Input
            id="shortTail"
            value={shortTailKeyword}
            onChange={(e) => setShortTailKeyword(e.target.value)}
            placeholder="Enter your main keyword"
            className="w-full border-gray-200 focus:border-secondary"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-text-primary">Long-Tail Keywords</Label>
          <div className="space-y-2">
            {longTailKeywords.map((keyword, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={keyword}
                  onChange={(e) => updateLongTailKeyword(index, e.target.value)}
                  placeholder="Enter a long-tail keyword"
                  className="flex-1 border-gray-200 focus:border-secondary"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeLongTailKeyword(index)}
                  className="text-text-secondary hover:text-text-primary"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full text-text-secondary hover:text-text-primary"
            onClick={addLongTailKeyword}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Long-Tail Keyword
          </Button>
        </div>

        <div className="pt-4">
          <Button 
            type="submit"
            className="w-full bg-primary hover:bg-primary-light text-white"
            disabled={generateOutlineMutation.isPending}
          >
            {generateOutlineMutation.isPending ? "Generating..." : "Generate Outline"}
          </Button>
        </div>
      </form>
    </Card>
  );
};