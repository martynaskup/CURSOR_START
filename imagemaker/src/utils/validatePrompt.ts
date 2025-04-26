import { blockedWords } from "./blockedWords";

export function isPromptSafe(prompt: string): boolean {
  const lower = prompt.toLowerCase();
  return !blockedWords.some(word => lower.includes(word));
} 