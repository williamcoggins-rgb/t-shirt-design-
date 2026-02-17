export type DesignCategory =
  | "graphic"
  | "comics"
  | "typography"
  | "patch"
  | "pvc"
  | "all-over";

export type StylePreset =
  | "digital-art"
  | "comic-book"
  | "line-art"
  | "anime"
  | "3d-model"
  | "low-poly"
  | "pixel-art"
  | "neon-punk"
  | "origami"
  | "fantasy-art"
  | "photographic"
  | "cinematic";

export type AspectRatio =
  | "1:1"
  | "4:5"
  | "5:4"
  | "3:2"
  | "2:3"
  | "16:9"
  | "9:16";

export type GenerationModel =
  | "sd3.5-large"
  | "sd3.5-medium"
  | "sd3.5-large-turbo"
  | "core"
  | "ultra";

export interface DesignRequest {
  prompt: string;
  category: DesignCategory;
  style?: StylePreset;
  aspectRatio: AspectRatio;
  model: GenerationModel;
  negativePrompt?: string;
  seed?: number;
}

export interface GeneratedDesign {
  id: string;
  prompt: string;
  category: DesignCategory;
  style?: StylePreset;
  model: GenerationModel;
  imageUrl: string;
  thumbnailUrl: string;
  createdAt: string;
  seed?: number;
  hasTransparentBg: boolean;
  isUpscaled: boolean;
}

export interface DesignPreset {
  name: string;
  category: DesignCategory;
  description: string;
  icon: string;
  promptPrefix: string;
  promptSuffix: string;
  recommendedStyle: StylePreset;
  recommendedModel: GenerationModel;
}

export interface ApiError {
  error: string;
  details?: string;
}
