import React from "react";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

interface OptionCardProps {
  value: string;
  label: string;
  icon?: string;
  description?: string;
  selected: boolean;
  onSelect: (value: string) => void;
}

export function OptionCard({
  value,
  label,
  icon,
  description,
  selected,
  onSelect,
}: OptionCardProps) {
  // Dynamically get the icon component
  const IconComponent = icon
    ? (LucideIcons as any)[icon.split('-').map((word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join('') as keyof typeof LucideIcons]
    : null;

  const handleClick = () => {
    onSelect(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(value);
    }
  };

  return (
    <Card
      className={cn(
        "relative cursor-pointer transition-all duration-200",
        "hover:shadow-md active:scale-[0.98]",
        "p-4 flex items-center gap-3",
        selected && "border-2 border-primary bg-primary/10"
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="checkbox"
      aria-checked={selected}
      aria-label={`${label}${description ? `: ${description}` : ''}`}
    >
      {/* Icon */}
      {IconComponent && (
        <div className={cn(
          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
          selected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
        )}>
          <IconComponent className="w-5 h-5" />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={cn(
          "font-medium text-sm",
          selected && "text-primary"
        )}>
          {label}
        </p>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* Check icon */}
      {selected && (
        <Check className="flex-shrink-0 w-5 h-5 text-primary ml-auto" />
      )}
    </Card>
  );
}
