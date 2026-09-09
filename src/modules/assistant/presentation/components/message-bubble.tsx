"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/shared/lib/utils";

export type MessageRole = "user" | "assistant";

interface MessageBubbleProps {
  role: MessageRole;
  text: string;
}

export function MessageBubble({ role, text }: MessageBubbleProps) {
  const prefersReducedMotion = useReducedMotion();
  const isUser = role === "user";

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      <p
        className={cn(
          "w-fit max-w-full break-words rounded-xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-lg",
          isUser
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-bl-sm bg-muted text-foreground",
        )}
      >
        {text}
      </p>
    </motion.div>
  );
}
