import { z } from "zod";

export const projectTypes = [
  "Residential Construction",
  "Independent House",
  "Villa Construction",
  "Apartment Construction",
  "Interior Design",
  "GPS Land Survey",
  "DTCP Approval",
  "Layout Planning",
  "Land Development",
  "Road Construction",
  "Drainage Development",
  "Overhead Water Tank",
  "Compound Wall",
  "Property Promotion",
  "Plot Development",
  "Farmhouse Planning",
  "Farmhouse Construction",
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
] as const;

export const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters.")
    .regex(/^[a-zA-Z\s]+$/, "Full name can only contain alphabets and spaces."),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number."),
  projectType: z
    .string()
    .min(1, "Please select a project type."),
  location: z
    .string()
    .trim()
    .min(2, "Location must be at least 2 characters."),
  budget: z.string().optional(),
  preferredContactMethod: z.string().optional(),
  message: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

