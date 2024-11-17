import { useState } from "react";
import { ProgressTracker } from "@/components/ProgressTracker";
import { StepOne } from "@/components/StepOne";

const steps = [
  { id: 1, title: "Topic & Keywords" },
  { id: 2, title: "Links & Stats" },
  { id: 3, title: "Write Content" },
  { id: 4, title: "Review & Export" },
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepClick = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
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

        {currentStep === 1 && <StepOne onNext={handleNext} />}
      </div>
    </div>
  );
};

export default Index;