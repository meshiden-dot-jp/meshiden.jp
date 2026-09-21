import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { buildConfirmationMail, type ContactMailInput } from "@/lib/contact-mail";

export const runtime = "nodejs";

const RECAPTCHA_ACTION = "contact";
const RECAPTCHA_MIN_SCORE = 0.5;
const MAX_BODY_BYTES = 100_000;
const DEFAULT_MAIL_FROM = "飯田優斗 <contact@meshiden.jp>";

const LIMITS = { name: 100, email: 254, phone: 30, message: 10_000 } as const;
const EMAIL_PATTERN = /^[^\s@,;<>()"]+@[^\s@,;<>()"]+\.[^\s@,;<>()"]+$/;

type ContactInput = ContactMailInput & { token: string };

function parseInput(body: unknown): ContactInput | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;

  const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");
  const oneLine = (value: unknown) => text(value).replace(/\s*[\r\n]+\s*/g, " ");

  const input: ContactInput = {
    name: oneLine(raw.name),
    email: oneLine(raw.email),
    phone: oneLine(raw.phone),
    message: text(raw.message).replace(/\r\n?/g, "\n"),
    token: text(raw.token),
  };

  if (!input.name || !input.email || !input.message || !input.token) return null;
  if (
    input.name.length > LIMITS.name ||
    input.email.length > LIMITS.email ||
    input.phone.length > LIMITS.phone ||
    input.message.length > LIMITS.message
  ) {
    return null;
  }
  if (!EMAIL_PATTERN.test(input.email)) return null;

  return input;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPCHA_SECRET_KEY;
  if (!secret) throw new Error("RECAPCHA_SECRET_KEY is not set");

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
    signal: AbortSignal.timeout(8_000),
  });
  const data = await res.json();

  return (
    data.success === true &&
    data.action === RECAPTCHA_ACTION &&
    typeof data.score === "number" &&
    data.score >= RECAPTCHA_MIN_SCORE
  );
}

async function sendConfirmation(input: ContactInput): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = process.env;
  const port = Number(SMTP_PORT);
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !Number.isInteger(port)) {
    throw new Error("SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS are not set correctly");
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  try {
    const { subject, text, html } = buildConfirmationMail(input);
    await transporter.sendMail({
      from: MAIL_FROM || DEFAULT_MAIL_FROM,
      to: input.email,
      subject,
      text,
      html,
    });
  } finally {
    transporter.close();
  }
}

export async function POST(req: Request) {
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "Payload too large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const input = parseInput(body);
  if (!input) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  try {
    if (!(await verifyRecaptcha(input.token))) {
      return NextResponse.json({ message: "Failed reCAPTCHA verification" }, { status: 403 });
    }
    await sendConfirmation(input);
    return NextResponse.json({ message: "Confirmation mail sent" });
  } catch (error) {
    console.error("Contact confirmation mail failed:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
