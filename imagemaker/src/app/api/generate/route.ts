import { NextRequest, NextResponse } from 'next/server';
import { isPromptSafe } from '@/utils/validatePrompt';
import Replicate from 'replicate';

export async function POST(request: NextRequest) {
  try {
    const { prompt, width = 1024, height = 1024, mainColor, seed = -1,
            outputFormat = 'jpg', guidanceScale = 4.5, outputQuality = 80,
            inferenceSteps = 2, intermediateTimesteps = 1.3 } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    if (!isPromptSafe(prompt)) {
      return NextResponse.json({ 
        error: 'Your prompt contains prohibited or unsafe content.' 
      }, { status: 400 });
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN || '',
    });

    // Update prompt to include main color if provided
    const finalPrompt = mainColor 
      ? `${prompt}, main color: ${mainColor}` 
      : prompt;

    const output = await replicate.run(
      "nvidia/sana-sprint-1.6b:6ed1ce77cdc8db65550e76d5ab82556d0cb31ac8ab3c4947b168a0bda7b962e4",
      {
        input: {
          prompt: finalPrompt,
          width,
          height,
          seed,
          output_format: outputFormat,
          guidance_scale: guidanceScale,
          output_quality: outputQuality,
          inference_steps: inferenceSteps,
          intermediate_timesteps: intermediateTimesteps
        }
      }
    );

    return NextResponse.json({ image: output });
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
} 