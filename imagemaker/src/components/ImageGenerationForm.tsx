import { useState } from 'react';
import type { ImageGenerationForm as FormType } from '@/types';

interface Props {
  onSubmit: (form: FormType) => void;
  isLoading: boolean;
  error: string | null;
}

export function ImageGenerationForm({ onSubmit, isLoading, error }: Props) {
  const [form, setForm] = useState<FormType>({
    prompt: '',
    width: 1024,
    height: 1024,
    mainColor: '',
    outputFormat: 'jpg'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setForm(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value, 10) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.prompt.trim()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Image Generator</h1>
      
      <div className="mb-4">
        <label htmlFor="prompt" className="block text-sm font-medium mb-1">
          Image Description*
        </label>
        <textarea
          id="prompt"
          name="prompt"
          value={form.prompt}
          onChange={(e) => setForm(prev => ({ ...prev, prompt: e.target.value }))}
          placeholder="Describe the image you want to generate..."
          required
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="width" className="block text-sm font-medium mb-1">
            Width (px)
          </label>
          <input
            type="number"
            id="width"
            name="width"
            value={form.width}
            onChange={handleChange}
            min={256}
            max={4096}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="height" className="block text-sm font-medium mb-1">
            Height (px)
          </label>
          <input
            type="number"
            id="height"
            name="height"
            value={form.height}
            onChange={handleChange}
            min={256}
            max={4096}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="mainColor" className="block text-sm font-medium mb-1">
            Main Color (optional)
          </label>
          <input
            type="text"
            id="mainColor"
            name="mainColor"
            value={form.mainColor}
            onChange={handleChange}
            placeholder="e.g. blue, red, #FF5733"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="outputFormat" className="block text-sm font-medium mb-1">
            Output Format
          </label>
          <select
            id="outputFormat"
            name="outputFormat"
            value={form.outputFormat}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="jpg">JPG</option>
            <option value="png">PNG</option>
            <option value="webp">WebP</option>
          </select>
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 rounded-md">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={isLoading || !form.prompt.trim()}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Generating...' : 'Generate Image'}
      </button>
    </form>
  );
} 