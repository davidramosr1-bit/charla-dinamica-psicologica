import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN,
});
const CASES_KEY = "charla:cases";
const CASES_KEY = "charla:cases";

export async function GET() {
  try {
    const cases = (await redis.get(CASES_KEY)) || [];
    return NextResponse.json(cases);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request) {
  try {
    const { text } = await request.json();
    if (!text || !text.trim()) {
      return NextResponse.json({ error: "Texto requerido" }, { status: 400 });
    }
    const cases = (await redis.get(CASES_KEY)) || [];
    const newCase = {
      id: Date.now().toString(),
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString("es-SV", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      read: false,
    };
    cases.push(newCase);
    await redis.set(CASES_KEY, cases);
    return NextResponse.json(newCase, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await redis.del(CASES_KEY);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error al limpiar" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { id, read } = await request.json();
    const cases = (await redis.get(CASES_KEY)) || [];
    const updated = cases.map((c) =>
      c.id === id ? { ...c, read: read } : c
    );
    await redis.set(CASES_KEY, updated);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}
