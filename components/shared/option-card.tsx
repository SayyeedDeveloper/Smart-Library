import React from "react";
import { motion } from "framer-motion";
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
  index?: number;
}

export function OptionCard({
  value,
  label,
  icon,
  description,
  selected,
  onSelect,
  index = 0,
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card
        className={cn(
          "relative cursor-pointer transition-all duration-300",
          "hover:shadow-xl",
          "p-5 flex items-center gap-3 rounded-2xl",
          "glass-card-strong border-2",
          selected ? "border-primary bg-primary/20 shadow-lg shadow-primary/30" : "border-border"
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
        <Check className="flex-shrink-0 w-6 h-6 text-primary ml-auto animate-pop" />
      )}
    </Card>
    </motion.div>
  );
}
