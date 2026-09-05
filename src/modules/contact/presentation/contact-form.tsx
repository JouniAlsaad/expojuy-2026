"use client";

import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { type FormEvent, useId, useState } from "react";
import { SubmitContactUseCase } from "@/modules/contact/application";
import { CONTACT_REASONS } from "@/modules/contact/domain";
import { contactFormSchema, createContactRepository } from "@/modules/contact/infrastructure";
import { cn } from "@/shared/lib/utils";
import { Field, fieldControlClass } from "@/shared/ui";
import { buttonVariants } from "@/shared/ui/button";

type FieldName = "name" | "email" | "organization" | "reason" | "message";
type FormErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success";

export function ContactForm() {
  const t = useTranslations("contact");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const raw = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      organization: String(data.get("organization") ?? ""),
      reason: String(data.get("reason") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const result = contactFormSchema.safeParse(raw);
    if (!result.success) {
      const nextErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as FieldName;
        if (!nextErrors[field]) {
          nextErrors[field] = t(`errors.${issue.message}`);
        }
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    const useCase = new SubmitContactUseCase(createContactRepository());
    await useCase.execute({
      name: result.data.name,
      email: result.data.email,
      organization: result.data.organization?.trim() ? result.data.organization : null,
      reason: result.data.reason,
      message: result.data.message,
    });
    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-lg border border-border bg-card p-8 shadow-soft">
        <CheckCircle2 className="size-8 text-success" aria-hidden />
        <h3 className="font-display text-xl text-card-foreground">{t("success.title")}</h3>
        <p className="text-muted-foreground">{t("success.description")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={cn(buttonVariants({ variant: "outline", size: "md" }))}
        >
          {t("success.again")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field
        id={`${formId}-name`}
        name="name"
        label={t("fields.name")}
        error={errors.name}
        required
      />
      <Field
        id={`${formId}-email`}
        name="email"
        type="email"
        label={t("fields.email")}
        error={errors.email}
        required
      />
      <Field
        id={`${formId}-organization`}
        name="organization"
        label={t("fields.organization")}
        error={errors.organization}
      />

      <div className="space-y-1.5">
        <label htmlFor={`${formId}-reason`} className="text-sm font-medium text-foreground">
          {t("fields.reason")} <span className="text-error">*</span>
        </label>
        <select
          id={`${formId}-reason`}
          name="reason"
          defaultValue=""
          aria-invalid={Boolean(errors.reason)}
          aria-describedby={errors.reason ? `${formId}-reason-error` : undefined}
          className={fieldControlClass}
        >
          <option value="" disabled>
            {t("fields.reasonPlaceholder")}
          </option>
          {CONTACT_REASONS.map((reason) => (
            <option key={reason} value={reason}>
              {t(`reasons.${reason}`)}
            </option>
          ))}
        </select>
        {errors.reason ? (
          <p id={`${formId}-reason-error`} className="text-sm text-error">
            {errors.reason}
          </p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor={`${formId}-message`} className="text-sm font-medium text-foreground">
          {t("fields.message")} <span className="text-error">*</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          className={fieldControlClass}
        />
        {errors.message ? (
          <p id={`${formId}-message-error`} className="text-sm text-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
