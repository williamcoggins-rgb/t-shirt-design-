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

// GET /api/designs - list all designs
export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ designs: [], cloudEnabled: false });
  }

  const { data, error } = await supabase
    .from("designs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const designs = (data || []).map((row) => ({
    id: row.id,
    prompt: row.prompt,
    category: row.category,
    style: row.style,
    model: row.model,
    imageUrl: "",
    thumbnailUrl: "",
    createdAt: row.created_at,
    seed: row.seed,
    hasTransparentBg: row.has_transparent_bg,
    isUpscaled: row.is_upscaled,
  }));

  return NextResponse.json({ designs, cloudEnabled: true });
}

// POST /api/designs - save a design
export async function POST(req: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
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

  // Upload image to storage
  const clean = imageBase64.includes(",")
    ? imageBase64.split(",")[1]
    : imageBase64;
  const binaryString = atob(clean);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const { error: uploadError } = await supabase.storage
    .from("design-images")
    .upload(`${design.id}.png`, bytes, {
      contentType: "image/png",
      upsert: true,
    });

  if (uploadError) {
    return NextResponse.json(
      { error: `Image upload failed: ${uploadError.message}` },
      { status: 500 }
    );
  }

  // Save metadata
  const { error: dbError } = await supabase.from("designs").upsert({
    id: design.id,
    prompt: design.prompt,
    category: design.category,
    style: design.style || null,
    model: design.model,
    created_at: design.createdAt,
    seed: design.seed || null,
    has_transparent_bg: design.hasTransparentBg,
    is_upscaled: design.isUpscaled,
  });

  if (dbError) {
    return NextResponse.json(
      { error: `Metadata save failed: ${dbError.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
