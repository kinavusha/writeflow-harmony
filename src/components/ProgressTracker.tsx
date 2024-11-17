import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
}

interface ProgressTrackerProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export const ProgressTracker = ({
  steps,
  currentStep,
  onStepClick,
}: ProgressTrackerProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center relative z-10"
              style={{ flex: 1 }}
            >
              <button
                onClick={() => onStepClick(step.id)}
                disabled={step.id > currentStep}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  isCompleted
                    ? "bg-primary text-white cursor-pointer"
                    : isCurrent
                    ? "bg-secondary text-white"
                    : "bg-surface text-text-secondary cursor-not-allowed"
                )}
              >
                {step.id}
              </button>
              <span
                className={cn(
                  "mt-2 text-sm font-medium",
                  isCurrent ? "text-secondary" : "text-text-secondary"
                )}
              >
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-5 left-1/2 w-full h-[2px]",
                    isCompleted ? "bg-primary" : "bg-surface"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};