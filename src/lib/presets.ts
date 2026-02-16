import { DesignPreset, StylePreset } from "@/types";

export const DESIGN_PRESETS: DesignPreset[] = [
  {
    name: "Graphic Design",
    category: "graphic",
    description:
      "Bold streetwear graphics — flat colors, strong outlines, screen-print ready",
    icon: "🎨",
    promptPrefix: "sticker design, vector graphic for t-shirt,",
    promptSuffix:
      ", flat colors, bold black outlines, no background, isolated subject, 3 color palette, screen print style",
    recommendedStyle: "comic-book",
    recommendedModel: "ultra",
  },
  {
    name: "Custom Typography",
    category: "typography",
    description:
      "Heavyweight custom lettering — bold type, ink textures, screen-print aesthetic",
    icon: "✏️",
    promptPrefix: "sticker design, vector typography for t-shirt,",
    promptSuffix:
      ", bold lettering, flat black ink, no background, isolated text, screen print style, hand-drawn quality",
    recommendedStyle: "line-art",
    recommendedModel: "ultra",
  },
  {
    name: "Patches",
    category: "patch",
    description:
      "Embroidered patch designs — chenille, chain-stitch, dense threadwork",
    icon: "🛡️",
    promptPrefix: "embroidered patch design,",
    promptSuffix:
      ", chenille embroidery texture, merrowed border, no background, isolated patch, bold outlines, limited colors",
    recommendedStyle: "3d-model",
    recommendedModel: "ultra",
  },
  {
    name: "PVC / Rubber",
    category: "pvc",
    description:
      "Molded PVC rubber labels — tactile, dimensional, bold shapes",
    icon: "🔲",
    promptPrefix: "PVC rubber label design,",
    promptSuffix:
      ", molded rubber, raised surface, no background, isolated label, bold simple shapes, limited color",
    recommendedStyle: "3d-model",
    recommendedModel: "ultra",
  },
  {
    name: "All-Over Print",
    category: "all-over",
    description:
      "Full-coverage patterns — camo, abstract motifs, flat graphic repeats",
    icon: "🔁",
    promptPrefix: "seamless repeating pattern,",
    promptSuffix:
      ", tileable, flat colors, bold outlines, 4 color palette, screen print style",
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
      "fierce ape head with sharp teeth, BAPE style mascot",
      "roaring tiger face, anime-inspired, bold ink",
      "samurai mask with drip effect, Japanese ink brush",
      "snarling bulldog mascot, pop art color",
    ],
  },
  {
    category: "Premium Graphics",
    prompts: [
      "anatomical heart wrapped in barbed wire, red and black only",
      "skull with melting drip, monochrome ink",
      "koi fish circular composition, Japanese woodblock style",
      "eagle with spread wings, vintage tattoo flash",
    ],
  },
  {
    category: "Bold Type",
    prompts: [
      "block letters NO DAYS OFF, distressed ink texture",
      "gothic blackletter LIMITLESS, heavy black ink",
      "stacked compressed TRUST THE PROCESS, brutalist weight",
      "brush lettering STAY HUNGRY, dripping ink",
    ],
  },
  {
    category: "Patterns & Camo",
    prompts: [
      "custom camo pattern with hidden ape faces, BAPE-inspired",
      "geometric interlocking shapes, monochrome, bold outlines",
      "paisley bandana pattern with skulls, flat fills",
      "lightning bolt repeat, two-tone flat color",
    ],
  },
];

/** Focused negative prompt — block the specific failures we see */
export const DEFAULT_NEGATIVE_PROMPT =
  "photorealistic, photograph, 3d render, gradient, shadow, shading, blurry, low quality, watermark, colored background, detailed background, scenery";
