import React from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { WizardData } from "@/types";

interface FilterChipsProps {
  wizardData: WizardData;
  onRemoveInterest?: (interest: string) => void;
  onRemoveGenre?: (genre: string) => void;
}

export function FilterChips({
  wizardData,
  onRemoveInterest,
  onRemoveGenre,
}: FilterChipsProps) {
  const hasFilters =
    wizardData.interests.length > 0 ||
    wizardData.genres.length > 0 ||
    wizardData.ageGroup ||
    wizardData.language;

  if (!hasFilters) {
    return null;
  }

  // Helper to format display text
  const formatLabel = (value: string): string => {
    return value
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-muted-foreground">
        Showing results for:
      </p>

      <div className="flex flex-wrap gap-2">
        {/* Age Group */}
        {wizardData.ageGroup && (
          <Badge variant="secondary" className="text-sm px-3 py-1.5">
            Ages {wizardData.ageGroup}
          </Badge>
        )}

        {/* Language */}
        {wizardData.language && (
          <Badge variant="secondary" className="text-sm px-3 py-1.5">
            {formatLabel(wizardData.language)}
          </Badge>
        )}

        {/* Interests (removable) */}
        {wizardData.interests.map(interest => (
          <Badge
            key={interest}
            variant="outline"
            className="text-sm px-3 py-1.5 pr-1.5 gap-1.5"
          >
            {formatLabel(interest)}
            {onRemoveInterest && (
              <button
                onClick={() => onRemoveInterest(interest)}
                className="hover:bg-muted rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${interest} filter`}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </Badge>
        ))}

        {/* Genres (removable) */}
        {wizardData.genres.map(genre => (
          <Badge
            key={genre}
            variant="outline"
            className="text-sm px-3 py-1.5 pr-1.5 gap-1.5"
          >
            {formatLabel(genre)}
            {onRemoveGenre && (
              <button
                onClick={() => onRemoveGenre(genre)}
                className="hover:bg-muted rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${genre} filter`}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </Badge>
        ))}
      </div>
    </div>
  );
}
