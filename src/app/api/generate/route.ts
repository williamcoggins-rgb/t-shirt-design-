import { NextRequest, NextResponse } from "next/server";
import { generateImage } from "@/lib/stability";
import { saveDesign } from "@/lib/storage";
import { DesignCategory, GenerationModel, StylePreset } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      prompt,
      category,
      style,
      aspectRatio = "1:1",
      model = "core",
      negativePrompt,
      seed,
    } = body as {
      prompt: string;
      category: DesignCategory;
      style?: StylePreset;
      aspectRatio?: string;
      model?: GenerationModel;
      negativePrompt?: string;
      seed?: number;
    };

    if (!prompt || !category) {
      return NextResponse.json(
        { error: "Prompt and category are required" },
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

    const id = `design-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const design = await saveDesign(result.imageBase64, {
      id,
      prompt,
      category,
      style,
      model,
      createdAt: new Date().toISOString(),
      seed: result.seed,
      hasTransparentBg: false,
      isUpscaled: false,
    });

    return NextResponse.json({ design, imageBase64: result.imageBase64 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Generation failed";
    console.error("Generate error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
