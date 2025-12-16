import Anthropic from '@anthropic-ai/sdk';

// Singleton pattern for Anthropic client
let anthropicClient: Anthropic | null = null;

export function getAnthropicClient(): Anthropic {
  if (!anthropicClient) {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY environment variable is not set');
    }

    anthropicClient = new Anthropic({
      apiKey,
    });
  }

  return anthropicClient;
}

// Model configurations
export const MODELS = {
  // Use Sonnet for complex planning tasks
  PLANNING: 'claude-sonnet-4-20250514',
  // Use Haiku for simple queries and quick responses
  QUICK: 'claude-3-5-haiku-20241022',
} as const;

export type ModelType = keyof typeof MODELS;
