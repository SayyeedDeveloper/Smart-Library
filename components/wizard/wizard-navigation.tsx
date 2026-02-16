import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Step, STEPS } from "@/types";

interface WizardNavigationProps {
  currentStep: Step;
  canGoNext: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onReset: () => void;
}

export function WizardNavigation({
  currentStep,
  canGoNext,
  onNext,
  onPrevious,
  onReset,
}: WizardNavigationProps) {
  const currentStepIndex = STEPS.indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isResultsStep = currentStep === "results";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 pt-6 border-t">
        {/* Left side - Back / Start Over */}
        <div>
          {!isFirstStep && !isResultsStep && (
            <Button
              variant="outline"
              onClick={onPrevious}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          )}
          {isResultsStep && (
            <Button
              variant="outline"
              onClick={onReset}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Start Over
            </Button>
          )}
        </div>

        <div className="text-center space-y-1 py-2">
          <p className="text-xs sm:text-sm font-medium text-foreground">
            Made with ❤️ by ABUIV
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            Andijan region, Khojaabad district, School №2
          </p>
        </div>

        {/* Right side - Next / View Results */}
        <div>
          {!isResultsStep && (
            <Button
              onClick={onNext}
              disabled={!canGoNext}
              className="gap-2"
            >
              {currentStepIndex === STEPS.length - 2 ? "View Results" : "Next"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
