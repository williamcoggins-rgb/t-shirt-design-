import { GeneratedDesign } from "@/types";
import { supabase, isCloudEnabled } from "./supabase";

/**
 * Cloud storage layer using Supabase.
 * Mirrors the IndexedDB API so both can be used together.
 * Design metadata is stored in a "designs" table.
 * Images are stored in a "design-images" storage bucket.
 */

export async function saveDesignToCloud(
  design: GeneratedDesign,
  imageBase64: string
): Promise<void> {
  if (!isCloudEnabled() || !supabase) return;

  // Upload image to Supabase Storage
  const imageBuffer = base64ToUint8Array(imageBase64);

  const { error: uploadError } = await supabase.storage
    .from("design-images")
    .upload(`${design.id}.png`, imageBuffer, {
      contentType: "image/png",
      upsert: true,
    });

  if (uploadError) {
    console.error("Failed to upload image:", uploadError.message);
    throw new Error(`Image upload failed: ${uploadError.message}`);
  }

  // Save design metadata to database
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
    console.error("Failed to save design metadata:", dbError.message);
    throw new Error(`Metadata save failed: ${dbError.message}`);
  }
}

export async function getAllDesignsFromCloud(): Promise<GeneratedDesign[]> {
  if (!isCloudEnabled() || !supabase) return [];

  const { data, error } = await supabase
    .from("designs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch designs:", error.message);
    return [];
  }

  return (data || []).map((row) => ({
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
}

export async function getDesignImageFromCloud(
  id: string
): Promise<string | null> {
  if (!isCloudEnabled() || !supabase) return null;

  const { data, error } = await supabase.storage
    .from("design-images")
    .download(`${id}.png`);

  if (error || !data) {
    console.error("Failed to download image:", error?.message);
    return null;
  }

  // Convert blob to base64
  const arrayBuffer = await data.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  let binary = "";
  for (let i = 0; i < uint8Array.length; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binary);
}

export async function updateDesignInCloud(
  id: string,
  updates: Partial<GeneratedDesign>,
  newImageBase64?: string
): Promise<void> {
  if (!isCloudEnabled() || !supabase) return;

  // Update image if provided
  if (newImageBase64) {
    const imageBuffer = base64ToUint8Array(newImageBase64);

    const { error: uploadError } = await supabase.storage
      .from("design-images")
      .upload(`${id}.png`, imageBuffer, {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) {
      console.error("Failed to update image:", uploadError.message);
    }
  }

  // Build the update object with snake_case keys
  const dbUpdates: Record<string, unknown> = {};
  if (updates.prompt !== undefined) dbUpdates.prompt = updates.prompt;
  if (updates.category !== undefined) dbUpdates.category = updates.category;
  if (updates.style !== undefined) dbUpdates.style = updates.style;
  if (updates.model !== undefined) dbUpdates.model = updates.model;
  if (updates.hasTransparentBg !== undefined)
    dbUpdates.has_transparent_bg = updates.hasTransparentBg;
  if (updates.isUpscaled !== undefined)
    dbUpdates.is_upscaled = updates.isUpscaled;

  if (Object.keys(dbUpdates).length > 0) {
    const { error } = await supabase
      .from("designs")
      .update(dbUpdates)
      .eq("id", id);

    if (error) {
      console.error("Failed to update design:", error.message);
    }
  }
}

export async function deleteDesignFromCloud(id: string): Promise<void> {
  if (!isCloudEnabled() || !supabase) return;

  // Delete image from storage
  const { error: storageError } = await supabase.storage
    .from("design-images")
    .remove([`${id}.png`]);

  if (storageError) {
    console.error("Failed to delete image:", storageError.message);
  }

  // Delete metadata from database
  const { error: dbError } = await supabase
    .from("designs")
    .delete()
    .eq("id", id);

  if (dbError) {
    console.error("Failed to delete design:", dbError.message);
  }
}

// Helper: convert base64 string to Uint8Array
function base64ToUint8Array(base64: string): Uint8Array {
  // Handle data URL prefix if present
  const clean = base64.includes(",") ? base64.split(",")[1] : base64;
  const binaryString = atob(clean);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
