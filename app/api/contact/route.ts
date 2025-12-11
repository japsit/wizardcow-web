import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// -------------------------
// API ROUTE
// -------------------------
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      service,
      websiteFeatures,
      securityNeeds,
      serverNeeds,
      projectDescription,
      budget,
      timeline,
      contact,
      recaptchaToken,
    } = body;

    // -------------------------
    // Validate reCAPTCHA token
    // -------------------------
    if (!recaptchaToken) {
      return NextResponse.json(
          { error: "recaptcha-token-missing" },
          { status: 400 }
      );
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      return NextResponse.json(
          { error: "missing-secret-key" },
          { status: 500 }
      );
    }

    // Verify through Google
    const googleRes = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaToken}`,
        { method: "POST" }
    );
    const googleData = await googleRes.json();

    if (!googleData.success) {
      return NextResponse.json(
          { error: "recaptcha-failed" },
          { status: 400 }
      );
    }

    if (googleData.score !== undefined && googleData.score < 0.3) {
      return NextResponse.json(
          { error: "recaptcha-low-score" },
          { status: 400 }
      );
    }

    // -------------------------
    // Validate contact info
    // -------------------------
    if (!contact?.email && !contact?.phone) {
      return NextResponse.json(
          { error: "contact-missing" },
          { status: 400 }
      );
    }

    // -------------------------
    // Configure Nodemailer
    // -------------------------
    const port = Number(process.env.SMTP_PORT || 587);
    const secure = port === 465; // 465 = implicit TLS; 587 = STARTTLS

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // -------------------------
    // Email content
    // -------------------------
    const mailText = `
Uusi tarjouspyyntö Wizard Cow -sivustolta:

PALVELU: ${service}

OMINAISUUDET:
- Website: ${websiteFeatures?.join(", ") || "-"}
- Security: ${securityNeeds?.join(", ") || "-"}
- Server: ${serverNeeds?.join(", ") || "-"}

KUVAUS:
${projectDescription || "-"}

BUDJETTI: ${budget}
AIKATAULU: ${timeline}

YHTEYSTIEDOT:
Nimi: ${contact?.name || "-"}
Sähköposti: ${contact?.email || "-"}
Puhelin: ${contact?.phone || "-"}
`;

    // -------------------------
    // Send email
    // -------------------------
    const info = await transporter.sendMail({
      from: `"Wizard Cow" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      subject: "Uusi tarjouspyyntö sivustolta",
      text: mailText,
    });

    // Log only minimal metadata
    console.log(`📧 Email sent from ${contact?.name || "unknown"} → id=${info.messageId}`);

    return NextResponse.json({ ok: true });

  } catch (err: any) {
    // Log only safe diagnostic info
    console.error("💥 Mail send error:", {
      message: err?.message,
      missing: err?.response,
    });

    return NextResponse.json(
        { error: "server-error" },
        { status: 500 }
    );
  }
}
