import { writeFile, readdir, readFile, mkdir } from "fs/promises";
import path from "path";
import { GeneratedDesign } from "@/types";

const DESIGNS_DIR = path.join(process.cwd(), "public", "designs");
const METADATA_FILE = path.join(DESIGNS_DIR, "metadata.json");

async function ensureDir() {
  await mkdir(DESIGNS_DIR, { recursive: true });
}

export async function saveDesign(
  imageBase64: string,
  metadata: Omit<GeneratedDesign, "imageUrl" | "thumbnailUrl">
): Promise<GeneratedDesign> {
  await ensureDir();

  const filename = `${metadata.id}.png`;
  const filepath = path.join(DESIGNS_DIR, filename);

  const imageBuffer = Buffer.from(imageBase64, "base64");
  await writeFile(filepath, imageBuffer);

  const design: GeneratedDesign = {
    ...metadata,
    imageUrl: `/designs/${filename}`,
    thumbnailUrl: `/designs/${filename}`,
  };

  // Update metadata file
  const designs = await loadAllDesigns();
  designs.unshift(design);
  await writeFile(METADATA_FILE, JSON.stringify(designs, null, 2));

  return design;
}

export async function loadAllDesigns(): Promise<GeneratedDesign[]> {
  try {
    const data = await readFile(METADATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function getDesignById(
  id: string
): Promise<GeneratedDesign | null> {
  const designs = await loadAllDesigns();
  return designs.find((d) => d.id === id) || null;
}

export async function updateDesign(
  id: string,
  imageBase64: string,
  updates: Partial<GeneratedDesign>
): Promise<GeneratedDesign | null> {
  await ensureDir();

  const designs = await loadAllDesigns();
  const index = designs.findIndex((d) => d.id === id);
  if (index === -1) return null;

  // Save new image
  const filename = `${id}${updates.hasTransparentBg ? "-nobg" : ""}${updates.isUpscaled ? "-hd" : ""}.png`;
  const filepath = path.join(DESIGNS_DIR, filename);
  const imageBuffer = Buffer.from(imageBase64, "base64");
  await writeFile(filepath, imageBuffer);

  designs[index] = {
    ...designs[index],
    ...updates,
    imageUrl: `/designs/${filename}`,
    thumbnailUrl: `/designs/${filename}`,
  };

  await writeFile(METADATA_FILE, JSON.stringify(designs, null, 2));
  return designs[index];
}
