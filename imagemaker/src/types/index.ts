export interface ImageGenerationForm {
  prompt: string;
  width: number;
  height: number;
  mainColor?: string;
  seed?: number;
  outputFormat?: 'webp' | 'jpg' | 'png';
  guidanceScale?: number;
  outputQuality?: number;
  inferenceSteps?: number;
  intermediateTimesteps?: number;
} 