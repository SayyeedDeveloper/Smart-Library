"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { WizardData, Step, STEPS, BookRecommendation } from "@/types";
import { getRecommendations } from "./recommendation-engine";

// LocalStorage key
const STORAGE_KEY = "smart-lib-wizard";

// Initial wizard data
const initialWizardData: WizardData = {
  name: "",
  ageGroup: "",
  interests: [],
  genres: [],
  language: "",
};

// Context type
interface WizardContextType {
  // Wizard data
  wizardData: WizardData;
  currentStep: Step;
  completedSteps: Step[];
  recommendations: BookRecommendation[];

  // Actions
  updateField: <K extends keyof WizardData>(field: K, value: WizardData[K]) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: Step) => void;
  resetWizard: () => void;
  isStepValid: (step: Step) => boolean;
  isStepCompleted: (step: Step) => boolean;
}

// Create context
const WizardContext = createContext<WizardContextType | undefined>(undefined);

// Inner provider that uses searchParams
function WizardProviderInner({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current step from URL, default to 'name'
  const currentStep = (searchParams.get("step") as Step) || "name";

  // State
  const [wizardData, setWizardData] = useState<WizardData>(initialWizardData);
  const [completedSteps, setCompletedSteps] = useState<Step[]>([]);
  const [recommendations, setRecommendations] = useState<BookRecommendation[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setWizardData(parsed.wizardData || initialWizardData);
        setCompletedSteps(parsed.completedSteps || []);
      } catch (error) {
        console.error("Failed to load saved wizard data:", error);
      }
    }
  }, []);

  // Save to localStorage whenever wizardData or completedSteps changes
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ wizardData, completedSteps })
    );
  }, [wizardData, completedSteps]);

  // Calculate recommendations when we reach the results step
  useEffect(() => {
    if (currentStep === "results" && wizardData.name && wizardData.ageGroup) {
      const recs = getRecommendations(wizardData);
      setRecommendations(recs);
    }
  }, [currentStep, wizardData]);

  // Validation for each step
  const isStepValid = useCallback((step: Step): boolean => {
    switch (step) {
      case "name":
        return wizardData.name.trim().length >= 2 && wizardData.name.trim().length <= 50;
      case "age":
        return wizardData.ageGroup !== "";
      case "interests":
        return wizardData.interests.length > 0;
      case "genre":
        return wizardData.genres.length > 0;
      case "language":
        return wizardData.language !== "";
      case "results":
        return true; // Results step is always valid
      default:
        return false;
    }
  }, [wizardData]);

  // Check if a step is completed
  const isStepCompleted = useCallback((step: Step): boolean => {
    return completedSteps.includes(step);
  }, [completedSteps]);

  // Update a field in wizard data
  const updateField = useCallback(<K extends keyof WizardData>(
    field: K,
    value: WizardData[K]
  ) => {
    setWizardData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Navigate to a specific step
  const goToStep = useCallback((step: Step) => {
    router.push(`/wizard?step=${step}`);
  }, [router]);

  // Go to next step
  const nextStep = useCallback(() => {
    if (!isStepValid(currentStep)) {
      return; // Don't proceed if current step is invalid
    }

    // Mark current step as completed
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
    }

    // Find next step
    const currentIndex = STEPS.indexOf(currentStep);
    const nextIndex = currentIndex + 1;

    if (nextIndex < STEPS.length) {
      goToStep(STEPS[nextIndex]);
    }
  }, [currentStep, isStepValid, completedSteps, goToStep]);

  // Go to previous step
  const previousStep = useCallback(() => {
    const currentIndex = STEPS.indexOf(currentStep);
    const previousIndex = currentIndex - 1;

    if (previousIndex >= 0) {
      goToStep(STEPS[previousIndex]);
    }
  }, [currentStep, goToStep]);

  // Reset wizard to initial state
  const resetWizard = useCallback(() => {
    setWizardData(initialWizardData);
    setCompletedSteps([]);
    setRecommendations([]);
    localStorage.removeItem(STORAGE_KEY);
    goToStep("name");
  }, [goToStep]);

  const value: WizardContextType = {
    wizardData,
    currentStep,
    completedSteps,
    recommendations,
    updateField,
    nextStep,
    previousStep,
    goToStep,
    resetWizard,
    isStepValid,
    isStepCompleted,
  };

  return (
    <WizardContext.Provider value={value}>
      {children}
    </WizardContext.Provider>
  );
}

// Outer provider with Suspense boundary
export function WizardProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <WizardProviderInner>{children}</WizardProviderInner>
    </Suspense>
  );
}

// Custom hook to use the wizard context
export function useWizard() {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
}
