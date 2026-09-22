import { Resend } from "resend";

export const OWNER_EMAIL = "darshan9241@gmail.com";

// Resend's shared test sender — works with no domain verification. Once a
// domain is verified in the Resend dashboard, swap this for something like
// "Wanderlouge <hello@wanderlouge.com>" for better deliverability.
export const FROM_ADDRESS = "Wanderlouge <onboarding@resend.dev>";

let client: Resend | null = null;

export function getResendClient(): Resend {
  if (!client) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not set");
    }
    client = new Resend(apiKey);
  }
  return client;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
