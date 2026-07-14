import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/data";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
};

type ContactInput = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate() {
  return new Date().toLocaleString("tr-TR", {
    timeZone: "Europe/Istanbul",
  });
}

function buildTextBody(input: ContactInput) {
  return [
    `${siteConfig.name} web sitesinden yeni bilgi talebi`,
    "",
    `Ad Soyad : ${input.name}`,
    `Telefon  : ${input.phone}`,
    `E-posta  : ${input.email}`,
    `Mesaj    : ${input.message || "(boş)"}`,
    "",
    `Tarih    : ${formatDate()}`,
  ].join("\n");
}

function buildHtmlBody(input: ContactInput) {
  const rows = [
    ["Ad Soyad", input.name],
    ["Telefon", input.phone],
    ["E-posta", input.email],
    ["Mesaj", input.message || "(boş)"],
    ["Tarih", formatDate()],
  ]
    .map(
      ([label, value], index) => `
      <tr>
        <td style="padding:14px 0;border-top:${index === 0 ? "none" : "1px solid #ece8e1"};vertical-align:top;width:120px;">
          <p style="margin:0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#8a8174;font-family:Georgia,'Times New Roman',serif;">
            ${escapeHtml(label)}
          </p>
        </td>
        <td style="padding:14px 0;border-top:${index === 0 ? "none" : "1px solid #ece8e1"};vertical-align:top;">
          <p style="margin:0;font-size:16px;line-height:1.5;color:#1c1916;font-family:Arial,Helvetica,sans-serif;white-space:pre-wrap;">
            ${
              label === "E-posta"
                ? `<a href="mailto:${escapeHtml(value)}" style="color:#1c1916;text-decoration:underline;">${escapeHtml(value)}</a>`
                : label === "Telefon"
                  ? `<a href="tel:${escapeHtml(value.replace(/\s/g, ""))}" style="color:#1c1916;text-decoration:none;">${escapeHtml(value)}</a>`
                  : escapeHtml(value)
            }
          </p>
        </td>
      </tr>`
    )
    .join("");

  const companyLogoUrl = `${siteConfig.url}${siteConfig.companyLogo}`;

  return `<!DOCTYPE html>
<html lang="tr">
  <body style="margin:0;padding:0;background:#f4f1ea;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e4ddd2;">
            <tr>
              <td style="padding:28px 32px 20px;border-bottom:3px solid #C5A059;">
                <img
                  src="${companyLogoUrl}"
                  alt="${escapeHtml(siteConfig.company)}"
                  width="120"
                  height="106"
                  style="display:block;width:120px;height:auto;margin:0 0 18px;"
                />
                <h1 style="margin:0;font-size:28px;line-height:1.2;color:#1c1916;font-weight:normal;font-family:Georgia,'Times New Roman',serif;">
                  ${escapeHtml(siteConfig.name)}
                </h1>
                <p style="margin:10px 0 0;font-size:14px;line-height:1.5;color:#6b645a;font-family:Arial,Helvetica,sans-serif;">
                  Web sitesinden yeni bilgi talebi
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px;background:#1c1916;">
                <p style="margin:0;font-size:12px;line-height:1.5;color:#d7d0c4;font-family:Arial,Helvetica,sans-serif;">
                  Yanıtlamak için doğrudan Reply ile gönderene dönüş yapabilirsiniz.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

async function sendWithSmtp(params: {
  to: string;
  subject: string;
  text: string;
  html: string;
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
    html: params.html,
  });

  return { sent: true as const };
}

async function sendWithResend(params: {
  to: string;
  subject: string;
  text: string;
  html: string;
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
      html: params.html,
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
    const payload = { name, phone, email, message };
    const text = buildTextBody(payload);
    const html = buildHtmlBody(payload);

    const smtp = await sendWithSmtp({
      to,
      subject,
      text,
      html,
      replyTo: email,
    });
    if (smtp.sent) return NextResponse.json({ ok: true });

    const resend = await sendWithResend({
      to,
      subject,
      text,
      html,
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
