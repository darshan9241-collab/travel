import { NextResponse } from "next/server";
import { getResendClient, isValidEmail, FROM_ADDRESS, OWNER_EMAIL } from "@/lib/mail";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: "New Wanderlouge newsletter subscriber",
      text: `${email} just subscribed to the Wanderlouge newsletter.`,
    });
    if (error) throw error;
  } catch (error) {
    console.error("Failed to send newsletter notification", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
