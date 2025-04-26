/**
 * Image Generation Tests
 *
 * Note: These tests require a valid REPLICATE_API_TOKEN in the environment
 * They make actual API calls and should be used sparingly
 */

import { isPromptSafe } from '@/utils/validatePrompt';
import Replicate from 'replicate';

// Set timeout to 60 seconds for image generation
jest.setTimeout(60000);

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || '',
});

describe('Safety Filter Tests', () => {
  test('Prompt containing "nude" is blocked', () => {
    expect(isPromptSafe('A nude person standing')).toBe(false);
  });

  test('Prompt containing "murder" is blocked', () => {
    expect(isPromptSafe('A murder scene in a dark alley')).toBe(false);
  });

  test('Safe prompt passes the filter', () => {
    expect(isPromptSafe('A happy robot in a meadow')).toBe(true);
  });
});

// Only run these tests with a valid API token and when explicitly enabled
// These make actual API calls and cost credits
const runLiveTests = process.env.RUN_LIVE_TESTS === 'true';

(runLiveTests ? describe : describe.skip)('Live API Tests', () => {
  test('Successfully generates an image with default dimensions', async () => {
    const output = await replicate.run(
      "nvidia/sana-sprint-1.6b:6ed1ce77cdc8db65550e76d5ab82556d0cb31ac8ab3c4947b168a0bda7b962e4",
      {
        input: {
          prompt: 'a beautiful landscape with mountains and a lake',
          width: 512, // Using smaller dimensions for faster tests
          height: 512,
          inference_steps: 2,
        }
      }
    );
    
    expect(output).toBeTruthy();
    expect(typeof output).toBe('string');
  });

  test('Successfully generates an image with custom dimensions', async () => {
    const output = await replicate.run(
      "nvidia/sana-sprint-1.6b:6ed1ce77cdc8db65550e76d5ab82556d0cb31ac8ab3c4947b168a0bda7b962e4",
      {
        input: {
          prompt: 'a futuristic city with flying cars',
          width: 300,
          height: 500,
          inference_steps: 2,
        }
      }
    );
    
    expect(output).toBeTruthy();
    expect(typeof output).toBe('string');
  });

  test('Successfully generates an image with PNG format', async () => {
    const output = await replicate.run(
      "nvidia/sana-sprint-1.6b:6ed1ce77cdc8db65550e76d5ab82556d0cb31ac8ab3c4947b168a0bda7b962e4",
      {
        input: {
          prompt: 'a cartoon character with a funny hat',
          width: 512,
          height: 512,
          output_format: 'png',
          inference_steps: 2,
        }
      }
    );
    
    expect(output).toBeTruthy();
    expect(typeof output).toBe('string');
    expect(output.endsWith('.png')).toBe(true);
  });
}); 