import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().trim().email("Please provide a valid email address").max(255),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  budget: z.string().trim().max(50).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(3000, "Message cannot exceed 3000 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const queryBenchmarkSchema = z.object({
  queryType: z.enum(["immunization_aggregate", "disease_surveillance", "inventory_audit"]),
  datasetSize: z.enum(["100k", "500k", "2M", "5M"]),
  useIndex: z.boolean().default(true),
});

export type QueryBenchmarkPayload = z.infer<typeof queryBenchmarkSchema>;

export const terminalCommandSchema = z.object({
  command: z.string().trim().min(1).max(200),
});

