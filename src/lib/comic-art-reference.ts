/**
 * COMIC ART REFERENCE — A prompt engineering knowledge base
 *
 * This file encodes the art mechanics, disciplines, and visual vocabulary
 * of professional comic book illustration. It exists so the prompt system
 * can draw on real artistic knowledge when constructing prompts for the
 * Stability AI image generation pipeline.
 *
 * Sources: 40+ professional artist analyses, 30+ instructional books,
 * industry-standard terminology from Marvel/DC production pipelines.
 *
 * =========================================================================
 * TABLE OF CONTENTS
 * =========================================================================
 * 1. ARTIST STYLE PROFILES (prompt-ready descriptions)
 * 2. INKING TECHNIQUE VOCABULARY
 * 3. FIGURE & ANATOMY VOCABULARY
 * 4. DYNAMIC MOVEMENT VOCABULARY
 * 5. COMPOSITION VOCABULARY
 * 6. LIGHT & SHADOW VOCABULARY
 * 7. PERSPECTIVE & DEPTH VOCABULARY
 * 8. STYLE FAMILY CROSSREF (which artists map to which aesthetic)
 * =========================================================================
 */

// ---------------------------------------------------------------------------
// 1. ARTIST STYLE PROFILES
// ---------------------------------------------------------------------------
// Each profile distills an artist's visual DNA into prompt-engineering terms.
// The `keywords` array contains terms that diffusion models respond to.
// The `essence` string is a one-line prompt fragment capturing their look.
// ---------------------------------------------------------------------------

export const ARTIST_PROFILES = {
  "joe-quesada": {
    name: "Joe Quesada",
    essence:
      "bold ink lines with dramatic spot blacks, Art Nouveau decorative elegance, noir chiaroscuro lighting, cinematic staging",
    influences: ["Alex Toth", "Mike Mignola", "Alphonse Mucha", "Frank Miller", "Bernie Wrightson"],
    keywords: [
      "bold confident ink strokes",
      "dramatic spot blacks",
      "Art Nouveau decorative elements",
      "high-contrast chiaroscuro",
      "noir-inflected superhero illustration",
      "sinuous flowing organic lines",
      "cinematic worm's eye view",
      "V-shape compositional design",
      "expressive emotionally charged faces",
      "pseudo-realistic anatomy with intentional exaggeration",
      "chunky massive heroic proportions",
      "flowing dramatic costume elements",
      "textured atmospheric backgrounds",
      "rim lighting separating figures from dark backgrounds",
      "painted digital color over bold ink linework",
    ],
    rendering: "Toth/Mignola spot blacks + Mucha ornamental detail. High contrast, bold shadows define form rather than crosshatching. Dramatic lighting with deep shadows as narrative tools.",
    lineWork: "Confident bold strokes with weight variation, thick-to-thin transitions. Economy of line from Toth school — every mark earns its place. Organic hand-drawn quality from 4H pencil to ink process.",
    anatomy: "Detailed pseudo-realistic foundation with layered exaggeration. Figures have real mass and weight. Sometimes disproportionate for emotional effect — large upper body, skinny legs — drawn for the emotion of each panel.",
    composition: "Small thumbnails → digital layout → lightbox pencils. V-shape designs with worm's eye cameras for larger-than-life heroic framing. Active tangent avoidance. Color guides for colorists to clarify overlapping forms.",
  },

  "jim-lee": {
    name: "Jim Lee",
    essence:
      "hyper-detailed crosshatching with unique hatching pattern per muscle group, vivid primary colors, crisp bold inks, heroic anatomy",
    keywords: [
      "hyper-detailed crosshatching",
      "fine-line rendering",
      "intricate muscle hatching",
      "vivid primary colors",
      "crisp bold inks",
      "exaggerated muscular physiques",
      "dynamic foreshortening",
      "planned shadow shapes",
      "feathered shadows",
      "heroic anatomy",
      "detailed costume rendering",
    ],
    rendering: "Meticulous planned crosshatching — shadow shapes established BEFORE any hatching. Unique hatching pattern for each muscle. Lines thin out and decrease density toward light. Core shadow technique: hatch denser near form shadow, thinner toward light.",
    lineWork: "Crisp, precise fine lines building density through layered hatching patterns. Inker Scott Williams adds boldness — feathering for soft shadows, crosshatching for intense shadows.",
    anatomy: "Exaggerated muscular physiques with every muscle group individually articulated. Heroic idealization — broad shoulders, defined musculature. Based on real structure but pushed toward heroic idealization.",
    composition: "Dynamic widescreen compositions with detailed backgrounds. Dense with visual information but readable through careful planning. Primary colors against contrasting shades.",
  },

  "todd-mcfarlane": {
    name: "Todd McFarlane",
    essence:
      "insanely detailed dense organic line work, spaghetti webbing, extreme contortion poses, impossibly dynamic anatomy, horror-fantasy texture",
    keywords: [
      "spaghetti webbing detail",
      "extreme contortion poses",
      "dense organic line work",
      "oversized mask eyes",
      "flowing sentient cape",
      "intricate detail overload",
      "anatomically warped figures",
      "hyper-dramatic poses",
      "kinetic energy",
      "horror-fantasy texture",
      "chains and organic elements",
      "maximum visual density",
    ],
    rendering: "Dense, heavy inking with overembellished detail-saturated approach. Shadows rendered rather than spotted. Maximum visual density — fills negative space with visual information.",
    lineWork: "Extremely dense organic approach. Signature spaghetti webbing — intricate twisting individual strands filling negative space. Lines create organic textures that appear almost alive.",
    anatomy: "Trademark anatomically-warped, hyper-dramatically posed, cartoonishly-faced style. Intentional distortion for dramatic effect — elongated, contorted, impossible positions. Oversized mask eyes for expressiveness.",
    composition: "Elaborate page layouts, unusual panel borders. Characters burst out of frames with overlapping panels and craggy edges. Splash pages are operatic. Signature flowing cape can overwhelm if unchecked.",
  },

  "jack-kirby": {
    name: "Jack Kirby",
    essence:
      "bold angular blocky figures, Kirby Krackle cosmic energy dots, extreme foreshortening with fists lunging at viewer, explosive kinetic dynamism",
    keywords: [
      "Kirby Krackle",
      "Kirby Dots",
      "cosmic energy dots",
      "extreme foreshortening",
      "blocky angular figures",
      "forced perspective",
      "dynamic tension",
      "Kirby Tech",
      "mechanical detail",
      "bold spot blacks",
      "explosive action",
      "photomontage backgrounds",
      "exaggerated musculature",
      "three-plane depth",
    ],
    rendering: "Bold, angular, blocky — prioritizing energy over illustrative detail. Reductive approach: strips scenes to most dynamic essence. Master of spotting blacks — placing black behind objects to push them forward.",
    lineWork: "Bold angular strokes. Invented Kirby Krackle (clusters of black dots with negative space between them depicting cosmic energy). Kirby Tech — machines with unique angular mechanical shapes.",
    anatomy: "Deliberately evolved away from illustrative accuracy toward cartoonish abstraction and hyper-exaggeration. Understood counter-motions of hips, shoulders, head for maximum torque and tension.",
    composition: "THE master of extreme foreshortening and forced perspective. Fist or leg larger than torso/head. Figures across three planes of depth. Figures leap off page toward reader. Pioneered full/double-page spreads.",
  },

  "frank-miller": {
    name: "Frank Miller",
    essence:
      "extreme black-and-white contrast, noir silhouettes against stark backgrounds, heavy spot blacks, Sin City chiaroscuro, blocky brutish anatomy",
    keywords: [
      "extreme black-and-white contrast",
      "noir silhouettes",
      "heavy spot blacks",
      "German Expressionist shadows",
      "blocky brutish anatomy",
      "film noir aesthetic",
      "Sin City style",
      "stark chiaroscuro",
      "selective color highlights",
      "toothbrush ink splatter",
      "double contour lines",
      "inverse silhouette",
      "cinematic montage",
    ],
    rendering: "Four modes: silhouette on white, inverse silhouette on black, foreground shaded with black bg, both shaded. Stylistic shadows drawn in solid black. Selective color (red, yellow) highlights specific elements.",
    lineWork: "Evolved from noir-influenced to extreme black-white contrast. Sin City: hatching, stippling, large black areas, monochromatic silhouettes. Tools: Blackwing pencils, India ink, liquid frisket, toothbrush spatter.",
    anatomy: "Dark Knight Returns: heavy, thick, brutish — aging mass of block-like muscle. Sin City: expressionistic, exaggerated forms pushed to graphic limit.",
    composition: "DKR: signature 16-panel four-tier grid for cinematic montage. Gutters as narrative tools. Sin City: onomatopoeia incorporated via lighting/negative space. Extreme juxtaposition of simultaneous events.",
  },

  "alex-ross": {
    name: "Alex Ross",
    essence:
      "fully painted photorealistic superheroes in gouache and watercolor wash, Norman Rockwell narrative staging, realistic human anatomy, classical heroic composition",
    keywords: [
      "photorealistic painted comic art",
      "gouache painting",
      "watercolor wash",
      "translucent layered washes",
      "Norman Rockwell superhero",
      "realistic human anatomy",
      "classical heroic composition",
      "airbrushed backgrounds",
      "no ink outlines",
      "fine art superhero painting",
      "vibrant painted color",
      "cinematic still composition",
      "Golden Age nostalgia",
      "lifelike facial expressions",
    ],
    rendering: "Full painted rendering in gouache/watercolor wash with airbrushed elements. No crosshatching, no spot blacks — pure painted values with smooth gradations. Color built through translucent layered washes.",
    lineWork: "No traditional ink line work. Paints directly. White of paper shows through translucent layers. No visible brushstrokes — both stylized and wildly realistic.",
    anatomy: "Based on live photographic reference. Realistic human proportions — muscular but also vulnerable with wrinkles, pores, skin texture. Direct counter to bulging mega-muscled 1990s style.",
    composition: "Classical, epic, often symmetrical. Evokes Golden Age grandeur. Art functions as fine-art portraiture applied to superhero subject matter. Splash pages are monumental.",
  },

  "neal-adams": {
    name: "Neal Adams",
    essence:
      "photorealistic dynamic artwork, feathered ink rendering, anatomically accurate muscles, realistic dramatic lighting, finger-pointing foreshortening",
    keywords: [
      "photorealistic superhero art",
      "anatomically accurate muscles",
      "realistic dramatic lighting",
      "feathered ink rendering",
      "finger-pointing foreshortening",
      "hyper-real faces",
      "cast shadows",
      "photographic reference",
      "cinematic fight choreography",
      "maximum dramatic impact",
      "realistic textures and weight",
      "glamorous hyper-realism",
      "atmospheric mood lighting",
    ],
    rendering: "Feathering as core technique — lines at angles from heavier lines like barbs from a feather. Also crosshatching for depth. Master of dramatic lighting creating mood through realistic light-and-shadow.",
    lineWork: "Sophisticated inking with advertising-quality precision. Meticulous naturalistic rendering with careful attention to light source, cast shadows, form modeling. Characters have weight and texture.",
    anatomy: "Anatomically accurate realistic superhero anatomy. Professional weightlifter physiques — powerful, proportionally correct, grounded. But hyper-real: more glamorous, glossy, sexy, exciting than real people.",
    composition: "Broke from traditional grids for maximum dramatic impact. Trademark finger-pointed-in-your-face foreshortening. Wordless fight scenes choreographed like film sequences.",
  },

  "greg-capullo": {
    name: "Greg Capullo",
    essence:
      "bold clean line work with strategic cartoon abstraction, predatory streamlined figures, neo-noir atmosphere, horror-influenced superhero art, Hunt 102 quill inks",
    keywords: [
      "bold clean line work",
      "Hunt 102 quill inks",
      "realistic with cartoon abstraction",
      "predatory streamlined figures",
      "neo-noir atmosphere",
      "horror-influenced superhero art",
      "dramatic shadow play",
      "innovative page layouts",
      "menacing Gotham environments",
      "Batman Animated Series influence",
      "India ink rendering",
      "dark urban atmosphere",
    ],
    rendering: "Cross-hatching and shading for depth and texture. Neo-noir graphic novel quality with brooding atmosphere. Horror-comics heritage from Spawn infuses work with genuine menace.",
    lineWork: "Bold, clean, anatomically precise with strategic abstraction. Insists on traditional tools: 4H pencils for layouts, F for finishes, India ink with Hunt 102 quill nibs. Despises digital ink look.",
    anatomy: "Realistic and anatomically correct with selective shape abstraction. Batman retains muscular physique but with more streamlined, predatory quality. Influences: Buscema, Adams, Colan, Kane, Frazetta.",
    composition: "Willing to experiment radically — maze sequences, disorienting panel designs. Horror sensibility applied to superhero composition. Bold iconic cover staging.",
  },

  "david-finch": {
    name: "David Finch",
    essence:
      "hyper-detailed pencil rendering, gritty raw aesthetic, heavy muscular anatomy, ball-start crosshatch lines, dark somber mood, strong silhouettes",
    keywords: [
      "hyper-detailed pencil rendering",
      "gritty raw aesthetic",
      "heavy muscular anatomy",
      "ball-start crosshatch lines",
      "dark somber mood",
      "form shadow rendering",
      "strong silhouettes",
      "urban dark atmosphere",
      "intense character expressions",
      "single directional lighting",
      "layered dark backgrounds",
    ],
    rendering: "Precise shadow theory: single directional light with hard shadows. Never renders out of cast shadows. Cross-hatching moves from form shadow toward light. Three line variations: ball-start taper, double-taper, broken/fragmented.",
    lineWork: "Each crosshatch line starts with a small ball shape (pencil limitation), then eases out. Also uses broken/fragmented lines for texture. Works on 11x17 Strathmore Bristol.",
    anatomy: "Powerfully muscular, heavily defined. Begins with simple tube/cylinder forms and layers muscle placement. Characters are serious, somber warriors carrying pain.",
    composition: "Centralized hero compositions with layered urban backgrounds. Strong emphasis on silhouette readability. Bold, dark, high-contrast staging.",
  },

  "marc-silvestri": {
    name: "Marc Silvestri",
    essence:
      "intricate cross-hatching on slender menacing figures, Image Style codifier, gothic dark atmosphere, Franklin Booth directional line rendering, Frazetta-influenced fantasy anatomy",
    keywords: [
      "intricate cross-hatching",
      "directional line rendering",
      "Image Style",
      "slender menacing figures",
      "fantasy anatomy",
      "gothic atmosphere",
      "fine line detail",
      "metallic ornaments",
      "earth tones with contrast highlights",
      "horror-fantasy aesthetic",
      "dramatic moody staging",
    ],
    rendering: "Cross-hatching and directional line rendering from the Franklin Booth school. Lines follow form direction. Mix of naturalism and sketch-and-scratch art. Light cross-hatching creates texture without overwhelming.",
    lineWork: "Strong expressive lines with intricate crosshatching. Popularized the 'Image Style' — Arthur Adams's cross-hatched detail applied to slender, menacing, sexy figures with fine lines and metallic details.",
    anatomy: "Dynamic muscular anatomy with ornate detail. Simultaneously naturalistic and stylized. Influences: Bernie Wrightson, John Buscema, Frank Frazetta. Slender yet powerfully built.",
    composition: "Emphasizes foreground elements and dynamic angles. Dark, moody atmospherics. Visual storytelling balances detailed rendering with clear readability.",
  },
} as const;

// ---------------------------------------------------------------------------
// 2. INKING TECHNIQUE VOCABULARY
// ---------------------------------------------------------------------------
// Terms that diffusion models can interpret for rendering style.
// Each entry: the technique name, what it looks like, and prompt keywords.
// ---------------------------------------------------------------------------

export const INKING_TECHNIQUES = {
  crossHatching: {
    description: "Layered parallel lines crossing at angles creating mesh-like tone. Density and angle control darkness.",
    promptKeywords: ["cross-hatching shadows", "dense crosshatch rendering", "intricate crosshatching", "hatched shading"],
  },
  feathering: {
    description: "Lines radiating from shadow edge like barbs from a feather, thinning toward light. Follows form direction.",
    promptKeywords: ["feathered ink shading", "feathered shadows", "graduated ink lines", "soft feathered transitions"],
  },
  spotBlacks: {
    description: "Large solid black areas for contrast, mood, and compositional balance. Squint test for placement.",
    promptKeywords: ["spot blacks", "heavy black shadows", "noir blacks", "large black ink areas", "dramatic spot blacks"],
  },
  stippling: {
    description: "Accumulated dots creating texture/value. Closer dots = darker. Extremely precise textural detail.",
    promptKeywords: ["stippled texture", "ink dot shading", "pointillist rendering"],
  },
  dryBrush: {
    description: "Most ink wiped from brush — strokes break up into granular texture. Rough organic edges.",
    promptKeywords: ["dry brush texture", "broken ink strokes", "rough ink texture", "raw brush marks"],
  },
  contourHatching: {
    description: "Hatching lines follow the 3D surface direction, simultaneously creating tone AND describing form.",
    promptKeywords: ["contour hatching", "form-following hatch lines", "cross-contour rendering"],
  },
} as const;

// ---------------------------------------------------------------------------
// 3. FIGURE & ANATOMY VOCABULARY
// ---------------------------------------------------------------------------

export const ANATOMY_VOCABULARY = {
  heroicProportions: {
    description: "8-9 heads tall. Broader shoulders, narrower waist, longer limbs. Exaggerated musculature with every group visible.",
    promptKeywords: ["heroic proportions", "8-head figure", "idealized anatomy", "exaggerated musculature"],
  },
  gestureAndAction: {
    description: "Line of action — invisible sweeping curve tracing primary force through figure. Contrapposto — weight shift creating S-curve.",
    promptKeywords: ["dynamic gesture", "S-curve pose", "contrapposto stance", "strong line of action"],
  },
  foreshortening: {
    description: "Limbs pointing toward/away from viewer appear compressed. Near end dramatically larger than far end.",
    promptKeywords: ["dramatic foreshortening", "extreme foreshortening", "fist-toward-viewer perspective"],
  },
  weightAndBalance: {
    description: "Plumb line from head between feet for balance. Unbalanced = motion/falling. Clear grounding even in exaggerated poses.",
    promptKeywords: ["grounded stance", "weight-shifted pose", "balanced figure"],
  },
} as const;

// ---------------------------------------------------------------------------
// 4. DYNAMIC MOVEMENT VOCABULARY
// ---------------------------------------------------------------------------

export const MOVEMENT_VOCABULARY = {
  speedLines: {
    description: "Parallel lines trailing behind moving object. Curved for arcing motion. Radial for impact/explosion.",
    promptKeywords: ["speed lines", "motion blur", "radial impact lines", "motion streaks"],
  },
  squashAndStretch: {
    description: "Compress figure to show force absorption (landing). Elongate to show force extension (leaping/punching).",
    promptKeywords: ["squash and stretch", "compressed impact pose", "stretched dynamic figure"],
  },
  anticipation: {
    description: "Counter-movement before main action — pulling back before punch, crouching before jump.",
    promptKeywords: ["anticipation pose", "coiled tension", "wind-up pose"],
  },
  followThrough: {
    description: "After main movement stops, secondary elements (hair, cape, cloth) continue due to inertia.",
    promptKeywords: ["follow-through motion", "whipping cape", "flowing hair trailing", "cloth momentum"],
  },
} as const;

// ---------------------------------------------------------------------------
// 5. COMPOSITION VOCABULARY
// ---------------------------------------------------------------------------

export const COMPOSITION_VOCABULARY = {
  silhouetteReadability: {
    description: "Every character/pose readable as filled-in black silhouette. If ambiguous, design needs rework.",
    promptKeywords: ["strong silhouette", "silhouette-readable design", "clear iconic shape"],
  },
  figureGround: {
    description: "Clear separation between subject and background through contrast, line weight, detail, or value.",
    promptKeywords: ["figure-ground separation", "isolated focal point", "high contrast focal point"],
  },
  leadingLines: {
    description: "Visual elements whose contour points toward focal point — gaze direction, limbs, architecture, shadow edges.",
    promptKeywords: ["leading lines", "directed composition", "converging visual elements"],
  },
  depthLayers: {
    description: "Thick lines = foreground, medium = middle, thin = background. Detail gradient: more rendering near, less far.",
    promptKeywords: ["layered depth", "foreground-background separation", "atmospheric depth"],
  },
} as const;

// ---------------------------------------------------------------------------
// 6. LIGHT & SHADOW VOCABULARY
// ---------------------------------------------------------------------------

export const LIGHTING_VOCABULARY = {
  chiaroscuro: {
    description: "High-contrast light-dark for dramatic effect. Core shadow (darkest band on form), form shadow, cast shadow.",
    promptKeywords: ["dramatic chiaroscuro", "deep noir shadows", "bold shadow shapes", "three-value shading"],
  },
  rimLighting: {
    description: "Light along outer edges from back/side source. Defines shape, separates from background, adds drama.",
    promptKeywords: ["rim lighting", "backlighting silhouette", "edge-lit figure", "backlit hero"],
  },
  noirLighting: {
    description: "Heavy blacks, single dramatic source, deep contrast. Tension, danger, moral ambiguity, urban grit.",
    promptKeywords: ["film noir lighting", "heavy shadows", "single light source", "stark contrast"],
  },
  dramaticUpLighting: {
    description: "Light from below face. Creates unnatural shadow patterns reading as fear, menace, supernatural.",
    promptKeywords: ["dramatic up-lighting", "horror lighting", "under-lit face", "menacing shadows"],
  },
  rembrandtLighting: {
    description: "Light from upper-left/right at ~45 degrees. Standard dramatic: reveals form, musculature, facial structure.",
    promptKeywords: ["Rembrandt lighting", "three-quarter lighting", "classical dramatic lighting"],
  },
} as const;

// ---------------------------------------------------------------------------
// 7. PERSPECTIVE & DEPTH VOCABULARY
// ---------------------------------------------------------------------------

export const PERSPECTIVE_VOCABULARY = {
  extremeLowAngle: {
    description: "Three-point perspective from below. Verticals converge upward. Soaring height, heroic power.",
    promptKeywords: ["extreme low angle", "worm's eye view", "three-point perspective", "dramatic upward angle"],
  },
  birdsEye: {
    description: "Three-point from above. Verticals converge downward. Plunging depth, vulnerability, scale.",
    promptKeywords: ["bird's-eye view", "aerial perspective", "looking down", "vertiginous depth"],
  },
  atmosphericPerspective: {
    description: "Distant objects lighter, cooler, less detailed, less saturated. Mimics atmospheric particles.",
    promptKeywords: ["atmospheric perspective", "aerial haze", "depth of field", "fading background"],
  },
  forcedPerspective: {
    description: "Exaggerated scale between near and far elements. Kirby's fists larger than torsos.",
    promptKeywords: ["forced perspective", "exaggerated scale", "dramatic size contrast"],
  },
} as const;

// ---------------------------------------------------------------------------
// 8. STYLE FAMILY CROSSREF
// ---------------------------------------------------------------------------
// Maps aesthetic goals to the artists whose DNA best achieves them.
// Used when the prompt system needs to select reference vocabulary.
// ---------------------------------------------------------------------------

export const STYLE_FAMILIES = {
  grittyDark: {
    label: "Gritty / Dark / Noir",
    artists: ["frank-miller", "david-finch", "marc-silvestri", "todd-mcfarlane", "greg-capullo"],
    coreKeywords: ["heavy spot blacks", "cross-hatching", "gritty urban", "neo-noir", "dark atmospheric", "heavy shadows", "raw ink work"],
  },
  cleanPolished: {
    label: "Clean / Polished / Elegant",
    artists: ["joe-quesada", "neal-adams", "jim-lee"],
    coreKeywords: ["clean line work", "elegant thick-thin variation", "fluid contour lines", "polished rendering", "confident ink strokes"],
  },
  photorealistic: {
    label: "Photorealistic / Painted",
    artists: ["alex-ross", "neal-adams"],
    coreKeywords: ["painted gouache", "photorealistic anatomy", "realistic lighting", "translucent washes", "fine art superhero painting"],
  },
  cosmicEpic: {
    label: "Cosmic / Epic Scale",
    artists: ["jack-kirby"],
    coreKeywords: ["Kirby Krackle", "cosmic energy dots", "psychedelic color", "epic compositions", "energy constructs", "explosive scale"],
  },
  maximumDetail: {
    label: "Maximum Detail Density",
    artists: ["jim-lee", "todd-mcfarlane", "david-finch", "marc-silvestri"],
    coreKeywords: ["hyper-detailed crosshatching", "dense line work", "intricate rendering", "every-muscle-hatched", "maximum visual density"],
  },
  dynamicAction: {
    label: "Dynamic Action / Kinetic Energy",
    artists: ["jack-kirby", "neal-adams", "jim-lee", "todd-mcfarlane", "joe-quesada"],
    coreKeywords: ["extreme foreshortening", "explosive poses", "forced perspective", "contorted figures", "dynamic tension", "action lines"],
  },
} as const;

// ---------------------------------------------------------------------------
// BOOK REFERENCES — The canon of comic art instruction
// ---------------------------------------------------------------------------
// Encoded as data so the system can reference authoritative sources
// when explaining art concepts or constructing informed prompts.
// ---------------------------------------------------------------------------

export const REFERENCE_BOOKS = [
  // Figure Drawing
  { title: "Dynamic Figure Drawing", author: "Burne Hogarth", discipline: "figure", key: "Figures as sculptural mass in deep space. Dynamic tension, foreshortening, overlapping forms." },
  { title: "Dynamic Anatomy", author: "Burne Hogarth", discipline: "anatomy", key: "Expressive anatomy from artist's POV. Mass-to-movement relationships." },
  { title: "Figure Drawing for All It's Worth", author: "Andrew Loomis", discipline: "figure", key: "Constructive anatomy, volumetric form, 8-head proportion canon, mannikin construction." },
  { title: "Drawing the Head and Hands", author: "Andrew Loomis", discipline: "figure", key: "The Loomis Method (ball and plane head construction). Facial features from any angle." },
  { title: "Bridgman's Complete Guide to Drawing from Life", author: "George Bridgman", discipline: "figure", key: "Gesture, wedging, interlocking forms. Fewest lines to capture truth of a pose." },
  { title: "Figure Drawing: Design and Invention", author: "Michael Hampton", discipline: "figure", key: "Modern Hogarth+Loomis synthesis. Design-driven anatomy, inventing figures from imagination." },
  { title: "Force: Dynamic Life Drawing", author: "Mike Mattesi", discipline: "figure", key: "The Force line. How forces travel through the body. Gravity's effect on form." },

  // Inking
  { title: "The DC Comics Guide to Inking Comics", author: "Klaus Janson", discipline: "inking", key: "THE definitive inking book. Line weight, spotting blacks, rendering texture, light logic. 30 years experience." },
  { title: "The Art of Comic Book Inking (3rd Ed)", author: "Gary Martin", discipline: "inking", key: "Industry-standard inking manual. Includes practice boards with Kirby/Buscema/Kane pencils." },
  { title: "Dynamic Light and Shade", author: "Burne Hogarth", discipline: "inking", key: "How light reveals 3D form. Shadow construction, dramatic chiaroscuro." },

  // Composition & Storytelling
  { title: "Comics and Sequential Art", author: "Will Eisner", discipline: "storytelling", key: "Bedrock of formal comics studies. Panel composition, timing, framing, visual grammar." },
  { title: "Understanding Comics: The Invisible Art", author: "Scott McCloud", discipline: "storytelling", key: "Comics theory — closure, panel transitions, iconic abstraction, the Big Triangle." },
  { title: "Making Comics", author: "Scott McCloud", discipline: "storytelling", key: "Practical comics creation. Character design, expressions, body language, word/picture integration." },
  { title: "Framed Ink", author: "Marcos Mateu-Mestre", discipline: "composition", key: "Shot composition for visual storytellers. Light/dark guiding the eye, mood through composition." },
  { title: "Graphic Storytelling and Visual Narrative", author: "Will Eisner", discipline: "storytelling", key: "Story construction, words-and-pictures relationship, graphic characterization." },
  { title: "Expressive Anatomy for Comics and Narrative", author: "Will Eisner", discipline: "storytelling", key: "Body language as narrative. How emotion alters physical form. The silhouette test." },

  // Perspective
  { title: "Perspective! for Comic Book Artists", author: "David Chelsea", discipline: "perspective", key: "The definitive comic-specific perspective manual. Taught in comic-strip format." },
  { title: "Framed Perspective Vol. 1", author: "Marcos Mateu-Mestre", discipline: "perspective", key: "Perspective as narrative tool. Camera placement for emotional effect." },
  { title: "Framed Perspective Vol. 2", author: "Marcos Mateu-Mestre", discipline: "perspective", key: "Shadow projection in perspective, figures in environments, volume through shadow." },
  { title: "How to Draw", author: "Scott Robertson", discipline: "perspective", key: "Constructive perspective, hard-surface design, vehicles, architecture." },

  // Complete Courses
  { title: "How to Draw Comics the Marvel Way", author: "Stan Lee & John Buscema", discipline: "complete", key: "THE book that created a generation. Dynamic figure work, dramatic composition, the Marvel visual identity." },
  { title: "DC Comics Guide to Pencilling Comics", author: "Klaus Janson", discipline: "complete", key: "Anatomy, composition, page design, visual communication through pencils." },
  { title: "DC Comics Guide to Creating Comics", author: "Carl Potts", discipline: "complete", key: "Comic theory — analyzing WHY visual choices work. Three pencillers tackle same script." },

  // Color & Light
  { title: "Color and Light", author: "James Gurney", discipline: "color", key: "Sources of light, light-form interaction, color wheel, atmospheric effects. #1 bestseller." },
] as const;
