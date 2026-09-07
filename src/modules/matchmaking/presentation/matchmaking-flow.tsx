"use client";

import { ArrowLeft, Building2, CalendarClock, Check, Handshake } from "lucide-react";
import { useTranslations } from "next-intl";
import { type FormEvent, useId, useState } from "react";
import type { ExhibitorDto } from "@/modules/exhibitors/application";
import {
  type MeetingSlotDto,
  SubmitMeetingRequestUseCase,
} from "@/modules/matchmaking/application";
import { createMeetingRepository, meetingFormSchema } from "@/modules/matchmaking/infrastructure";
import { cn } from "@/shared/lib/utils";
import { Field, FilterChip, fieldControlClass } from "@/shared/ui";
import { buttonVariants } from "@/shared/ui/button";

interface MatchmakingFlowProps {
  exhibitors: ExhibitorDto[];
  slots: MeetingSlotDto[];
}

type Step = "select" | "schedule" | "done";
type FormErrors = { requesterName?: string; company?: string; email?: string; slot?: string };

function requestCode(): string {
  return `RB-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function MatchmakingFlow({ exhibitors, slots }: MatchmakingFlowProps) {
  const t = useTranslations("matchmaking");
  const [step, setStep] = useState<Step>("select");
  const [exhibitor, setExhibitor] = useState<ExhibitorDto | null>(null);
  const [slotId, setSlotId] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [code, setCode] = useState("");
  const [confirmed, setConfirmed] = useState({ name: "", company: "", slotLabel: "" });
  const formId = useId();

  function choose(selected: ExhibitorDto) {
    setExhibitor(selected);
    setSlotId(null);
    setErrors({});
    setStep("schedule");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!exhibitor) {
      return;
    }
    const data = new FormData(event.currentTarget);
    const raw = {
      requesterName: String(data.get("requesterName") ?? ""),
      company: String(data.get("company") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const result = meetingFormSchema.safeParse(raw);
    const nextErrors: FormErrors = {};
    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormErrors;
        if (!nextErrors[field]) {
          nextErrors[field] = t(`form.errors.${issue.message}`);
        }
      }
    }
    if (!slotId) {
      nextErrors.slot = t("form.errors.slotRequired");
    }
    if (Object.keys(nextErrors).length > 0 || !result.success) {
      setErrors(nextErrors);
      return;
    }

    const slot = slots.find((option) => option.id === slotId);
    const slotLabel = slot?.label ?? "";
    setErrors({});
    const useCase = new SubmitMeetingRequestUseCase(createMeetingRepository());
    await useCase.execute({
      exhibitorId: exhibitor.id,
      exhibitorName: exhibitor.name,
      slotId: slotId ?? "",
      slotLabel,
      requesterName: result.data.requesterName,
      company: result.data.company,
      email: result.data.email,
      message: result.data.message?.trim() ? result.data.message : null,
    });
    setConfirmed({ name: result.data.requesterName, company: result.data.company, slotLabel });
    setCode(requestCode());
    setStep("done");
  }

  if (step === "select") {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {exhibitors.map((item) => (
          <article
            key={item.id}
            className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5 shadow-soft"
          >
            <span
              className="inline-flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary"
              aria-hidden
            >
              <Building2 className="size-5" />
            </span>
            <h3 className="font-display text-card-foreground text-lg">{item.name}</h3>
            <p className="text-muted-foreground text-sm">{item.summary}</p>
            <button
              type="button"
              onClick={() => choose(item)}
              className={cn(buttonVariants({ variant: "outline", size: "md" }), "mt-auto")}
            >
              <Handshake className="size-4" aria-hidden />
              {t("request")}
            </button>
          </article>
        ))}
      </div>
    );
  }

  if (step === "schedule" && exhibitor) {
    return (
      <div className="mx-auto max-w-xl space-y-6">
        <button
          type="button"
          onClick={() => setStep("select")}
          className="inline-flex items-center gap-1 font-medium text-brand-text text-sm hover:underline"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {t("form.back")}
        </button>

        <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 p-4">
          <Building2 className="size-5 shrink-0 text-brand-text" aria-hidden />
          <div>
            <p className="font-medium text-foreground">{exhibitor.name}</p>
            <p className="text-muted-foreground text-sm">{exhibitor.booth}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-2 inline-flex items-center gap-2 font-medium text-foreground text-sm">
              <CalendarClock className="size-4 shrink-0 text-brand-text" aria-hidden />
              {t("form.slot")} <span className="text-error">*</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {slots.map((slot) => (
                <FilterChip
                  key={slot.id}
                  active={slotId === slot.id}
                  onClick={() => setSlotId(slot.id)}
                >
                  {slot.label}
                </FilterChip>
              ))}
            </div>
            {errors.slot ? <p className="mt-2 text-error text-sm">{errors.slot}</p> : null}
          </fieldset>

          <Field
            id={`${formId}-name`}
            name="requesterName"
            label={t("form.name")}
            error={errors.requesterName}
            required
          />
          <Field
            id={`${formId}-company`}
            name="company"
            label={t("form.company")}
            error={errors.company}
            required
          />
          <Field
            id={`${formId}-email`}
            name="email"
            type="email"
            label={t("form.email")}
            error={errors.email}
            required
          />

          <div className="space-y-1.5">
            <label htmlFor={`${formId}-message`} className="font-medium text-foreground text-sm">
              {t("form.message")}
            </label>
            <textarea
              id={`${formId}-message`}
              name="message"
              rows={4}
              className={fieldControlClass}
            />
          </div>

          <button type="submit" className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
            {t("form.confirm")}
          </button>
        </form>
      </div>
    );
  }

  if (step === "done" && exhibitor) {
    return (
      <div className="mx-auto max-w-xl space-y-6 rounded-lg border border-border bg-card p-8 shadow-soft">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-11 items-center justify-center rounded-full bg-success/15 text-success">
            <Check className="size-6" aria-hidden />
          </span>
          <div>
            <h3 className="font-display text-card-foreground text-xl">{t("done.title")}</h3>
            <p className="text-muted-foreground text-sm">{t("done.subtitle")}</p>
          </div>
        </div>

        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{t("done.code")}</dt>
            <dd className="font-mono font-semibold text-foreground">{code}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{t("done.exhibitor")}</dt>
            <dd className="font-medium text-foreground">{exhibitor.name}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{t("done.slot")}</dt>
            <dd className="font-medium text-foreground">{confirmed.slotLabel}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{t("done.requester")}</dt>
            <dd className="font-medium text-foreground">
              {confirmed.name} — {confirmed.company}
            </dd>
          </div>
        </dl>

        <p className="text-muted-foreground text-xs">{t("done.demoNotice")}</p>

        <button
          type="button"
          onClick={() => setStep("select")}
          className={cn(buttonVariants({ variant: "outline", size: "md" }))}
        >
          {t("done.again")}
        </button>
      </div>
    );
  }

  return null;
}
