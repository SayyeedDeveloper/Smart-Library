import React from "react";
import { useWizard } from "@/lib/wizard-context";
import { OptionCard } from "@/components/shared/option-card";
import { INTERESTS } from "@/types";
import { RobotMascot } from "@/components/shared/robot-mascot";

export function InterestsStep() {
  const { wizardData, updateField } = useWizard();

  const handleSelect = (interest: string) => {
    const currentInterests = wizardData.interests;
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];

    updateField("interests", newInterests);
  };

  return (
    <div className="space-y-6">
      {/* Friendly Robot Mascot */}
      <div className="flex justify-center">
        <RobotMascot variant="think" size="lg" />
      </div>

      <div className="text-center space-y-2">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          What interests you? 🎯
        </h1>
        <p className="text-muted-foreground">
          Select all the topics that excite you. We'll find books that match!
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <p className="text-sm text-muted-foreground text-center mb-4">
          {wizardData.interests.length > 0
            ? `${wizardData.interests.length} selected`
            : "Choose at least one"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INTERESTS.map((option) => (
            <OptionCard
              key={option.value}
              value={option.value}
              label={option.label}
              icon={option.icon}
              description={option.description}
              selected={wizardData.interests.includes(option.value)}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
