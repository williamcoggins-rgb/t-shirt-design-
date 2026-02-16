import { NextRequest, NextResponse } from "next/server";
import { removeBackground } from "@/lib/stability";
import { updateDesign, getDesignById } from "@/lib/storage";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { designId, imageBase64 } = body as {
      designId: string;
      imageBase64: string;
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

    const result = await removeBackground(imageBase64);

    const updated = await updateDesign(designId, result.imageBase64, {
      hasTransparentBg: true,
    });

    return NextResponse.json({
      design: updated,
      imageBase64: result.imageBase64,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Background removal failed";
    console.error("Remove background error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
