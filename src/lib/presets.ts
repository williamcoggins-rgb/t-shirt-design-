import { DesignPreset, StylePreset } from "@/types";

export const DESIGN_PRESETS: DesignPreset[] = [
  {
    name: "Graphic Design",
    category: "graphic",
    description:
      "Bold streetwear graphics — character designs, mascots, creative concepts",
    icon: "🎨",
    promptPrefix:
      "streetwear character illustration for a premium t-shirt brand, stylized and expressive with attitude,",
    promptSuffix:
      ", bold ink lines, flat color fills, strong personality, transparent background, high contrast, screen print aesthetic",
    recommendedStyle: "comic-book",
    recommendedModel: "ultra",
  },
  {
    name: "Custom Typography",
    category: "typography",
    description:
      "Heavyweight custom lettering — bold type, ink textures, statement wordmarks",
    icon: "✏️",
    promptPrefix:
      "custom hand-lettered typography for streetwear brand,",
    promptSuffix:
      ", bold heavyweight letterforms, ink texture, transparent background, high contrast, screen print aesthetic",
    recommendedStyle: "line-art",
    recommendedModel: "ultra",
  },
  {
    name: "Patches",
    category: "patch",
    description:
      "Embroidered patch designs — chenille, chain-stitch, dense threadwork",
    icon: "🛡️",
    promptPrefix: "embroidered chenille patch design,",
    promptSuffix:
      ", dense thread texture, merrowed border, transparent background, bold shapes, limited colors",
    recommendedStyle: "3d-model",
    recommendedModel: "ultra",
  },
  {
    name: "PVC / Rubber",
    category: "pvc",
    description:
      "Molded PVC rubber labels — tactile, dimensional, bold shapes",
    icon: "🔲",
    promptPrefix: "molded PVC rubber label design,",
    promptSuffix:
      ", raised tactile surface, matte and gloss contrast, transparent background, bold simple shapes, limited color",
    recommendedStyle: "3d-model",
    recommendedModel: "ultra",
  },
  {
    name: "All-Over Print",
    category: "all-over",
    description:
      "Full-coverage patterns — camo, abstract motifs, flat graphic repeats",
    icon: "🔁",
    promptPrefix: "seamless repeating textile pattern,",
    promptSuffix:
      ", tileable, flat colors, bold outlines, limited color palette, screen print style",
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
    category: "Streetwear Characters",
    prompts: [
      "angry ape character with gold chain and snapback, graffiti attitude",
      "ice cream cone character with sunglasses and gold teeth, dripping swag",
      "tiger in a hoodie smoking, Japanese street style",
      "bulldog wearing a bomber jacket, tough streetwear mascot",
    ],
  },
  {
    category: "Premium Graphics",
    prompts: [
      "flaming heart with barbed wire and roses, dark romantic",
      "melting chrome skull with dripping liquid metal",
      "koi fish and dragon intertwined, Japanese tattoo flash",
      "eagle clutching a snake, traditional Americana with edge",
    ],
  },
  {
    category: "Bold Type",
    prompts: [
      "block letters NO DAYS OFF with cracked concrete texture",
      "gothic blackletter LIMITLESS with thorns and vines",
      "stacked compressed TRUST THE PROCESS with glitch distortion",
      "dripping spray paint text STAY HUNGRY, urban wall style",
    ],
  },
  {
    category: "Patterns & Camo",
    prompts: [
      "custom camo pattern with hidden ape faces, BAPE-inspired",
      "geometric interlocking shapes, monochrome, bold outlines",
      "paisley bandana pattern remixed with skulls and crossbones",
      "lightning bolt repeat pattern, two-tone colorway",
    ],
  },
];

/** Block specific failure modes — keep it tight */
export const DEFAULT_NEGATIVE_PROMPT =
  "photorealistic, photograph, 3d render, gradient, blurry, low quality, watermark, colored background, detailed background, scenery, sticker, sticker border, white border";
