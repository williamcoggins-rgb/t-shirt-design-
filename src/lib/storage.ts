import { GeneratedDesign } from "@/types";
import {
  saveDesignToDB,
  getAllDesigns as getAllLocal,
  getDesignImage as getLocalImage,
  updateDesignInDB,
  deleteDesignFromDB,
} from "./db";

/**
 * Unified storage layer.
 * Always saves to IndexedDB (instant, works offline).
 * Also syncs to cloud via API routes when Supabase is configured.
 * Cloud failures are non-blocking — local storage is the source of truth
 * for the current session, cloud is for persistence across devices.
 */

async function isCloudAvailable(): Promise<boolean> {
  try {
    const res = await fetch("/api/designs", { method: "GET" });
    const data = await res.json();
    return data.cloudEnabled === true;
  } catch {
    return false;
  }
}

let _cloudAvailable: boolean | null = null;

async function checkCloud(): Promise<boolean> {
  if (_cloudAvailable === null) {
    _cloudAvailable = await isCloudAvailable();
  }
  return _cloudAvailable;
}

export async function saveDesign(
  design: GeneratedDesign,
  imageBase64: string
): Promise<void> {
  // Always save locally first (fast, reliable)
  await saveDesignToDB(design, imageBase64);

  // Then sync to cloud in background
  if (await checkCloud()) {
    try {
      await fetch("/api/designs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ design, imageBase64 }),
      });
    } catch (err) {
      console.warn("Cloud save failed, design is saved locally:", err);
    }
  }
}

export async function loadDesigns(): Promise<GeneratedDesign[]> {
  // Try cloud first for the most complete collection
  if (await checkCloud()) {
    try {
      const res = await fetch("/api/designs");
      const data = await res.json();
      if (data.designs && data.designs.length > 0) {
        // Merge: cloud designs + any local-only designs
        const localDesigns = await getAllLocal();
        const cloudIds = new Set(data.designs.map((d: GeneratedDesign) => d.id));
        const localOnly = localDesigns.filter((d) => !cloudIds.has(d.id));

        // Upload local-only designs to cloud in background
        if (localOnly.length > 0) {
          syncLocalToCloud(localOnly);
        }

        // For cloud designs, use local imageUrl if available (faster)
        const merged = [...data.designs, ...localOnly];
        for (const design of merged) {
          if (!design.imageUrl) {
            const localMatch = localDesigns.find((l) => l.id === design.id);
            if (localMatch) {
              design.imageUrl = localMatch.imageUrl;
              design.thumbnailUrl = localMatch.thumbnailUrl;
            }
          }
        }

        return merged;
      }
    } catch (err) {
      console.warn("Cloud load failed, falling back to local:", err);
    }
  }

  // Fallback to local
  return getAllLocal();
}

export async function getDesignImage(id: string): Promise<string | null> {
  // Try local first (faster, no network)
  const { getDesignImage: getLocal } = await import("./db");
  const localImage = await getLocal(id);
  if (localImage) return localImage;

  // Fall back to cloud
  if (await checkCloud()) {
    try {
      const res = await fetch(`/api/designs/${id}`);
      if (res.ok) {
        const data = await res.json();
        return data.imageBase64 || null;
      }
    } catch {
      // Cloud fetch failed
    }
  }

  return null;
}

export async function updateDesign(
  id: string,
  updates: Partial<GeneratedDesign>,
  newImageBase64?: string
): Promise<GeneratedDesign | null> {
  // Update locally first
  const updated = await updateDesignInDB(id, updates, newImageBase64);

  // Sync to cloud
  if (await checkCloud()) {
    try {
      await fetch(`/api/designs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates, newImageBase64 }),
      });
    } catch (err) {
      console.warn("Cloud update failed:", err);
    }
  }

  return updated;
}

export async function deleteDesign(id: string): Promise<void> {
  // Delete locally
  await deleteDesignFromDB(id);

  // Delete from cloud
  if (await checkCloud()) {
    try {
      await fetch(`/api/designs/${id}`, { method: "DELETE" });
    } catch (err) {
      console.warn("Cloud delete failed:", err);
    }
  }
}

// Background sync: upload local-only designs to cloud
async function syncLocalToCloud(localDesigns: GeneratedDesign[]) {
  const { getDesignImage: getLocal } = await import("./db");

  for (const design of localDesigns) {
    try {
      const imageBase64 = await getLocal(design.id);
      if (imageBase64) {
        await fetch("/api/designs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ design, imageBase64 }),
        });
      }
    } catch {
      // Non-blocking, will try again next load
    }
  }
}
