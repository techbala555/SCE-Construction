import { z } from "zod";

export const projectTypes = [
  "Residential Construction",
  "Commercial Construction",
  "Interior Design",
  "Renovation",
  "Civil Engineering",
  "Engineering Consultation",
  "Other",
] as const;

export const budgetRanges = [
  "Below ₹5 Lakhs",
  "₹5L – ₹10L",
  "₹10L – ₹25L",
  "₹25L – ₹50L",
  "Above ₹50 Lakhs",
] as const;

export const contactMethods = [
  "Phone Call",
  "WhatsApp",
  "Email",
] as const;

export const leadFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Enter a valid email address").or(z.literal("")),
  projectType: z.enum(projectTypes, { message: "Please select a project type" }),
  budget: z.string(),
  location: z.string().min(2, "Location must be at least 2 characters"),
  preferredContactMethod: z.string(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

