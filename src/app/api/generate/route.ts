import { NextRequest, NextResponse } from "next/server";
import { generateImage } from "@/lib/stability";
import { GenerationModel, StylePreset } from "@/types";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      prompt,
      style,
      aspectRatio = "1:1",
      model = "core",
      negativePrompt,
      seed,
    } = body as {
      prompt: string;
      style?: StylePreset;
      aspectRatio?: string;
      model?: GenerationModel;
      negativePrompt?: string;
      seed?: number;
    };

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const result = await generateImage({
      prompt,
      negativePrompt:
        negativePrompt ||
        "blurry, low quality, watermark, text overlay, distorted, deformed, ugly, bad anatomy",
      aspectRatio,
      model,
      style,
      seed,
    });

    if (result.finishReason === "CONTENT_FILTERED") {
      return NextResponse.json(
        { error: "Content was filtered. Please try a different prompt." },
        { status: 422 }
      );
    }

    return NextResponse.json({
      imageBase64: result.imageBase64,
      seed: result.seed,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Generation failed";
    console.error("Generate error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
