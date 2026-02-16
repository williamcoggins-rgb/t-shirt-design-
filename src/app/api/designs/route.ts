import { NextResponse } from "next/server";
import { loadAllDesigns } from "@/lib/storage";

export async function GET() {
  try {
    const designs = await loadAllDesigns();
    return NextResponse.json({ designs });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load designs";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
