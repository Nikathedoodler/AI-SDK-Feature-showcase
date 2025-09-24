"use client";

import Image from "next/image";
import { useState } from "react";
import FeatureLayout from "../../components/FeatureLayout";

export default function GenerateImagePage() {
  const [prompt, setPrompt] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setImageSrc(`data:image/png;base64,${data}`);
    } catch (error) {
      console.error("Error generating image:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const examplePrompts = [
    "A serene mountain landscape at sunset",
    "A futuristic city with flying cars",
    "A cute robot playing with a cat",
    "Abstract art with vibrant colors",
    "A cozy coffee shop in the rain"
  ];

  return (
    <FeatureLayout
      title="Image Generation"
      description="Create stunning images from text descriptions using DALL-E. This demonstrates AI-powered visual content creation with real-time generation and preview."
      icon="🎨"
      category="Visual"
    >
      <div className="space-y-6">
        {/* Image Display */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 400px)' }}>
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-white">Generated Image</h3>
          </div>
          <div className="flex-1 p-4 sm:p-6">
            <div className="relative w-full h-full bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden">
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400">Generating your image...</p>
                  </div>
                </div>
              ) : imageSrc ? (
                <Image
                  alt="Generated Image"
                  className="w-full h-full object-cover"
                  src={imageSrc}
                  width={1024}
                  height={1024}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center">
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white mb-2">Hello there!</h2>
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">Describe an image and I'll create it for you!</p>
                  </div>
                  
                  {/* Suggested Prompts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl mb-8">
                    {examplePrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => setPrompt(prompt)}
                        disabled={isLoading}
                        className="p-4 sm:p-6 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 transition-colors text-left text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700 dark:text-red-400 font-medium">Error</span>
            </div>
            <p className="text-red-600 dark:text-red-300 text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Input Form */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg p-4 sm:p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">Describe your image</h3>
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <textarea
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe the image you want to generate..."
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-colors flex items-center justify-center space-x-1 sm:space-x-2 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Generate Image</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </FeatureLayout>
  );
}
