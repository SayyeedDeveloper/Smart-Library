import React from "react";
import { useWizard } from "@/lib/wizard-context";
import { OptionCard } from "@/components/shared/option-card";
import { GENRES } from "@/types";
import { RobotMascot } from "@/components/shared/robot-mascot";

export function GenreStep() {
  const { wizardData, updateField } = useWizard();

  const handleSelect = (genre: string) => {
    const currentGenres = wizardData.genres;
    const newGenres = currentGenres.includes(genre)
      ? currentGenres.filter(g => g !== genre)
      : [...currentGenres, genre];

    updateField("genres", newGenres);
  };

  return (
    <div className="space-y-6">
      {/* Friendly Robot Mascot */}
      <div className="flex justify-center">
        <RobotMascot variant="robot" size="lg" />
      </div>

      <div className="text-center space-y-2">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          What genres do you like? 📖
        </h1>
        <p className="text-muted-foreground">
          Pick your favorite types of stories. You can choose more than one!
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <p className="text-sm text-muted-foreground text-center mb-4">
          {wizardData.genres.length > 0
            ? `${wizardData.genres.length} selected`
            : "Choose at least one"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GENRES.map((option) => (
            <OptionCard
              key={option.value}
              value={option.value}
              label={option.label}
              icon={option.icon}
              description={option.description}
              selected={wizardData.genres.includes(option.value)}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
