import { NextRequest, NextResponse } from "next/server";
import { upscaleImage } from "@/lib/stability";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageBase64, type = "conservative" } = body as {
      imageBase64: string;
      type?: "conservative" | "fast";
    };

    if (!imageBase64) {
      return NextResponse.json(
        { error: "imageBase64 is required" },
        { status: 400 }
      );
    }

    const result = await upscaleImage(imageBase64, type);

    return NextResponse.json({ imageBase64: result.imageBase64 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Upscale failed";
    console.error("Upscale error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
