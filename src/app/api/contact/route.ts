import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/data";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildBody(input: {
  name: string;
  phone: string;
  email: string;
  message: string;
}) {
  return [
    `${siteConfig.name} web sitesinden yeni bilgi talebi`,
    "",
    `Ad Soyad : ${input.name}`,
    `Telefon  : ${input.phone}`,
    `E-posta  : ${input.email}`,
    `Mesaj    : ${input.message || "(boş)"}`,
    "",
    `Tarih    : ${new Date().toLocaleString("tr-TR", {
      timeZone: "Europe/Istanbul",
    })}`,
  ].join("\n");
}

async function sendWithSmtp(params: {
  to: string;
  subject: string;
  text: string;
  replyTo: string;
}) {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const port = Number(process.env.SMTP_PORT || 465);

  if (!host || !user || !pass) return { sent: false as const, reason: "smtp_missing" };

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"${siteConfig.name}" <${user}>`,
    to: params.to,
    replyTo: params.replyTo,
    subject: params.subject,
    text: params.text,
  });

  return { sent: true as const };
}

async function sendWithResend(params: {
  to: string;
  subject: string;
  text: string;
  replyTo: string;
}) {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return { sent: false as const, reason: "resend_missing" };

  const from =
    process.env.CONTACT_FROM?.trim() ||
    `${siteConfig.name} <onboarding@resend.dev>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [params.to],
      reply_to: params.replyTo,
      subject: params.subject,
      text: params.text,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
    return { sent: false as const, reason: "resend_failed" };
  }

  return { sent: true as const };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || !phone || !email) {
      return NextResponse.json(
        { ok: false, error: "Lütfen zorunlu alanları doldurun." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Geçerli bir e-posta girin." },
        { status: 400 }
      );
    }

    const to =
      process.env.CONTACT_TO?.trim() ||
      siteConfig.contactEmail ||
      "serhatsoyyigit@arygrup.com.tr";

    const subject = `${siteConfig.name} — Yeni bilgi talebi (${name})`;
    const text = buildBody({ name, phone, email, message });

    const smtp = await sendWithSmtp({
      to,
      subject,
      text,
      replyTo: email,
    });
    if (smtp.sent) return NextResponse.json({ ok: true });

    const resend = await sendWithResend({
      to,
      subject,
      text,
      replyTo: email,
    });
    if (resend.sent) return NextResponse.json({ ok: true });

    console.error("Mail config missing. Set SMTP_* or RESEND_API_KEY in .env.local");
    return NextResponse.json(
      {
        ok: false,
        error:
          "Mail ayarları eksik. Lütfen site yöneticisine bildirin veya WhatsApp ile yazın.",
      },
      { status: 503 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Mail gönderilemedi. Lütfen WhatsApp ile iletişime geçin.",
      },
      { status: 500 }
    );
  }
}
