"use client";

import React from "react";
import { WizardProvider, useWizard } from "@/lib/wizard-context";
import { WizardProgress } from "@/components/wizard/wizard-progress";
import { WizardNavigation } from "@/components/wizard/wizard-navigation";
import { NameStep } from "@/components/wizard/steps/name-step";
import { AgeStep } from "@/components/wizard/steps/age-step";
import { InterestsStep } from "@/components/wizard/steps/interests-step";
import { GenreStep } from "@/components/wizard/steps/genre-step";
import { LanguageStep } from "@/components/wizard/steps/language-step";
import { ResultsStep } from "@/components/wizard/steps/results-step";
import { Step } from "@/types";

// Step component mapper
const STEP_COMPONENTS: Record<Step, React.ComponentType> = {
  name: NameStep,
  age: AgeStep,
  interests: InterestsStep,
  genre: GenreStep,
  language: LanguageStep,
  results: ResultsStep,
};

function WizardContent() {
  const {
    currentStep,
    completedSteps,
    nextStep,
    previousStep,
    resetWizard,
    isStepValid,
  } = useWizard();

  // Get the current step component
  const StepComponent = STEP_COMPONENTS[currentStep];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Progress Indicator */}
        <WizardProgress
          currentStep={currentStep}
          completedSteps={completedSteps}
        />

        {/* Main Content */}
        <div className="bg-card rounded-lg shadow-sm border p-8 my-8">
          <StepComponent />
        </div>

        {/* Navigation */}
        <WizardNavigation
          currentStep={currentStep}
          canGoNext={isStepValid(currentStep)}
          onNext={nextStep}
          onPrevious={previousStep}
          onReset={resetWizard}
        />
      </div>
    </div>
  );
}

export default function WizardPage() {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  );
}
