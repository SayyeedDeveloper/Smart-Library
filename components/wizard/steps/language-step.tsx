import React from "react";
import { useWizard } from "@/lib/wizard-context";
import { OptionCard } from "@/components/shared/option-card";
import { LANGUAGES } from "@/types";

export function LanguageStep() {
  const { wizardData, updateField } = useWizard();

  const handleSelect = (language: string) => {
    updateField("language", language);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          What language?
        </h1>
        <p className="text-muted-foreground">
          Choose the language you'd like to read in.
        </p>
      </div>

      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {LANGUAGES.map((option) => (
          <OptionCard
            key={option.value}
            value={option.value}
            label={option.label}
            icon={option.icon}
            description={option.description}
            selected={wizardData.language === option.value}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}
