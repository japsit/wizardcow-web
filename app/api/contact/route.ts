import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    console.log("📩 UUSI YHTEYDENOTTO", { name, email, message });

    // Tässä voit myöhemmin:
    // - lähettää sähköpostin (Resend, EmailJS, SMTP)
    // - lähettää Slack-ilmoituksen
    // - tallentaa Odooon tms.

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
