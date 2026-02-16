import { DesignPreset, StylePreset } from "@/types";

export const DESIGN_PRESETS: DesignPreset[] = [
  {
    name: "Graphic Design",
    category: "graphic",
    description:
      "Premium streetwear graphics — bold line work, flat color, limited palette, screen-print ready",
    icon: "🎨",
    promptPrefix:
      "Professional streetwear t-shirt graphic, bold ink illustration, strong line work, limited color palette,",
    promptSuffix:
      ", isolated on solid black background, clean sharp edges, high contrast, screen-print separation ready, bold confident strokes, flat color fills, hand-drawn quality, professional apparel graphic, fashion-forward, no photorealism, no gradients, no 3D rendering",
    recommendedStyle: "line-art",
    recommendedModel: "ultra",
  },
  {
    name: "Custom Typography",
    category: "typography",
    description:
      "Bold custom lettering — heavyweight hand-drawn type, distressed ink textures, statement wordmarks",
    icon: "✏️",
    promptPrefix:
      "Premium streetwear typography design, bold hand-lettered custom type, ink on paper,",
    promptSuffix:
      ", isolated on solid black background, heavyweight bold letterforms, strong visual impact, hand-drawn ink quality, distressed texture, screen-print aesthetic, limited color, professional type design, no thin fonts, no digital smoothness, no photorealism",
    recommendedStyle: "line-art",
    recommendedModel: "ultra",
  },
  {
    name: "Patches",
    category: "patch",
    description:
      "Premium embroidered patch designs — chenille, chain-stitch, dense threadwork detail",
    icon: "🛡️",
    promptPrefix:
      "Luxury embroidered patch design, premium chenille patch, high-end streetwear,",
    promptSuffix:
      ", dense embroidery texture, satin stitch detail, merrowed border edge, isolated on black background, premium quality threadwork, fashion brand patch, detailed craftsmanship, flat illustration style, bold outlines, limited color palette",
    recommendedStyle: "3d-model",
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
      ", raised tactile surface, matte and gloss finish contrast, precise industrial molding, isolated on black background, premium brand label, clean geometric form, bold simple shapes, limited color, no photorealism",
    recommendedStyle: "3d-model",
    recommendedModel: "ultra",
  },
  {
    name: "All-Over Print",
    category: "all-over",
    description:
      "Full-coverage patterns — bold camo, abstract motifs, flat graphic repeat prints",
    icon: "🔁",
    promptPrefix:
      "Premium all-over print pattern for streetwear, seamless repeating design, bold flat graphic,",
    promptSuffix:
      ", tileable seamless pattern, consistent density, limited sophisticated color palette, flat color fills, bold outlines, screen-print textile aesthetic, strong graphic identity, no gradients, no photorealism",
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
    value: "line-art",
    label: "Line Art",
    description: "Bold lines, flat color, screen-print ready",
  },
  {
    value: "comic-book",
    label: "Bold Graphic",
    description: "Strong outlines, flat color separations",
  },
  {
    value: "cinematic",
    label: "Cinematic",
    description: "Dramatic contrast, dark mood",
  },
  {
    value: "digital-art",
    label: "Digital Art",
    description: "Clean digital illustration",
  },
  {
    value: "3d-model",
    label: "3D Render",
    description: "Dimensional, product mockup feel",
  },
  {
    value: "neon-punk",
    label: "Neon Punk",
    description: "Glowing neon, cyber-streetwear",
  },
  {
    value: "photographic",
    label: "Photo-Real",
    description: "Photorealistic render",
  },
  {
    value: "anime",
    label: "Anime",
    description: "Japanese animation style",
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
      "Fierce ape head portrait with sharp teeth, bold ink lines, BAPE-inspired",
      "Roaring tiger face, heavy black outlines, two-color screen print",
      "Abstract samurai mask with drip effect, Japanese ink brush style",
      "Snarling bulldog mascot, bold flat graphic, limited palette",
    ],
  },
  {
    category: "Premium Graphics",
    prompts: [
      "Anatomical heart wrapped in barbed wire, bold line work, red and black",
      "Skull with melting drip effect, heavy ink illustration, monochrome",
      "Koi fish in circular composition, Japanese woodblock print style",
      "Eagle with spread wings, vintage tattoo flash style, bold outlines",
    ],
  },
  {
    category: "Bold Type",
    prompts: [
      "Heavyweight block letters NO DAYS OFF with distressed ink texture",
      "Gothic blackletter text LIMITLESS, bold hand-drawn, black ink",
      "Stacked compressed type TRUST THE PROCESS, brutalist bold weight",
      "Dripping ink text STAY HUNGRY, hand-painted brush lettering",
    ],
  },
  {
    category: "Patterns & Camo",
    prompts: [
      "Custom camo pattern with hidden ape faces, BAPE-inspired, flat color",
      "Abstract geometric pattern, interlocking shapes, two-tone monochrome",
      "Paisley bandana pattern with skulls, bold outlines, flat fills",
      "Lightning bolt repeat pattern, bold two-color screen print",
    ],
  },
];

/** Default negative prompt to prevent low-quality, cartoonish output */
export const DEFAULT_NEGATIVE_PROMPT =
  "photorealistic, photograph, 3D render, smooth gradients, airbrushed, cartoonish, childish, clipart, cheap, blurry, low quality, watermark, text overlay, stock photo, amateur, poorly drawn, distorted, deformed, ugly, jpeg artifacts, oversaturated, toy-like, sticker, emoji, cute, kawaii";
