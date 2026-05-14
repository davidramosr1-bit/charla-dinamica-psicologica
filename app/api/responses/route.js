import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN,
});
const KEY = "charla:brainstorm";

export async function GET() {
  try { return NextResponse.json((await redis.get(KEY)) || []); }
  catch { return NextResponse.json([]); }
}

export async function POST(req) {
  try {
    const { words } = await req.json();
    if (!words || !Array.isArray(words)) return NextResponse.json({ error: "Requerido" }, { status: 400 });
    const all = (await redis.get(KEY)) || [];
    const entry = { id: Date.now().toString(), words: words.filter(w => w.trim()), timestamp: new Date().toLocaleTimeString("es-SV", { hour: "2-digit", minute: "2-digit", hour12: true }) };
    all.push(entry);
    await redis.set(KEY, all);
    return NextResponse.json(entry, { status: 201 });
  } catch { return NextResponse.json({ error: "Error" }, { status: 500 }); }
}

export async function DELETE() {
  try { await redis.del(KEY); return NextResponse.json({ ok: true }); }
  catch { return NextResponse.json({ error: "Error" }, { status: 500 }); }
}
