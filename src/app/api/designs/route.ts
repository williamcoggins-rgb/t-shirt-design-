import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

function isBlobConfigured(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

// GET /api/designs - list all designs
export async function GET() {
  if (!isBlobConfigured()) {
    return NextResponse.json({ designs: [], cloudEnabled: false });
  }

  try {
    // List all metadata JSON blobs
    const { blobs } = await list({ prefix: "designs/meta/", token: process.env.BLOB_READ_WRITE_TOKEN });

    const designs = await Promise.all(
      blobs.map(async (blob) => {
        try {
          const res = await fetch(blob.url);
          return await res.json();
        } catch {
          return null;
        }
      })
    );

    // Filter nulls and sort newest first
    const valid = designs
      .filter(Boolean)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    return NextResponse.json({ designs: valid, cloudEnabled: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to list designs";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/designs - save a design
export async function POST(req: NextRequest) {
  if (!isBlobConfigured()) {
    return NextResponse.json(
      { error: "Cloud storage not configured" },
      { status: 503 }
    );
  }

  const body = await req.json();
  const { design, imageBase64 } = body;

  if (!design || !imageBase64) {
    return NextResponse.json(
      { error: "Missing design or imageBase64" },
      { status: 400 }
    );
  }

  try {
    // Upload image
    const clean = imageBase64.includes(",")
      ? imageBase64.split(",")[1]
      : imageBase64;
    const imageBytes = Uint8Array.from(atob(clean), (c) => c.charCodeAt(0));
    const imageBlob = new Blob([imageBytes], { type: "image/png" });

    await put(`designs/images/${design.id}.png`, imageBlob, {
      access: "public",
      contentType: "image/png",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // Save metadata (without imageUrl/thumbnailUrl to save space)
    const metadata = {
      id: design.id,
      prompt: design.prompt,
      category: design.category,
      style: design.style || null,
      model: design.model,
      createdAt: design.createdAt,
      seed: design.seed || null,
      hasTransparentBg: design.hasTransparentBg,
      isUpscaled: design.isUpscaled,
    };

    await put(
      `designs/meta/${design.id}.json`,
      JSON.stringify(metadata),
      {
        access: "public",
        contentType: "application/json",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
