import React from "react";
import { useWizard } from "@/lib/wizard-context";
import { OptionCard } from "@/components/shared/option-card";
import { AGE_GROUPS } from "@/types";

export function AgeStep() {
  const { wizardData, updateField } = useWizard();

  const handleSelect = (ageGroup: string) => {
    updateField("ageGroup", ageGroup);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          How old are you?
        </h1>
        <p className="text-muted-foreground">
          This helps us find age-appropriate books just for you.
        </p>
      </div>

      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {AGE_GROUPS.map((ageGroup) => (
          <OptionCard
            key={ageGroup}
            value={ageGroup}
            label={`${ageGroup} years old`}
            icon="user"
            selected={wizardData.ageGroup === ageGroup}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}
