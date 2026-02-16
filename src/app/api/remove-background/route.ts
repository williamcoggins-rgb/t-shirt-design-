import { NextRequest, NextResponse } from "next/server";
import { removeBackground } from "@/lib/stability";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageBase64 } = body as { imageBase64: string };

    if (!imageBase64) {
      return NextResponse.json(
        { error: "imageBase64 is required" },
        { status: 400 }
      );
    }

    const result = await removeBackground(imageBase64);

    return NextResponse.json({ imageBase64: result.imageBase64 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Background removal failed";
    console.error("Remove background error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
