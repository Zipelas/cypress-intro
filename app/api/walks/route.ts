import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

type Walk = { date: string; amount: number }; // date i "YYYY-MM-DD"

export const dynamic = 'force-dynamic'; // ingen cache i edge/välvd

export async function GET() {
  const db = await getDb();
  const docs = await db
    .collection('walks')
    .find({})
    .sort({ date: 1 })
    .toArray();

  // normalisera svaret till vad klienten förväntar sig
  const data = docs.map((d: any) => ({
    id: String(d._id),
    date: new Date(d.date).toISOString().slice(0, 10), // "YYYY-MM-DD"
    amount: d.amount,
  }));

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<Walk>;
  const date = body.date;
  const amount = Number(body.amount);

  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Invalid date' }, { status: 400 });
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
  }

  const db = await getDb();

  // spara som UTC-midnatt för stabilitet
  const iso = new Date(date + 'T00:00:00Z');
  const result = await db.collection('walks').insertOne({ date: iso, amount });

  return NextResponse.json({ id: String(result.insertedId) }, { status: 201 });
}
