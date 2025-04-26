"use client";

import { useState } from 'react';
import type { ImageGenerationForm } from '@/types';
import { ImageGenerationForm as Form } from '@/components/ImageGenerationForm';
import { ImageDisplay } from '@/components/ImageDisplay';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (form: ImageGenerationForm) => {
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: form.prompt,
          width: form.width,
          height: form.height,
          mainColor: form.mainColor,
          outputFormat: form.outputFormat,
          // Add other optional parameters if needed
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setImageUrl(data.image);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Image Maker</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Generate amazing images with AI
          </p>
        </header>

        <Form 
          onSubmit={handleSubmit} 
          isLoading={loading} 
          error={error} 
        />

        {loading && <LoadingSpinner />}
        
        {imageUrl && !loading && (
          <ImageDisplay imageUrl={imageUrl} />
        )}
      </div>
    </div>
  );
}
