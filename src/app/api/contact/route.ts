import { NextResponse } from "next/server";
import { getResendClient, isValidEmail, FROM_ADDRESS, OWNER_EMAIL } from "@/lib/mail";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `New message from ${name} via Wanderlouge`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    if (error) throw error;
  } catch (error) {
    console.error("Failed to send contact email", error);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
