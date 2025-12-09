import { NextResponse } from 'next/server';

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  [key: string]: unknown;
};

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as ContactPayload;
    const name = String(data?.name || '').trim();
    const email = String(data?.email || '').trim();
    const message = String(data?.message || '').trim();

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Here you could send an email or store the message in a database.
    // For now, we just return success.

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }
}
