import React from "react";
import { Check } from "lucide-react";
import { Step, STEPS } from "@/types";
import { cn } from "@/lib/utils";

interface WizardProgressProps {
  currentStep: Step;
  completedSteps: Step[];
}

export function WizardProgress({ currentStep, completedSteps }: WizardProgressProps) {
  const currentStepIndex = STEPS.indexOf(currentStep);

  return (
    <div className="w-full py-6">
      {/* Desktop Progress */}
      <div className="hidden md:flex items-center justify-center gap-2">
        {STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(step);
          const isCurrent = step === currentStep;
          const isUpcoming = index > currentStepIndex;

          return (
            <React.Fragment key={step}>
              {/* Step Circle */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-200",
                  isCompleted && "bg-primary text-primary-foreground",
                  isCurrent && "ring-2 ring-primary ring-offset-2 bg-background text-primary scale-110",
                  isUpcoming && "border-2 border-muted bg-background text-muted-foreground"
                )}
                aria-label={`Step ${index + 1} of ${STEPS.length}`}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </div>

              {/* Connector Line */}
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 w-8 transition-colors duration-200",
                    index < currentStepIndex ? "bg-primary" : "bg-muted"
                  )}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile Progress */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentStepIndex + 1} of {STEPS.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(((currentStepIndex + 1) / STEPS.length) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / STEPS.length) * 100}%` }}
            role="progressbar"
            aria-valuenow={(currentStepIndex + 1) / STEPS.length * 100}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
  );
}
