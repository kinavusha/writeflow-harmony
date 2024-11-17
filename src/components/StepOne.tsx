import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, X } from "lucide-react";

export const StepOne = ({ onNext }: { onNext: () => void }) => {
  const [topic, setTopic] = useState("");
  const [shortTailKeyword, setShortTailKeyword] = useState("");
  const [longTailKeywords, setLongTailKeywords] = useState<string[]>([]);

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
    onNext();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="topic">Blog Topic</Label>
          <Input
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter your blog topic"
            className="w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortTail">Short-Tail Keyword</Label>
          <Input
            id="shortTail"
            value={shortTailKeyword}
            onChange={(e) => setShortTailKeyword(e.target.value)}
            placeholder="Enter your main keyword"
            className="w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Long-Tail Keywords</Label>
          <div className="space-y-2">
            {longTailKeywords.map((keyword, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={keyword}
                  onChange={(e) => updateLongTailKeyword(index, e.target.value)}
                  placeholder="Enter a long-tail keyword"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeLongTailKeyword(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={addLongTailKeyword}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Long-Tail Keyword
          </Button>
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full bg-primary hover:bg-primary-light">
            Generate Outline
          </Button>
        </div>
      </form>
    </Card>
  );
};