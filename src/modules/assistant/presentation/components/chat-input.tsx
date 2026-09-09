"use client";

import { Send } from "lucide-react";
import { type FormEvent, useId, useState } from "react";
import { Button } from "@/shared/ui";

interface ChatInputProps {
  placeholder: string;
  label: string;
  sendLabel: string;
  disabled: boolean;
  onSend: (text: string) => void;
}

export function ChatInput({ placeholder, label, sendLabel, disabled, onSend }: ChatInputProps) {
  const inputId = useId();
  const [value, setValue] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (trimmed.length === 0 || disabled) {
      return;
    }
    onSend(trimmed);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        className="w-full rounded-full border-2 border-input bg-background py-3 pr-14 pl-4 text-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
      />
      <Button
        type="submit"
        size="icon"
        aria-label={sendLabel}
        disabled={disabled || value.trim().length === 0}
        className="-translate-y-1/2 absolute top-1/2 right-1.5 size-9 rounded-full"
      >
        <Send className="size-4" aria-hidden />
      </Button>
    </form>
  );
}
