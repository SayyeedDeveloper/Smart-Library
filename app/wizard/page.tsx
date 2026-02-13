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

  // Use wider container for results page to fit chat + books
  const containerWidth = currentStep === "results" ? "max-w-[1600px]" : "max-w-5xl";

  return (
    <>
      {currentStep === "results" ? (
        // Results page: Full-screen layout with sidebar
        <div className="relative">
          {/* Main Content - Full Screen */}
          <StepComponent />
        </div>
      ) : (
        // Other steps: Traditional contained layout
        <div className="min-h-screen bg-background relative overflow-hidden">
          {/* Floating decorative shapes - MORE & MORE VISIBLE */}
          <div className="pointer-events-none absolute -left-4 top-10 h-32 w-32 rounded-full bg-[#1d80dd]/35 blur-2xl" />
          <div className="pointer-events-none absolute -right-8 top-32 h-40 w-40 rounded-full bg-[#ff9f40]/30 blur-3xl" />
          <div className="pointer-events-none absolute left-1/3 bottom-20 h-28 w-28 rounded-full bg-[#f7d94c]/40 blur-2xl" />
          <div className="pointer-events-none absolute right-1/4 top-64 h-24 w-24 rounded-full bg-[#d85085]/35 blur-xl" />
          <div className="pointer-events-none absolute left-1/2 bottom-40 h-32 w-32 rounded-full bg-[#1d80dd]/30 blur-2xl" />
          <div className="pointer-events-none absolute -right-4 bottom-32 h-28 w-28 rounded-full bg-[#ff9f40]/35 blur-xl" />

          <div className={`container mx-auto px-4 py-8 ${containerWidth}`}>
            {/* Progress Indicator */}
            <WizardProgress
              currentStep={currentStep}
              completedSteps={completedSteps}
            />

            {/* Main Content - Glassmorphism */}
            <div className="glass-card rounded-2xl shadow-xl border border-white/20 p-8 my-8">
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
      )}
    </>
  );
}

export default function WizardPage() {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  );
}
