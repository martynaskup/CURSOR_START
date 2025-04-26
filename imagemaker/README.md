# Image Maker

An AI-powered image generation application using NVIDIA's sana-sprint-1.6b model via Replicate's API.

## Features

- Generate images from text prompts
- Customize image dimensions (width and height)
- Specify a main color for your generated image
- Select output format (JPG, PNG, WebP)
- Content safety filtering to prevent prohibited content
- Download generated images

## Getting Started

### Prerequisites

- Node.js (latest version recommended)
- Replicate API token (get one at https://replicate.com/account)

### Installation

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory with your Replicate API token:
   ```
   REPLICATE_API_TOKEN=your_replicate_api_token_here
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
```

## Usage

1. Enter a description of the image you want to generate
2. Optionally customize:
   - Width and height (256px to 4096px)
   - Main color
   - Output format
3. Click "Generate Image"
4. Wait for the image to be generated
5. Download the image if desired

## Safety Measures

This application includes content filtering to prevent the generation of:
- NSFW content
- Violent imagery
- Illegal content
- Other prohibited material

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Replicate API (NVIDIA's sana-sprint-1.6b model)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
