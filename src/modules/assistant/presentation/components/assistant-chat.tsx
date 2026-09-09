"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { getMockedResponse } from "../data/mocked-responses";
import { type SuggestedQuestion, suggestedQuestions } from "../data/suggested-questions";
import { ChatInput } from "./chat-input";
import { MessageBubble, type MessageRole } from "./message-bubble";
import { SuggestedChips } from "./suggested-chips";

interface ChatMessage {
  id: number;
  role: MessageRole;
  text: string;
}

const typingDelayMs = 1200;

function TypingIndicator({ label }: { label: string }) {
  const prefersReducedMotion = useReducedMotion();
  const dots = [0, 1, 2];

  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-xl rounded-bl-sm bg-muted px-4 py-3">
        <span className="sr-only">{label}</span>
        {dots.map((dot) => (
          <motion.span
            key={dot}
            aria-hidden
            className="size-2 rounded-full bg-muted-foreground"
            animate={prefersReducedMotion ? undefined : { y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 0.9,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              delay: dot * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function AssistantChat() {
  const t = useTranslations("assistant");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const nextIdRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const send = (text: string, questionId?: string) => {
    if (isTyping) {
      return;
    }
    const responseText = getMockedResponse(questionId);
    const userMessage: ChatMessage = { id: nextIdRef.current++, role: "user", text };
    setMessages((previous) => [...previous, userMessage]);
    setIsTyping(true);
    timeoutRef.current = window.setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: nextIdRef.current++,
        role: "assistant",
        text: responseText,
      };
      setMessages((previous) => [...previous, assistantMessage]);
      setIsTyping(false);
    }, typingDelayMs);
  };

  const handleSelect = (question: SuggestedQuestion) => {
    send(question.label, question.id);
  };

  const hasStarted = messages.length > 0;

  return (
    <div className="flex flex-col gap-4">
      {hasStarted ? (
        <div
          role="log"
          aria-live="polite"
          aria-label={t("conversationLabel")}
          className="flex flex-col gap-3"
        >
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <MessageBubble key={message.id} role={message.role} text={message.text} />
            ))}
          </AnimatePresence>
          {isTyping ? <TypingIndicator label={t("typingLabel")} /> : null}
        </div>
      ) : null}

      <SuggestedChips
        questions={suggestedQuestions}
        label={t("suggestionsLabel")}
        visible={!hasStarted}
        onSelect={handleSelect}
      />

      <ChatInput
        placeholder={t("inputPlaceholder")}
        label={t("inputLabel")}
        sendLabel={t("sendLabel")}
        disabled={isTyping}
        onSend={(text) => send(text)}
      />
    </div>
  );
}
