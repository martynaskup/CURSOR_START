// Load environment variables from .env.local
import { config } from 'dotenv';

config({ path: '.env.local' });

// Set timeout for tests to 60 seconds (for image generation)
jest.setTimeout(60000); 