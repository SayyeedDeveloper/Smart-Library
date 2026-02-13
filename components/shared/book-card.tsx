"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookRecommendation } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookCardProps {
  recommendation: BookRecommendation;
  index?: number;
}

// Rotate through colorful pastel backgrounds
const cardColors = [
  "bg-[#d4f1f9]", // blue-light
  "bg-[#ffead4]", // orange-light
  "bg-[#fef5d4]", // yellow-light
  "bg-[#fce4ec]", // pink-light
  "bg-[#f3e5f5]", // purple-light
  "bg-[#e3f2fd]", // light blue
];

export function BookCard({ recommendation, index = 0 }: BookCardProps) {
  const { book, matchReasons } = recommendation;
  const [expanded, setExpanded] = useState(false);
  const bgColor = cardColors[index % cardColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 100 }}
      whileHover={{ y: -8, rotate: 0.5 }}
    >
      <Card className={cn("p-6 border-2 border-border shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl", bgColor)}>
      <div className="flex gap-4">
        {/* Cover Image */}
        <div className="flex-shrink-0">
          <img
            src={book.coverUrl}
            alt={`${book.title} cover`}
            className="w-20 h-28 rounded object-cover shadow-sm"
          />
        </div>

        {/* Book Details */}
        <div className="flex-1 min-w-0">
          {/* Title & Author */}
          <h3 className="font-heading font-semibold text-lg leading-tight mb-1">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            by {book.author}
          </p>

          {/* Metadata Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {book.ageGroup.map(age => (
              <Badge key={age} variant="secondary" className="text-xs">
                Ages {age}
              </Badge>
            ))}
            <Badge variant="outline" className="text-xs">
              {book.pageCount}p
            </Badge>
            <Badge variant="outline" className="text-xs">
              {book.publishedYear}
            </Badge>
          </div>

          {/* Match Reasons */}
          {matchReasons.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-medium text-primary mb-1">
                Why we recommend this:
              </p>
              <ul className="text-xs text-muted-foreground space-y-0.5">
                {matchReasons.slice(0, 2).map((reason, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          <div>
            <p className={cn(
              "text-sm text-foreground leading-relaxed",
              !expanded && "line-clamp-3"
            )}>
              {book.description}
            </p>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-primary hover:underline mt-1 flex items-center gap-1"
            >
              {expanded ? (
                <>
                  Show less <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  Read more <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Card>
    </motion.div>
  );
}
