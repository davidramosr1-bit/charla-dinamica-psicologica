import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN,
});
const KEY = "charla:cases";

export async function GET() {
  try { return NextResponse.json((await redis.get(KEY)) || []); }
  catch { return NextResponse.json([]); }
}

export async function POST(req) {
  try {
    const { text } = await req.json();
    if (!text?.trim()) return NextResponse.json({ error: "Requerido" }, { status: 400 });
    const cases = (await redis.get(KEY)) || [];
    const c = { id: Date.now().toString(), text: text.trim(), timestamp: new Date().toLocaleTimeString("es-SV", { hour: "2-digit", minute: "2-digit", hour12: true }), read: false };
    cases.push(c);
    await redis.set(KEY, cases);
    return NextResponse.json(c, { status: 201 });
  } catch { return NextResponse.json({ error: "Error" }, { status: 500 }); }
}

export async function DELETE() {
  try { await redis.del(KEY); return NextResponse.json({ ok: true }); }
  catch { return NextResponse.json({ error: "Error" }, { status: 500 }); }
}

export async function PATCH(req) {
  try {
    const { id, read } = await req.json();
    const cases = (await redis.get(KEY)) || [];
    await redis.set(KEY, cases.map(c => c.id === id ? { ...c, read } : c));
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Error" }, { status: 500 }); }
}
