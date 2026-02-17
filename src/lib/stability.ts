import { GenerationModel } from "@/types";

const STABILITY_API_BASE = "https://api.stability.ai/v2beta/stable-image";

function getApiKey(): string {
  const key = process.env.STABILITY_API_KEY;
  if (!key) {
    throw new Error("STABILITY_API_KEY environment variable is not set");
  }
  return key;
}

function getEndpointForModel(model: GenerationModel): string {
  switch (model) {
    case "ultra":
      return `${STABILITY_API_BASE}/generate/ultra`;
    case "core":
      return `${STABILITY_API_BASE}/generate/core`;
    case "sd3.5-large":
    case "sd3.5-medium":
    case "sd3.5-large-turbo":
      return `${STABILITY_API_BASE}/generate/sd3`;
    default:
      return `${STABILITY_API_BASE}/generate/core`;
  }
}

export async function generateImage(params: {
  prompt: string;
  negativePrompt?: string;
  aspectRatio?: string;
  model: GenerationModel;
  style?: string;
  seed?: number;
}): Promise<{ imageBase64: string; seed: number; finishReason: string }> {
  const apiKey = getApiKey();
  const endpoint = getEndpointForModel(params.model);

  const formData = new FormData();
  formData.append("prompt", params.prompt);
  formData.append("output_format", "png");

  if (params.aspectRatio) {
    formData.append("aspect_ratio", params.aspectRatio);
  }

  if (params.negativePrompt) {
    formData.append("negative_prompt", params.negativePrompt);
  }

  if (params.seed && params.seed > 0) {
    formData.append("seed", params.seed.toString());
  }

  // Model-specific params
  if (
    params.model === "sd3.5-large" ||
    params.model === "sd3.5-medium" ||
    params.model === "sd3.5-large-turbo"
  ) {
    formData.append("model", params.model);
  }

  // Style preset only works with Core
  if (params.model === "core" && params.style) {
    formData.append("style_preset", params.style);
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
    },
    body: formData,
  });

  const responseText = await response.text();

  if (!response.ok) {
    let errorDetail = responseText.slice(0, 500);
    try {
      errorDetail = JSON.stringify(JSON.parse(responseText));
    } catch {
      // Response was not JSON — use raw text
    }
    throw new Error(
      `Stability AI error (${response.status}): ${errorDetail}`
    );
  }

  let data;
  try {
    data = JSON.parse(responseText);
  } catch {
    throw new Error(
      `Stability AI returned invalid JSON: ${responseText.slice(0, 200)}`
    );
  }

  return {
    imageBase64: data.image,
    seed: data.seed || 0,
    finishReason: data.finish_reason || "SUCCESS",
  };
}

export async function removeBackground(
  imageBase64: string
): Promise<{ imageBase64: string }> {
  const apiKey = getApiKey();

  // Convert base64 to a Blob
  const imageBuffer = Buffer.from(imageBase64, "base64");
  const blob = new Blob([imageBuffer], { type: "image/png" });

  const formData = new FormData();
  formData.append("image", blob, "image.png");
  formData.append("output_format", "png");

  const response = await fetch(
    `${STABILITY_API_BASE}/edit/remove-background`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Remove background error (${response.status}): ${JSON.stringify(errorData)}`
    );
  }

  const data = await response.json();
  return { imageBase64: data.image };
}

export async function upscaleImage(
  imageBase64: string,
  type: "conservative" | "fast" = "conservative"
): Promise<{ imageBase64: string }> {
  const apiKey = getApiKey();

  const imageBuffer = Buffer.from(imageBase64, "base64");
  const blob = new Blob([imageBuffer], { type: "image/png" });

  const formData = new FormData();
  formData.append("image", blob, "image.png");
  formData.append("output_format", "png");

  if (type === "conservative") {
    formData.append("prompt", "high resolution, detailed, sharp");
  }

  const response = await fetch(
    `${STABILITY_API_BASE}/upscale/${type}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Upscale error (${response.status}): ${JSON.stringify(errorData)}`
    );
  }

  const data = await response.json();
  return { imageBase64: data.image };
}
