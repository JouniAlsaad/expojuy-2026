"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { SuggestedQuestion } from "../data/suggested-questions";

interface SuggestedChipsProps {
  questions: SuggestedQuestion[];
  label: string;
  visible: boolean;
  onSelect: (question: SuggestedQuestion) => void;
}

export function SuggestedChips({ questions, label, visible, onSelect }: SuggestedChipsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {visible ? (
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <ul aria-label={label} className="flex flex-wrap gap-2">
            {questions.map((question) => (
              <li key={question.id}>
                <button
                  type="button"
                  onClick={() => onSelect(question)}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-left text-foreground text-sm transition-colors hover:border-primary/40 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {question.label}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
