import { NextResponse } from 'next/server';

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fullName = String(body?.fullName || '').trim();
    const email = String(body?.email || '').trim();
    const phone = body?.phone ? String(body.phone).trim() : undefined;
    const consent = Boolean(body?.consent);
    const source = body?.source ? String(body.source).slice(0, 64) : undefined;

    if (!fullName || !email || !consent) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
    }

    // Persist lead - simple file store to keep demo self-contained
    // In production, replace with a database or CRM webhook
    const record = {
      id: crypto.randomUUID(),
      fullName,
      email,
      phone: phone || null,
      consent,
      source: source || null,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || null,
      createdAt: new Date().toISOString(),
    };

    // Write to a local JSONL file under /tmp, which is writable
    try {
      // @ts-ignore - Node18 has fs/promises globally via import
      const fs = await import('node:fs/promises');
      await fs.appendFile('/tmp/leads.jsonl', JSON.stringify(record) + '\n', 'utf8');
    } catch (err) {
      // Non-fatal in serverless; continue
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
}
