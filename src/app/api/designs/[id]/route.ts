import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;
  return createClient(url, key);
}

// GET /api/designs/[id] - get design image
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Cloud storage not configured" },
      { status: 503 }
    );
  }

  const { data, error } = await supabase.storage
    .from("design-images")
    .download(`${params.id}.png`);

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message || "Image not found" },
      { status: 404 }
    );
  }

  const arrayBuffer = await data.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  let binary = "";
  for (let i = 0; i < uint8Array.length; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  const base64 = btoa(binary);

  return NextResponse.json({ imageBase64: base64 });
}

// PATCH /api/designs/[id] - update design
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Cloud storage not configured" },
      { status: 503 }
    );
  }

  const body = await req.json();
  const { updates, newImageBase64 } = body;

  // Update image if provided
  if (newImageBase64) {
    const clean = newImageBase64.includes(",")
      ? newImageBase64.split(",")[1]
      : newImageBase64;
    const binaryString = atob(clean);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const { error: uploadError } = await supabase.storage
      .from("design-images")
      .upload(`${params.id}.png`, bytes, {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: `Image update failed: ${uploadError.message}` },
        { status: 500 }
      );
    }
  }

  // Build update object
  const dbUpdates: Record<string, unknown> = {};
  if (updates?.prompt !== undefined) dbUpdates.prompt = updates.prompt;
  if (updates?.category !== undefined) dbUpdates.category = updates.category;
  if (updates?.style !== undefined) dbUpdates.style = updates.style;
  if (updates?.model !== undefined) dbUpdates.model = updates.model;
  if (updates?.hasTransparentBg !== undefined)
    dbUpdates.has_transparent_bg = updates.hasTransparentBg;
  if (updates?.isUpscaled !== undefined)
    dbUpdates.is_upscaled = updates.isUpscaled;

  if (Object.keys(dbUpdates).length > 0) {
    const { error } = await supabase
      .from("designs")
      .update(dbUpdates)
      .eq("id", params.id);

    if (error) {
      return NextResponse.json(
        { error: `Update failed: ${error.message}` },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ success: true });
}

// DELETE /api/designs/[id] - delete design
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Cloud storage not configured" },
      { status: 503 }
    );
  }

  // Delete image from storage
  await supabase.storage.from("design-images").remove([`${params.id}.png`]);

  // Delete metadata
  const { error } = await supabase
    .from("designs")
    .delete()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json(
      { error: `Delete failed: ${error.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
