"use client";

import { ArrowLeft, Check, QrCode, Ticket } from "lucide-react";
import { useTranslations } from "next-intl";
import { type FormEvent, useId, useState } from "react";
import type { TicketTypeDto } from "@/modules/tickets/application";
import { cn } from "@/shared/lib/utils";
import { fieldControlClass } from "@/shared/ui";
import { buttonVariants } from "@/shared/ui/button";

interface TicketsFlowProps {
  tickets: TicketTypeDto[];
}

type Step = "select" | "form" | "done";
type FormErrors = { name?: string; email?: string };

const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

function orderCode(): string {
  return `EXJ-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function TicketsFlow({ tickets }: TicketsFlowProps) {
  const t = useTranslations("tickets");
  const [step, setStep] = useState<Step>("select");
  const [selected, setSelected] = useState<TicketTypeDto | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [code, setCode] = useState("");
  const [attendee, setAttendee] = useState({ name: "", email: "" });
  const formId = useId();

  function choose(ticket: TicketTypeDto) {
    setSelected(ticket);
    setQuantity(1);
    setErrors({});
    setStep("form");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const nextErrors: FormErrors = {};
    if (name.length < 2) {
      nextErrors.name = t("form.errors.name");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = t("form.errors.email");
    }
    if (nextErrors.name || nextErrors.email) {
      setErrors(nextErrors);
      return;
    }
    setAttendee({ name, email });
    setCode(orderCode());
    setStep("done");
  }

  if (step === "select") {
    return (
      <div className="grid gap-6 lg:grid-cols-3">
        {tickets.map((ticket) => (
          <article
            key={ticket.id}
            className={cn(
              "flex flex-col gap-4 rounded-lg border bg-card p-6 shadow-soft",
              ticket.highlighted ? "border-primary" : "border-border",
            )}
          >
            {ticket.highlighted ? (
              <span className="inline-flex w-fit items-center rounded-full border border-transparent bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                {t("recommended")}
              </span>
            ) : null}
            <div>
              <h3 className="font-display text-xl text-card-foreground">{ticket.name}</h3>
              <p className="mt-1 font-display text-2xl font-semibold text-foreground">
                {ticket.isFree ? t("free") : ticket.priceLabel}
              </p>
            </div>
            <ul className="flex-1 space-y-2 text-sm text-muted-foreground">
              {ticket.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-text" aria-hidden />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => choose(ticket)}
              className={cn(
                buttonVariants({ variant: ticket.highlighted ? "primary" : "outline", size: "md" }),
              )}
            >
              {t("choose")}
            </button>
          </article>
        ))}
      </div>
    );
  }

  if (step === "form" && selected) {
    const total = selected.price * quantity;
    return (
      <div className="mx-auto max-w-xl space-y-6">
        <button
          type="button"
          onClick={() => setStep("select")}
          className="inline-flex items-center gap-1 text-sm font-medium text-brand-text hover:underline"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {t("form.back")}
        </button>

        <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 p-4">
          <Ticket className="size-5 shrink-0 text-brand-text" aria-hidden />
          <div>
            <p className="font-medium text-foreground">{selected.name}</p>
            <p className="text-sm text-muted-foreground">
              {selected.isFree ? t("free") : selected.priceLabel}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor={`${formId}-name`} className="text-sm font-medium text-foreground">
              {t("form.name")} <span className="text-error">*</span>
            </label>
            <input
              id={`${formId}-name`}
              name="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${formId}-name-error` : undefined}
              className={fieldControlClass}
            />
            {errors.name ? (
              <p id={`${formId}-name-error`} className="text-sm text-error">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label htmlFor={`${formId}-email`} className="text-sm font-medium text-foreground">
              {t("form.email")} <span className="text-error">*</span>
            </label>
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? `${formId}-email-error` : undefined}
              className={fieldControlClass}
            />
            {errors.email ? (
              <p id={`${formId}-email-error`} className="text-sm text-error">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label htmlFor={`${formId}-qty`} className="text-sm font-medium text-foreground">
              {t("form.quantity")}
            </label>
            <input
              id={`${formId}-qty`}
              name="quantity"
              type="number"
              min={1}
              max={10}
              value={quantity}
              onChange={(event) =>
                setQuantity(Math.min(10, Math.max(1, Number(event.target.value) || 1)))
              }
              className={cn(fieldControlClass, "max-w-24")}
            />
          </div>

          {!selected.isFree ? (
            <p className="text-sm text-muted-foreground">
              {t("form.total")}:{" "}
              <span className="font-semibold text-foreground">
                {currencyFormatter.format(total)}
              </span>
            </p>
          ) : null}

          <button type="submit" className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
            {selected.isFree ? t("form.confirmFree") : t("form.confirmPaid")}
          </button>
        </form>
      </div>
    );
  }

  if (step === "done" && selected) {
    return (
      <div className="mx-auto max-w-xl space-y-6 rounded-lg border border-border bg-card p-8 shadow-soft">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-11 items-center justify-center rounded-full bg-success/15 text-success">
            <Check className="size-6" aria-hidden />
          </span>
          <div>
            <h3 className="font-display text-xl text-card-foreground">{t("done.title")}</h3>
            <p className="text-sm text-muted-foreground">{t("done.subtitle")}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center">
          <QrCode className="size-24 text-foreground" aria-hidden />
          <p className="font-mono text-sm font-semibold tracking-wide text-foreground">{code}</p>
        </div>

        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{t("done.ticket")}</dt>
            <dd className="font-medium text-foreground">{selected.name}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{t("done.quantity")}</dt>
            <dd className="font-medium text-foreground">{quantity}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{t("done.attendee")}</dt>
            <dd className="font-medium text-foreground">{attendee.name}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{t("done.email")}</dt>
            <dd className="font-medium text-foreground">{attendee.email}</dd>
          </div>
        </dl>

        <p className="text-xs text-muted-foreground">{t("done.demoNotice")}</p>

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
