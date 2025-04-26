import React from 'react';

interface Props {
  imageUrl: string | null;
}

export function ImageDisplay({ imageUrl }: Props) {
  if (!imageUrl) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `generated-image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-8 w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={imageUrl} 
          alt="Generated image" 
          className="w-full h-auto rounded-md"
        />
      </div>
      
      <div className="flex justify-center mt-4">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Download Image
        </button>
      </div>
    </div>
  );
} 