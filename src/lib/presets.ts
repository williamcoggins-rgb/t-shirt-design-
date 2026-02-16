import { DesignPreset, StylePreset } from "@/types";

export const DESIGN_PRESETS: DesignPreset[] = [
  {
    name: "Graphic Design",
    category: "graphic",
    description: "Bold graphics, illustrations, and artwork for statement tees",
    icon: "🎨",
    promptPrefix: "T-shirt graphic design,",
    promptSuffix:
      ", isolated on solid white background, clean edges, high contrast, print-ready, vector style, no text unless specified",
    recommendedStyle: "digital-art",
    recommendedModel: "ultra",
  },
  {
    name: "Custom Typography",
    category: "typography",
    description: "Custom lettering, wordmarks, and typographic designs",
    icon: "✏️",
    promptPrefix: "Typography t-shirt design, custom lettering,",
    promptSuffix:
      ", isolated on solid white background, bold readable text, clean crisp letterforms, high contrast, print-ready",
    recommendedStyle: "digital-art",
    recommendedModel: "sd3.5-large",
  },
  {
    name: "Patches",
    category: "patch",
    description: "Embroidered-look patch designs with borders and stitching",
    icon: "🛡️",
    promptPrefix: "Embroidered patch design,",
    promptSuffix:
      ", stitched border, embroidery texture, isolated on white background, detailed threadwork, merit badge style, clean edges",
    recommendedStyle: "3d-model",
    recommendedModel: "ultra",
  },
  {
    name: "PVC / Rubber",
    category: "pvc",
    description: "3D rubber/PVC style designs with tactile depth",
    icon: "🔲",
    promptPrefix: "3D PVC rubber patch design,",
    promptSuffix:
      ", molded plastic look, raised edges, tactile depth, solid colors, isolated on white background, clean industrial design",
    recommendedStyle: "3d-model",
    recommendedModel: "ultra",
  },
  {
    name: "All-Over Print",
    category: "all-over",
    description: "Seamless patterns and full-coverage designs",
    icon: "🔁",
    promptPrefix: "Seamless repeating pattern for all-over print t-shirt,",
    promptSuffix:
      ", tileable, seamless edges, consistent density, vibrant colors, print-ready pattern",
    recommendedStyle: "digital-art",
    recommendedModel: "core",
  },
];

export const STYLE_OPTIONS: { value: StylePreset; label: string; description: string }[] = [
  { value: "digital-art", label: "Digital Art", description: "Vibrant digital illustration" },
  { value: "comic-book", label: "Comic Book", description: "Bold outlines, flat colors" },
  { value: "line-art", label: "Line Art", description: "Clean lines, screen-print ready" },
  { value: "anime", label: "Anime", description: "Japanese animation style" },
  { value: "3d-model", label: "3D Render", description: "Dimensional rendered look" },
  { value: "low-poly", label: "Low Poly", description: "Geometric faceted style" },
  { value: "pixel-art", label: "Pixel Art", description: "Retro pixel aesthetic" },
  { value: "neon-punk", label: "Neon Punk", description: "Glowing neon cyberpunk" },
  { value: "origami", label: "Origami", description: "Paper fold aesthetic" },
  { value: "fantasy-art", label: "Fantasy Art", description: "Epic fantasy illustration" },
  { value: "photographic", label: "Photographic", description: "Photo-realistic render" },
  { value: "cinematic", label: "Cinematic", description: "Movie poster dramatic" },
];

export const QUICK_PROMPTS: { category: string; prompts: string[] }[] = [
  {
    category: "Streetwear",
    prompts: [
      "Skull with roses and dripping paint",
      "Graffiti-style wild animal portrait",
      "Japanese dragon with cherry blossoms",
      "Retro boombox with musical notes explosion",
    ],
  },
  {
    category: "Minimalist",
    prompts: [
      "Single continuous line drawing of a mountain",
      "Geometric wolf head made of triangles",
      "Simple sun and wave icon",
      "Abstract face in one stroke",
    ],
  },
  {
    category: "Vintage",
    prompts: [
      "Retro sunset with palm trees 80s style",
      "Classic motorcycle with flames",
      "Vintage camping badge with pine trees",
      "Old school tattoo style eagle",
    ],
  },
  {
    category: "Typography",
    prompts: [
      "Bold block letters saying DREAM BIG",
      "Grunge distressed text NO FEAR",
      "Elegant script lettering STAY WILD",
      "Retro 3D chrome text UNSTOPPABLE",
    ],
  },
];
