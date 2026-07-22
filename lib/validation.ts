import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(120),
  company: z.string().max(160).optional().or(z.literal("")),
  email: z.string().email("Enter a valid email address"),
  country: z.string().max(80).optional().or(z.literal("")),
  subject: z.string().min(3, "Subject is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  collaborationType: z.enum([
    "RESEARCH",
    "COMMERCIAL",
    "SPEAKING",
    "WORKSHOP",
    "INVESTMENT",
    "INTERNSHIP",
  ]),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});
