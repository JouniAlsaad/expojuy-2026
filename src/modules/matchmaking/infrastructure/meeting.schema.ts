import { z } from "zod";

export const meetingFormSchema = z.object({
  requesterName: z.string().trim().min(2, "nameMin"),
  company: z.string().trim().min(2, "companyMin"),
  email: z.string().trim().email("emailInvalid"),
  message: z.string().trim().max(500, "messageMax").optional(),
});

export type MeetingFormValues = z.infer<typeof meetingFormSchema>;
