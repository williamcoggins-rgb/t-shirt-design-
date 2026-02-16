import { DesignPreset, StylePreset } from "@/types";

export const DESIGN_PRESETS: DesignPreset[] = [
  {
    name: "Graphic Design",
    category: "graphic",
    description:
      "Bold streetwear graphics — flat colors, strong outlines, limited palette, screen-print ready",
    icon: "🎨",
    promptPrefix:
      "Bold streetwear graphic design, Japanese streetwear style, flat colors, bold black outlines, limited color palette, screen print style, high contrast, anime-inspired,",
    promptSuffix:
      ", isolated on solid black background, 4 color maximum, vector art, clean sharp edges, pop art influence, print-ready, 2D flat design, no shading, spot color illustration",
    recommendedStyle: "comic-book",
    recommendedModel: "ultra",
  },
  {
    name: "Custom Typography",
    category: "typography",
    description:
      "Heavyweight custom lettering — bold hand-drawn type, ink textures, screen-print aesthetic",
    icon: "✏️",
    promptPrefix:
      "Premium streetwear typography, bold hand-lettered custom type, screen print style, flat colors, high contrast,",
    promptSuffix:
      ", isolated on solid black background, heavyweight bold letterforms, strong visual impact, limited color palette, 2D flat design, bold outlines, distressed ink texture, no thin fonts, no gradients, no shading",
    recommendedStyle: "line-art",
    recommendedModel: "ultra",
  },
  {
    name: "Patches",
    category: "patch",
    description:
      "Embroidered patch designs — chenille, chain-stitch, dense threadwork, bold shapes",
    icon: "🛡️",
    promptPrefix:
      "Embroidered patch design, premium chenille patch, streetwear,",
    promptSuffix:
      ", dense embroidery texture, satin stitch detail, merrowed border, isolated on black background, bold outlines, limited color palette, flat color fills, detailed threadwork",
    recommendedStyle: "3d-model",
    recommendedModel: "ultra",
  },
  {
    name: "PVC / Rubber",
    category: "pvc",
    description:
      "Molded PVC rubber labels — tactile, dimensional, bold simple shapes",
    icon: "🔲",
    promptPrefix:
      "3D molded PVC rubber label design, streetwear hardware,",
    promptSuffix:
      ", raised tactile surface, matte and gloss contrast, industrial molding, isolated on black background, bold simple shapes, limited color, clean geometric form",
    recommendedStyle: "3d-model",
    recommendedModel: "ultra",
  },
  {
    name: "All-Over Print",
    category: "all-over",
    description:
      "Full-coverage patterns — camo, abstract motifs, flat graphic repeat prints",
    icon: "🔁",
    promptPrefix:
      "Seamless repeating pattern for streetwear all-over print, bold flat graphic, screen print style,",
    promptSuffix:
      ", tileable seamless pattern, flat colors, bold outlines, limited color palette of 4 colors, high contrast, 2D flat design, no gradients, no shading, spot color textile print",
    recommendedStyle: "line-art",
    recommendedModel: "ultra",
  },
];

export const STYLE_OPTIONS: {
  value: StylePreset;
  label: string;
  description: string;
}[] = [
  {
    value: "comic-book",
    label: "Bold Graphic",
    description: "Bold outlines, flat color, streetwear-ready",
  },
  {
    value: "line-art",
    label: "Line Art",
    description: "Clean vector lines, screen-print ready",
  },
  {
    value: "anime",
    label: "Anime",
    description: "Japanese anime style, BAPE-influenced",
  },
  {
    value: "digital-art",
    label: "Digital Art",
    description: "Clean digital illustration",
  },
  {
    value: "neon-punk",
    label: "Neon Punk",
    description: "Vibrant neon, cyber-streetwear",
  },
  {
    value: "cinematic",
    label: "Cinematic",
    description: "Dramatic contrast, dark mood",
  },
  {
    value: "3d-model",
    label: "3D Render",
    description: "Dimensional, product mockup feel",
  },
  {
    value: "photographic",
    label: "Photo-Real",
    description: "Photorealistic render",
  },
  {
    value: "fantasy-art",
    label: "Fantasy Art",
    description: "Epic detailed illustration",
  },
  {
    value: "low-poly",
    label: "Low Poly",
    description: "Geometric faceted style",
  },
  {
    value: "origami",
    label: "Origami",
    description: "Paper fold aesthetic",
  },
  {
    value: "pixel-art",
    label: "Pixel Art",
    description: "Retro pixel aesthetic",
  },
];

export const QUICK_PROMPTS: { category: string; prompts: string[] }[] = [
  {
    category: "Streetwear Icons",
    prompts: [
      "Fierce ape head with sharp teeth, bold black outlines, flat color, BAPE-inspired mascot",
      "Roaring tiger face, Japanese streetwear, 3 color screen print, anime-inspired",
      "Samurai mask with drip effect, bold outlines, flat colors, Japanese ink style",
      "Snarling bulldog mascot, pop art color treatment, bold flat graphic, 4 colors",
    ],
  },
  {
    category: "Premium Graphics",
    prompts: [
      "Anatomical heart wrapped in barbed wire, bold outlines, red and black, 2 color",
      "Skull with melting drip, heavy black outlines, flat fills, monochrome",
      "Koi fish circular composition, Japanese woodblock style, flat colors, bold lines",
      "Eagle spread wings, vintage tattoo flash, bold outlines, limited palette",
    ],
  },
  {
    category: "Bold Type",
    prompts: [
      "Block letters NO DAYS OFF, distressed ink texture, bold heavyweight, flat black",
      "Gothic blackletter LIMITLESS, bold hand-drawn, flat black ink, screen print",
      "Stacked compressed TRUST THE PROCESS, brutalist bold weight, 2 color",
      "Brush lettering STAY HUNGRY, dripping ink, hand-painted, flat black and red",
    ],
  },
  {
    category: "Patterns & Camo",
    prompts: [
      "Custom camo pattern with hidden ape faces, BAPE-inspired, 4 flat colors",
      "Geometric interlocking shapes, monochrome, bold outlines, seamless repeat",
      "Paisley bandana pattern with skulls, bold outlines, flat fills, 3 colors",
      "Lightning bolt repeat pattern, two-tone flat color, screen print style",
    ],
  },
];

/**
 * Focused negative prompt — 10-12 targeted terms.
 * Research shows over-constraining leads to generic output.
 * Only block the specific failure modes we actually see.
 */
export const DEFAULT_NEGATIVE_PROMPT =
  "photorealistic, 3d render, gradient, shadow, shading, transparency, blurry, low quality, watermark, jpeg artifacts, noisy, complex background";
