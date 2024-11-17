import { useState } from "react";
import { ProgressTracker } from "@/components/ProgressTracker";
import { StepOne } from "@/components/StepOne";
import { BlogOutline } from "@/types/blog";

const steps = [
  { id: 1, title: "Topic & Keywords" },
  { id: 2, title: "Links & Stats" },
  { id: 3, title: "Write Content" },
  { id: 4, title: "Review & Export" },
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [blogOutline, setBlogOutline] = useState<BlogOutline | null>(null);

  const handleStepClick = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const handleOutlineGenerated = (outline: BlogOutline) => {
    setBlogOutline(outline);
    setCurrentStep(2);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-text-primary">
          Article Writer
        </h1>
        
        <ProgressTracker
          steps={steps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />

        {currentStep === 1 && <StepOne onNext={handleOutlineGenerated} />}
      </div>
    </div>
  );
};

export default Index;