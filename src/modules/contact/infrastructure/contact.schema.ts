import { z } from "zod";
import { CONTACT_REASONS } from "@/modules/contact/domain";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "nameMin"),
  email: z.string().trim().email("emailInvalid"),
  organization: z.string().trim().max(120, "organizationMax").optional(),
  reason: z.enum(CONTACT_REASONS, { message: "reasonRequired" }),
  message: z.string().trim().min(10, "messageMin").max(1000, "messageMax"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
