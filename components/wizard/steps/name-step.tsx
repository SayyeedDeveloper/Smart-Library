import React from "react";
import { Input } from "@/components/ui/input";
import { useWizard } from "@/lib/wizard-context";
import { RobotMascot } from "@/components/shared/robot-mascot";

export function NameStep() {
  const { wizardData, updateField } = useWizard();

  return (
    <div className="space-y-6">
      {/* Friendly Robot Mascot */}
      <div className="flex justify-center">
        <RobotMascot variant="happy" size="lg" />
      </div>

      <div className="text-center space-y-2">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          What's your name? 👋
        </h1>
        <p className="text-muted-foreground">
          Let's get to know you! We'll use this to personalize your experience.
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-3">
        <label htmlFor="name" className="block text-sm font-medium text-foreground">
          Your name
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={wizardData.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="text-center text-lg h-12"
          maxLength={50}
          autoFocus
          aria-required="true"
          aria-invalid={wizardData.name.length > 0 && wizardData.name.length < 2}
        />
        {wizardData.name.length > 0 && wizardData.name.length < 2 && (
          <p className="text-sm text-destructive text-center">
            Please enter at least 2 characters
          </p>
        )}
        {wizardData.name.length >= 2 && (
          <p className="text-sm text-primary text-center">
            Nice to meet you, {wizardData.name}!
          </p>
        )}
      </div>
    </div>
  );
}
