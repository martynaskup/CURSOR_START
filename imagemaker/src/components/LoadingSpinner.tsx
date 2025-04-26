export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center mt-8">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      <span className="ml-3 text-gray-700 dark:text-gray-300">Generating your image...</span>
    </div>
  );
} 