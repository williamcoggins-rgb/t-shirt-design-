import { DesignPreset, StylePreset } from "@/types";

export const DESIGN_PRESETS: DesignPreset[] = [
  {
    name: "Graphic Design",
    category: "graphic",
    description:
      "Premium streetwear graphics — bold, clean, high-contrast designs for statement pieces",
    icon: "🎨",
    promptPrefix:
      "Professional high-end streetwear t-shirt graphic, premium apparel design,",
    promptSuffix:
      ", isolated on solid black background, clean sharp edges, high contrast, screen-print ready, bold graphic identity, luxury streetwear aesthetic, detailed and refined, no cartoon style, no childish elements, fashion-forward, editorial quality",
    recommendedStyle: "photographic",
    recommendedModel: "ultra",
  },
  {
    name: "Custom Typography",
    category: "typography",
    description:
      "Bold custom lettering and wordmarks — heavyweight type, distressed textures, statement fonts",
    icon: "✏️",
    promptPrefix:
      "Premium streetwear typography design, bold custom lettering, high-end fashion apparel,",
    promptSuffix:
      ", isolated on solid black background, heavyweight bold letterforms, strong visual impact, professional typographic design, clean execution, screen-print aesthetic, luxury brand quality, editorial fashion, no cheap clip-art, no thin fonts",
    recommendedStyle: "photographic",
    recommendedModel: "ultra",
  },
  {
    name: "Patches",
    category: "patch",
    description:
      "Premium embroidered patch designs — chenille, chain-stitch, military-grade detail",
    icon: "🛡️",
    promptPrefix:
      "Luxury embroidered patch design, premium chenille patch, high-end streetwear,",
    promptSuffix:
      ", dense embroidery texture, satin stitch detail, merrowed border edge, isolated on black background, premium quality threadwork, fashion brand patch, detailed craftsmanship, no cartoon style",
    recommendedStyle: "photographic",
    recommendedModel: "ultra",
  },
  {
    name: "PVC / Rubber",
    category: "pvc",
    description:
      "Molded PVC and rubber label designs — tactile, dimensional, streetwear hardware",
    icon: "🔲",
    promptPrefix:
      "Premium 3D molded PVC rubber label design, luxury streetwear hardware,",
    promptSuffix:
      ", raised tactile surface, matte and gloss finish contrast, precise industrial molding, isolated on black background, premium brand label, clean geometric form, photorealistic render, no cartoon style",
    recommendedStyle: "photographic",
    recommendedModel: "ultra",
  },
  {
    name: "All-Over Print",
    category: "all-over",
    description:
      "Full-coverage patterns — bold camo, abstract motifs, premium all-over prints",
    icon: "🔁",
    promptPrefix:
      "Premium all-over print pattern for luxury streetwear, seamless repeating design,",
    promptSuffix:
      ", tileable seamless pattern, consistent density, sophisticated color palette, high-end fashion textile print, bold and refined, editorial quality, premium brand aesthetic, no childish elements",
    recommendedStyle: "photographic",
    recommendedModel: "ultra",
  },
];

export const STYLE_OPTIONS: {
  value: StylePreset;
  label: string;
  description: string;
}[] = [
  {
    value: "photographic",
    label: "Photo-Real",
    description: "Photorealistic, editorial quality",
  },
  {
    value: "cinematic",
    label: "Cinematic",
    description: "Dramatic, film-quality lighting",
  },
  {
    value: "digital-art",
    label: "Digital Art",
    description: "Clean digital illustration",
  },
  {
    value: "line-art",
    label: "Line Art",
    description: "Bold lines, screen-print ready",
  },
  {
    value: "3d-model",
    label: "3D Render",
    description: "Dimensional, premium product feel",
  },
  {
    value: "neon-punk",
    label: "Neon Punk",
    description: "Glowing neon, cyber-streetwear",
  },
  {
    value: "comic-book",
    label: "Comic Book",
    description: "Bold outlines, flat color pop",
  },
  {
    value: "anime",
    label: "Anime",
    description: "Japanese animation style",
  },
  {
    value: "low-poly",
    label: "Low Poly",
    description: "Geometric faceted style",
  },
  {
    value: "fantasy-art",
    label: "Fantasy Art",
    description: "Epic detailed illustration",
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
      "Fierce ape head portrait with sharp teeth, bold graphic, BAPE-inspired",
      "Roaring tiger face with gold chains, luxury streetwear graphic",
      "Abstract samurai mask with drip effect, Japanese streetwear",
      "Oversized bulldog mascot with spiked collar, premium brand identity",
    ],
  },
  {
    category: "Premium Graphics",
    prompts: [
      "Anatomical heart wrapped in barbed wire, dark luxury aesthetic",
      "Chrome melting skull with liquid metal drip, high-end editorial",
      "Koi fish in circular composition with waves, Japanese tattoo style",
      "Eagle clutching a banner, vintage Americana meets streetwear",
    ],
  },
  {
    category: "Bold Type",
    prompts: [
      "Heavyweight block letters NO DAYS OFF with distressed texture",
      "Gothic blackletter text LIMITLESS with chrome effect",
      "Stacked compressed type TRUST THE PROCESS, brutalist design",
      "Dripping paint text STAY HUNGRY with urban decay texture",
    ],
  },
  {
    category: "Patterns & Camo",
    prompts: [
      "Custom camo pattern with hidden faces and eyes, BAPE-inspired",
      "Abstract geometric pattern with interlocking shapes, monochrome",
      "Paisley bandana pattern reimagined with skulls and roses",
      "Lightning bolt repeat pattern, bold two-tone colorway",
    ],
  },
];

/** Default negative prompt to prevent low-quality, cartoonish output */
export const DEFAULT_NEGATIVE_PROMPT =
  "cartoon, cartoonish, childish, clipart, cheap, blurry, low quality, watermark, text overlay, stock photo, amateur, poorly drawn, distorted, deformed, ugly, jpeg artifacts, oversaturated, toy-like, sticker, emoji, cute, kawaii";
