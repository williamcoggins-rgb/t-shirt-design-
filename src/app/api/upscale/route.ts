import { NextRequest, NextResponse } from "next/server";
import { upscaleImage } from "@/lib/stability";
import { updateDesign, getDesignById } from "@/lib/storage";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { designId, imageBase64, type = "conservative" } = body as {
      designId: string;
      imageBase64: string;
      type?: "conservative" | "fast";
    };

    if (!designId || !imageBase64) {
      return NextResponse.json(
        { error: "designId and imageBase64 are required" },
        { status: 400 }
      );
    }

    const existing = await getDesignById(designId);
    if (!existing) {
      return NextResponse.json(
        { error: "Design not found" },
        { status: 404 }
      );
    }

    const result = await upscaleImage(imageBase64, type);

    const updated = await updateDesign(designId, result.imageBase64, {
      isUpscaled: true,
    });

    return NextResponse.json({
      design: updated,
      imageBase64: result.imageBase64,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Upscale failed";
    console.error("Upscale error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
