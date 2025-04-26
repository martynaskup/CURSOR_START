### MARTYNA


Create an application for generating images
Input is the user prompt and the output is the image 
The user gives a topic for the image. Optionally he can give the width or the hight for the image (default is 1024 px x 1024 px). It's possible to give the main color which will be used as leitmotif.
 
 The image cannot cointain anything that is specified as worldwidely prohibited.
Write several tests to verify generating an image. Do not use mocks for testing. 

Use nvidia sana-sprint-1.6b to generate the image.

###

Run nvidia/sana-sprint-1.6b using Replicate’s API. 

import Replicate from "replicate";
const replicate = new Replicate();

const input = {};

const output = await replicate.run("nvidia/sana-sprint-1.6b:6ed1ce77cdc8db65550e76d5ab82556d0cb31ac8ab3c4947b168a0bda7b962e4", { input });

import { writeFile } from "node:fs/promises";
await writeFile("output.jpg", output);
//=> output.jpg written to disk

###

Use the Input schema  (it's written in JSON)
{
  "type": "object",
  "title": "Input",
  "properties": {
    "seed": {
      "type": "integer",
      "title": "Seed",
      "default": -1,
      "x-order": 6,
      "description": "Seed value. Set to a value less than 0 to randomize the seed"
    },
    "width": {
      "type": "integer",
      "title": "Width",
      "default": 1024,
      "maximum": 4096,
      "minimum": 256,
      "x-order": 1,
      "description": "Width of output image"
    },
    "height": {
      "type": "integer",
      "title": "Height",
      "default": 1024,
      "maximum": 4096,
      "minimum": 256,
      "x-order": 2,
      "description": "Height of output image"
    },
    "prompt": {
      "type": "string",
      "title": "Prompt",
      "default": "a tiny astronaut hatching from an egg on the moon",
      "x-order": 0,
      "description": "Input prompt"
    },
    "output_format": {
      "enum": [
        "webp",
        "jpg",
        "png"
      ],
      "type": "string",
      "title": "output_format",
      "description": "Format of the output images",
      "default": "jpg",
      "x-order": 7
    },
    "guidance_scale": {
      "type": "number",
      "title": "Guidance Scale",
      "default": 4.5,
      "maximum": 20,
      "minimum": 1,
      "x-order": 5,
      "description": "CFG guidance scale"
    },
    "output_quality": {
      "type": "integer",
      "title": "Output Quality",
      "default": 80,
      "maximum": 100,
      "minimum": 0,
      "x-order": 8,
      "description": "Quality when saving the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. Not relevant for .png outputs"
    },
    "inference_steps": {
      "type": "integer",
      "title": "Inference Steps",
      "default": 2,
      "maximum": 4,
      "minimum": 1,
      "x-order": 3,
      "description": "Number of sampling steps"
    },
    "intermediate_timesteps": {
      "type": "number",
      "title": "Intermediate Timesteps",
      "default": 1.3,
      "maximum": 1.5,
      "minimum": 0.5,
      "x-order": 4,
      "description": "Intermediate timestep value (only used when inference_steps=2, recommended values: 1.0-1.4)"
    }
  }
}


### OUTPUT

This is the output schema (it's written in JSON)

{
  "type": "string",
  "title": "Output",
  "format": "uri"
}

THe App should show the generated image on the page


Absolutely! Here’s the full, clean, and complete prompt for Cursor with the NSFW filtering requirement fully integrated, rewritten to be production-grade and clear for a code generation tool like Cursor to build a full working app from.

⸻

✅ Final Prompt for Cursor — Image Generation App with NSFW Filtering

⸻

MARTYNA

Create a full-stack web application for generating images using the NVIDIA sana-sprint-1.6b model via Replicate’s API.

⸻

🎯 Core Functionality
	•	The app takes user input in the form of a text prompt to describe the image.
	•	Users can optionally specify:
	•	Image width and height (default: 1024x1024, min: 256, max: 4096).
	•	main_color: the dominant or guiding color for the image.
	•	Optional model tuning parameters (from the input schema).
	•	The app generates and displays the resulting image.
	•	The image can be downloaded by the user.
	•	Input is validated and sanitized to prevent globally prohibited content, including NSFW or harmful imagery.

⸻

🛡️ NSFW & Prohibited Content Filtering

The app must block generation of NSFW, illegal, violent, or globally inappropriate content.

✅ Implementation Details:
	1.	Use a keyword-based blocklist to filter the prompt.

// blockedWords.ts
export const blockedWords = [
  "nude", "nudity", "violence", "weapon", "blood", "gore",
  "sex", "porn", "erotic", "drugs", "suicide", "kill", "murder",
  "terror", "genital", "assault", "abuse", "rape", "execution",
];

	2.	Create a validation utility:

// validatePrompt.ts
import { blockedWords } from "./blockedWords";

export function isPromptSafe(prompt: string): boolean {
  const lower = prompt.toLowerCase();
  return !blockedWords.some(word => lower.includes(word));
}

	3.	Enforce safety in the API route:

// routes/generate.ts
import express from "express";
import { isPromptSafe } from "../utils/validatePrompt";
import Replicate from "replicate";

const router = express.Router();
const replicate = new Replicate();

router.post("/", async (req, res) => {
  const { prompt, ...rest } = req.body;

  if (!isPromptSafe(prompt)) {
    return res.status(400).json({
      error: "Your prompt contains prohibited or unsafe content.",
    });
  }

  try {
    const output = await replicate.run(
      "nvidia/sana-sprint-1.6b:6ed1ce77cdc8db65550e76d5ab82556d0cb31ac8ab3c4947b168a0bda7b962e4",
      {
        input: {
          prompt,
          ...rest
        }
      }
    );

    res.json({ image: output });
  } catch (error) {
    res.status(500).json({ error: "Image generation failed." });
  }
});

export default router;



⸻

📥 Input Schema

{
  "type": "object",
  "title": "Input",
  "properties": {
    "seed": {
      "type": "integer",
      "title": "Seed",
      "default": -1,
      "description": "Seed value. Set to a value < 0 to randomize"
    },
    "width": {
      "type": "integer",
      "default": 1024,
      "minimum": 256,
      "maximum": 4096,
      "description": "Image width"
    },
    "height": {
      "type": "integer",
      "default": 1024,
      "minimum": 256,
      "maximum": 4096,
      "description": "Image height"
    },
    "prompt": {
      "type": "string",
      "default": "a tiny astronaut hatching from an egg on the moon",
      "description": "Input prompt for the image"
    },
    "output_format": {
      "type": "string",
      "enum": ["webp", "jpg", "png"],
      "default": "jpg",
      "description": "Image output format"
    },
    "guidance_scale": {
      "type": "number",
      "default": 4.5,
      "minimum": 1,
      "maximum": 20,
      "description": "CFG guidance scale"
    },
    "output_quality": {
      "type": "integer",
      "default": 80,
      "minimum": 0,
      "maximum": 100,
      "description": "Output quality (0–100)"
    },
    "inference_steps": {
      "type": "integer",
      "default": 2,
      "minimum": 1,
      "maximum": 4,
      "description": "Number of inference steps"
    },
    "intermediate_timesteps": {
      "type": "number",
      "default": 1.3,
      "minimum": 0.5,
      "maximum": 1.5,
      "description": "Intermediate timestep (used when inference_steps=2)"
    },
    "main_color": {
      "type": "string",
      "default": "",
      "description": "Optionally guide the image generation using a main color"
    }
  }
}



⸻

📤 Output Schema

{
  "type": "string",
  "title": "Output",
  "format": "uri"
}



⸻

🧪 Tests

Create tests for:
	•	✅ Prompt successfully generates an image
	•	❌ Prompt containing “nude” is blocked with status 400
	•	❌ Prompt containing “murder” is blocked
	•	✅ Prompt like “a happy robot in a meadow” passes
	•	✅ Custom dimensions (e.g. 300x500) generate correctly
	•	✅ Non-default formats (e.g. PNG) work

Do not use mocks for image generation tests — use actual API calls.

⸻

💡 Notes
	•	Backend should be implemented using Node.js + Express.
	•	Frontend can be a simple React interface that:
	•	Contains a form for user input.
	•	Shows errors for blocked prompts.
	•	Displays the final image.
	•	Allows image download.
	•	Use writeFile to store images locally if needed:

import { writeFile } from "node:fs/promises";
await writeFile("output.jpg", output);



