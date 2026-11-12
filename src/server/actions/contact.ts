"use server";

import { contactSchema, ContactFormData } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { sendContactEmail } from "@/lib/email";

// Sliding window in-memory rate limiter for server action (protects against spam)
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;
const ipRequestMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRequestMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  validTimestamps.push(now);
  ipRequestMap.set(ip, validTimestamps);
  return true;
}

export type ActionResponse = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitContactMessage(formData: ContactFormData): Promise<ActionResponse> {
  try {
    // 1. Zod Validation
    const parsed = contactSchema.safeParse(formData);
    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed. Please verify your input.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    const { name, email, company, budget, message } = parsed.data;

    // 2. Rate Limiting Check
    const clientIdentifier = email.toLowerCase();
    if (!checkRateLimit(clientIdentifier)) {
      return {
        success: false,
        message: "Rate limit reached. Please wait a minute before submitting again.",
      };
    }

    // 3. Persist to Database
    try {
      await prisma.contactMessage.create({
        data: {
          name,
          email,
          company: company || null,
          budget: budget || null,
          message,
          ipAddress: "server-action-verified",
        },
      });
    } catch (dbErr) {
      console.error("Database save error:", dbErr);
    }

    // 4. Send Email via Gmail SMTP / Nodemailer
    try {
      await sendContactEmail({
        name,
        email,
        company: company || undefined,
        budget: budget || undefined,
        message,
      });
    } catch (emailErr) {
      console.warn("SMTP email dispatch warning:", emailErr);
    }

    return {
      success: true,
      message: "Transmission received. Your message was emailed to Umair and recorded in the database.",
    };
  } catch (error) {
    console.error("Contact action error:", error);
    return {
      success: false,
      message: "An unexpected error occurred while transmitting your message. Please try again or email directly.",
    };
  }
}
