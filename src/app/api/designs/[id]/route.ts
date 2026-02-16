import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";

function isBlobConfigured(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

// GET /api/designs/[id] - get design image as base64
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isBlobConfigured()) {
    return NextResponse.json(
      { error: "Cloud storage not configured" },
      { status: 503 }
    );
  }

  try {
    // Find the image blob
    const { blobs } = await list({
      prefix: `designs/images/${params.id}`,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    if (blobs.length === 0) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Download and convert to base64
    const res = await fetch(blobs[0].url);
    const arrayBuffer = await res.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    let binary = "";
    for (let i = 0; i < uint8Array.length; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    const base64 = btoa(binary);

    return NextResponse.json({ imageBase64: base64 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to get image";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH /api/designs/[id] - update design metadata and/or image
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isBlobConfigured()) {
    return NextResponse.json(
      { error: "Cloud storage not configured" },
      { status: 503 }
    );
  }

  const body = await req.json();
  const { updates, newImageBase64 } = body;

  try {
    // Update image if provided
    if (newImageBase64) {
      const clean = newImageBase64.includes(",")
        ? newImageBase64.split(",")[1]
        : newImageBase64;
      const imageBytes = Uint8Array.from(atob(clean), (c) => c.charCodeAt(0));
      const imageBlob = new Blob([imageBytes], { type: "image/png" });

      // Delete old image blob first
      const { blobs: oldImages } = await list({
        prefix: `designs/images/${params.id}`,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      if (oldImages.length > 0) {
        await del(
          oldImages.map((b) => b.url),
          { token: process.env.BLOB_READ_WRITE_TOKEN }
        );
      }

      await put(`designs/images/${params.id}.png`, imageBlob, {
        access: "public",
        contentType: "image/png",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
    }

    // Update metadata if there are updates
    if (updates && Object.keys(updates).length > 0) {
      // Fetch existing metadata
      const { blobs: metaBlobs } = await list({
        prefix: `designs/meta/${params.id}`,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      let existing: Record<string, unknown> = {};
      if (metaBlobs.length > 0) {
        const res = await fetch(metaBlobs[0].url);
        existing = await res.json();

        // Delete old metadata blob
        await del(
          metaBlobs.map((b) => b.url),
          { token: process.env.BLOB_READ_WRITE_TOKEN }
        );
      }

      // Merge updates
      const merged = { ...existing, ...updates };

      await put(
        `designs/meta/${params.id}.json`,
        JSON.stringify(merged),
        {
          access: "public",
          contentType: "application/json",
          token: process.env.BLOB_READ_WRITE_TOKEN,
        }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/designs/[id] - delete design
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isBlobConfigured()) {
    return NextResponse.json(
      { error: "Cloud storage not configured" },
      { status: 503 }
    );
  }

  try {
    // Find and delete both image and metadata blobs
    const [{ blobs: images }, { blobs: meta }] = await Promise.all([
      list({ prefix: `designs/images/${params.id}`, token: process.env.BLOB_READ_WRITE_TOKEN }),
      list({ prefix: `designs/meta/${params.id}`, token: process.env.BLOB_READ_WRITE_TOKEN }),
    ]);

    const allUrls = [...images, ...meta].map((b) => b.url);
    if (allUrls.length > 0) {
      await del(allUrls, { token: process.env.BLOB_READ_WRITE_TOKEN });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Delete failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
