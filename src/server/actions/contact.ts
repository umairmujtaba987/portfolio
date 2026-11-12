"use server";

import { contactSchema, ContactFormData } from "@/lib/validations";
import { prisma } from "@/lib/prisma";

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
      // Even if DB has transient issue, we log it and continue
    }

    // 4. Send Email via Resend if API key is provided
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Portfolio Dispatch <onboarding@resend.dev>",
            to: ["umairmujtaba123@gmail.com"],
            subject: `[Portfolio Inquiry] from ${name} (${company || "Direct"})`,
            text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nBudget: ${budget || "N/A"}\n\nMessage:\n${message}`,
          }),
        });
      } catch (emailErr) {
        console.warn("Resend email dispatch warning:", emailErr);
      }
    }

    return {
      success: true,
      message: "Transmission received. Thank you for reaching out, Umair will respond shortly.",
    };
  } catch (error) {
    console.error("Contact action error:", error);
    return {
      success: false,
      message: "An unexpected error occurred while transmitting your message. Please try again or email directly.",
    };
  }
}

