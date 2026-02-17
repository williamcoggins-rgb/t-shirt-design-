import { DesignPreset, StylePreset } from "@/types";

/**
 * Prompt engineering — translating cartoon fundamentals for AI models:
 *
 * CORE INSIGHT: Diffusion models don't understand art-school process terms
 * like "line of action" or "straights against curves." Those are instructions
 * for human artists. We must translate cartoon principles into CONCRETE
 * VISUAL DESCRIPTIONS the AI can actually render:
 *
 * CHARACTER DESIGN (translated for AI):
 * - Shape language → describe actual shapes ("round head," "angular body")
 * - Silhouette readability → "bold simple shapes," "thick black outlines"
 * - Exaggerated proportions → "oversized head," "small body," "big eyes"
 * - Appeal / personality → "expressive face," "attitude," specific pose
 * - Dynamic posing → describe the pose ("leaning forward," "arms crossed")
 *
 * CRITICAL KEYWORD: "anthropomorphic" — tells the AI to give human traits
 * (arms, legs, face, body language) to non-human subjects. Without it,
 * "ice cream wearing sneakers" = literal cone with shoes placed next to it.
 * With it, the AI creates a character with a body.
 *
 * RENDERING STYLE (what the AI responds to):
 * - "thick black ink outlines" — the AI knows this look
 * - "flat color fills" + "cel-shaded shadows" — hard-edge flat shading
 * - "no gradients" — prevents halftone dot gain in screen printing
 * - "limited color palette" — screen print constraint (1-6 colors)
 * - "isolated on transparent background" — no background clutter
 *
 * The prefixes describe MEDIUM and CHARACTER FORMAT — not style or genre.
 * The user's prompt supplies the creative direction, subject, and mood.
 *
 * ANTI-DRIFT (Ultra model constraint):
 * Ultra does NOT support negative_prompt. All anti-drift language must live
 * inside the positive prompt. We embed it at the end of each suffix as
 * explicit exclusions: "not a photograph, not 3d render, not realistic."
 * Diffusion models treat these as soft-negative guidance — less powerful
 * than a real negative_prompt, but enough to anchor the style when combined
 * with strong positive style keywords.
 */

export const DESIGN_PRESETS: DesignPreset[] = [
  {
    name: "Graphic Design",
    category: "graphic",
    description:
      "Bold graphics — characters, mascots, icons, creative concepts",
    icon: "🎨",
    promptPrefix:
      "2D cartoon character illustration for screen-printed t-shirt, anthropomorphic full body character with expressive face and bold personality,",
    promptSuffix:
      ", thick black ink outlines, flat color fills with hard cel-shaded shadows, exaggerated cartoon proportions, full body with arms and legs visible, bold simplified shapes, limited color palette, solid flat colors only, no gradients, no shading gradients, isolated on plain white background, high contrast, print-ready vector art style, not a photograph, not photorealistic, not 3d render, no detailed background, no scenery",
    recommendedStyle: "comic-book",
    recommendedModel: "ultra",
  },
  {
    name: "Comic Art",
    category: "comics",
    description:
      "Comic book illustration — bold ink work, dramatic spot blacks, dynamic poses, Quesada/Lee/Miller style",
    icon: "💥",
    promptPrefix:
      "comic book ink illustration, bold ink on paper,",
    promptSuffix:
      ", dramatic spot blacks, confident thick-to-thin ink lines, high contrast, vivid color, isolated on plain white background, professional comic book cover art, not a photograph, not 3d render, no background scene",
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
      "hand-lettered custom typography for screen-printed t-shirt, 2D ink illustration,",
    promptSuffix:
      ", heavyweight bold letterforms with varied stroke weight, ink texture and rough edges showing the hand of the artist, flat spot color fills with no gradients, no shading gradients, strong black outlines, isolated on plain white background, high contrast, print-ready vector art style, not a photograph, not photorealistic, not 3d render, no detailed background, no scenery",
    recommendedStyle: "line-art",
    recommendedModel: "ultra",
  },
  {
    name: "Patches",
    category: "patch",
    description:
      "Embroidered patch designs — chenille, chain-stitch, dense threadwork",
    icon: "🛡️",
    promptPrefix: "embroidered chenille patch design, product photograph of a single patch,",
    promptSuffix:
      ", dense thread texture with visible stitch direction following the form, merrowed border edge, bold simplified shapes, limited color palette of 3-4 thread colors, isolated on plain white background, single centered object, no scenery, no background clutter, no person wearing it",
    recommendedStyle: "3d-model",
    recommendedModel: "ultra",
  },
  {
    name: "PVC / Rubber",
    category: "pvc",
    description:
      "Molded PVC rubber labels — tactile, dimensional, bold shapes",
    icon: "🔲",
    promptPrefix: "molded PVC rubber label design, product photograph of a single label,",
    promptSuffix:
      ", raised tactile surface with matte and gloss contrast, debossed detail lines, bold simple shapes, limited to 2-3 colors, isolated on plain white background, single centered object, no scenery, no background clutter, no person wearing it",
    recommendedStyle: "3d-model",
    recommendedModel: "ultra",
  },
  {
    name: "All-Over Print",
    category: "all-over",
    description:
      "Full-coverage patterns — camo, abstract motifs, flat graphic repeats",
    icon: "🔁",
    promptPrefix: "seamless repeating textile pattern for screen-printed fabric, 2D flat pattern design,",
    promptSuffix:
      ", tileable with no visible seams, flat spot colors with bold outlines, limited palette of 3-5 colors, solid flat colors only, no gradients, no shading gradients, high contrast, print-ready, not a photograph, not photorealistic, not 3d render, no background scene",
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
    description: "Thick ink outlines, flat cel-shaded color, spotted blacks",
  },
  {
    value: "line-art",
    label: "Line Art",
    description: "Clean ink lines with varied weight, minimal color",
  },
  {
    value: "anime",
    label: "Anime",
    description: "Japanese cel-shaded style, sharp shadow edges",
  },
  {
    value: "digital-art",
    label: "Digital Art",
    description: "Clean digital illustration, flat color",
  },
  {
    value: "neon-punk",
    label: "Neon Punk",
    description: "Vibrant neon rim-lighting on dark forms",
  },
  {
    value: "cinematic",
    label: "Cinematic",
    description: "High contrast, dramatic rim-lit silhouettes",
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
    description: "Detailed ink illustration, cross-hatched shading",
  },
  {
    value: "low-poly",
    label: "Low Poly",
    description: "Geometric faceted flat-color style",
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
    category: "Characters",
    prompts: [
      "gorilla kingpin, massive broad square body with tiny legs, hunched forward leaning on one fist, fur coat over boulder shoulders, gold chains, heavy-lidded menacing eyes with one eyebrow raised, cigar with curling smoke",
      "ice cream cone character melting with attitude, round swirled soft-serve head dripping on one side, small stubby body in a tracksuit and sneakers, cocky lean-back pose with crossed arms, smirking face with gold grill",
      "ghost samurai warrior, tall angular figure with cracked armor plates floating apart, wispy smoke body visible beneath, glowing hollow eyes under battered helmet, one skeletal hand reaching forward, ink smoke swirling",
      "mushroom wizard, enormous round spotted cap head on a tiny stump body, long wispy beard flowing to one side, crooked staff taller than himself, one eye squinting with knowing grin, small critters peeking from behind",
    ],
  },
  {
    category: "Comic Art",
    prompts: [
      "masked vigilante perched on a gargoyle ledge, cape billowing, dramatic low angle, city skyline silhouette behind, noir atmosphere",
      "armored warrior mid-swing with massive battle axe, fist flying toward viewer, speed lines radiating from impact, muscles tensed",
      "hooded anti-hero standing in rain-slicked alley, trench coat dripping, single streetlight casting long shadows, gritty urban mood",
      "cosmic entity emerging from crackling energy portal, flowing cape, heroic proportions, energy crackling around outstretched hands",
    ],
  },
  {
    category: "Illustrations",
    prompts: [
      "sacred heart wrapped in barbed wire and thorns, flames erupting from the top, roses growing from the wounds, dark religious icon",
      "human skull splitting open to reveal a cosmos of stars and nebulae inside, jaw hanging loose, ink splatter around edges",
      "koi fish transforming into a dragon mid-leap through crashing waves, scales shifting from fish to serpent, Japanese woodblock energy",
      "vintage botanical illustration of a venus flytrap devouring a tiny astronaut, scientific diagram labels, engraving cross-hatch detail",
    ],
  },
  {
    category: "Bold Type",
    prompts: [
      "block letters NO DAYS OFF built from cracked concrete slabs, rebar exposed, dust particles floating, heavyweight industrial feel",
      "gothic blackletter LIMITLESS with thorny vines growing through and cracking the letterforms apart, ink drip texture",
      "retro chrome script GOLDEN ERA with sunset gradient fill inside the letters, 70s van art style",
      "dripping spray paint text STAY HUNGRY on a raw brick wall, paint runs and overspray halo, street bombing style",
    ],
  },
  {
    category: "Patterns",
    prompts: [
      "custom camouflage pattern with hidden animal face silhouettes in the organic shapes, 4-color limited palette",
      "geometric interlocking hexagons and triangles forming a skull when viewed at distance, monochrome with bold outlines",
      "art nouveau floral repeat pattern with swirling vines and poppies, elegant flowing lines, two-color spot print",
      "repeating lightning bolt pattern with negative-space arrows between bolts, two-tone high contrast",
    ],
  },
];

/**
 * Negative prompt blocks failure modes identified through testing:
 * - photorealistic/photograph: pulls away from cartoon character style
 * - gradient/smooth/airbrush: causes halftone dot gain in screen print
 * - sticker/border: AI renders "sticker" look with white cutout borders
 * - background/scenery: we need isolated graphics, no environment
 * - realistic proportions: fights the exaggerated cartoon look we want
 * - clip art: prevents flat, lifeless, generic output
 */
export const DEFAULT_NEGATIVE_PROMPT =
  "photorealistic, photograph, 3d render, realistic proportions, realistic style, gradient, smooth shading, airbrush, soft shadows, blending, blurry, low quality, watermark, colored background, detailed background, scenery, landscape, sticker, sticker border, white border, white outline, cutout border, drop shadow, clip art, generic";
