import { DesignPreset, StylePreset } from "@/types";

/**
 * Prompt engineering informed by illustration + cartoon fundamentals:
 *
 * CHARACTER DESIGN (shape language, silhouette, appeal):
 * Shape language encodes personality — circles = friendly, squares = strong,
 * triangles = dangerous. Primary shape dominates the character's read.
 * Silhouette test: must be recognizable filled solid black.
 * Exaggerated proportions (big head/small body, oversized hands) = cartoon appeal.
 * "Appeal" = charisma, not cuteness — villains and monsters need appeal too.
 *
 * POSING (line of action, asymmetry, weight):
 * Line of action drawn first — a single sweeping C or S curve the whole
 * body follows. Asymmetric poses only — never twin the arms/legs.
 * Straights against curves on opposing contours of every form.
 * Squash or stretch state — never neutral. Push exaggeration beyond what
 * feels natural. Off-balance center of gravity implies motion.
 *
 * LINE ART: Varied line weight hierarchy — thick outer contours (silhouette),
 * medium form-separation lines (overlapping parts), thin interior detail.
 * Confident single-stroke ink lines with intentional thick-to-thin taper.
 *
 * SHADING: Cel-shaded flat color zones with hard shadow edges (no gradients).
 * 2-shadow approach: base color + shadow 1 (turned away from light) +
 * shadow 2 (deepest recesses). Strategic solid black shadow areas for drama.
 *
 * SCREEN PRINT CONSTRAINTS: 1pt minimum line weight (2pt+ safe). Flat spot
 * colors only — no gradients (halftone dot gain ruins them on fabric).
 * Bold black outlines serve as trapping zones to hide registration error
 * between color screens. Limited palette (1-6 colors). Cross-hatching and
 * stippling print as solid line art — superior to halftone shading.
 *
 * The prefixes describe MEDIUM and TECHNIQUE only — not style or genre.
 * The user's prompt supplies the creative direction, subject, and mood.
 */

export const DESIGN_PRESETS: DesignPreset[] = [
  {
    name: "Graphic Design",
    category: "graphic",
    description:
      "Bold graphics — characters, mascots, icons, creative concepts",
    icon: "🎨",
    promptPrefix:
      "hand-inked illustration for screen-printed t-shirt, bold dynamic design with strong silhouette and personality,",
    promptSuffix:
      ", dynamic asymmetric pose with strong line of action, exaggerated proportions, bold readable silhouette shape, varied line weight with thick outer contours and thin interior detail, cel-shaded flat color with hard shadow edges, spotted blacks for drama, straights against curves in the contours, limited palette, no gradients, isolated on transparent background, high contrast, print-ready",
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
      "hand-lettered custom typography for screen-printed t-shirt,",
    promptSuffix:
      ", heavyweight bold letterforms with varied stroke weight, ink texture and rough edges showing the hand of the artist, flat spot color fills with no gradients, strong black outlines, isolated on transparent background, high contrast, print-ready",
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
      ", dense thread texture with visible stitch direction following the form, merrowed border edge, bold simplified shapes, limited color palette of 3-4 thread colors, isolated on transparent background",
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
      ", raised tactile surface with matte and gloss contrast, debossed detail lines, bold simple shapes, limited to 2-3 colors, isolated on transparent background",
    recommendedStyle: "3d-model",
    recommendedModel: "ultra",
  },
  {
    name: "All-Over Print",
    category: "all-over",
    description:
      "Full-coverage patterns — camo, abstract motifs, flat graphic repeats",
    icon: "🔁",
    promptPrefix: "seamless repeating textile pattern for screen-printed fabric,",
    promptSuffix:
      ", tileable with no visible seams, flat spot colors with bold outlines, limited palette of 3-5 colors, no gradients, high contrast, print-ready",
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
      "menacing gorilla kingpin, massive square-shaped torso tapering to small feet, leaning forward with weight on front knuckles, heavy-lidded glare with one eyebrow cocked, fur coat draped over boulder shoulders, gold chains swinging, cigar smoke curling",
      "ice cream cone character melting with attitude, oversized round soft-serve head dripping onto a small puffed-up body, confident lean-back pose with arms crossed, sly half-smile, puddle forming at feet",
      "ancient samurai ghost, sharp triangular silhouette, cracked armor plates floating apart revealing smoky void beneath, hollow glowing eyes under a battered helmet, one spectral hand reaching forward, ink wash energy swirling",
      "jolly mushroom wizard, enormous round cap head on a tiny stump body, long wispy beard flowing to one side, crooked staff taller than himself, one eye squinting with a knowing grin, small forest critters peeking from behind",
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
 * Negative prompt blocks failure modes identified through research:
 * - gradient/smooth shading: causes halftone dot gain problems in screen print
 * - airbrush/soft shadows: opposite of the hard-edged cel-shaded look we want
 * - sticker/border: AI tends to render "sticker" look with white cutout borders
 * - photorealistic/photograph: pulls away from illustrated graphic style
 * - background/scenery: we need isolated graphics on transparent background
 * - blending/blurred: enemies of the crisp line art and flat color we need
 * - symmetrical/stiff/static: kills dynamic posing and appeal
 */
export const DEFAULT_NEGATIVE_PROMPT =
  "photorealistic, photograph, 3d render, gradient, smooth shading, airbrush, soft shadows, blending, blurry, low quality, watermark, colored background, detailed background, scenery, landscape, sticker, sticker border, white border, white outline, cutout border, drop shadow, symmetrical pose, stiff, static, flat boring composition";
