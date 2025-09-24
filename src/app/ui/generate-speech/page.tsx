"use client";

import { useState, useRef, useEffect } from "react";
import FeatureLayout from "../../components/FeatureLayout";

export default function GenerateSpeechPage() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasAudio, setHasAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioUrlRef = useRef<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);

    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }

    try {
      const response = await fetch("/api/generate-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate audio");
      }

      const blob = await response.blob();
      audioUrlRef.current = URL.createObjectURL(blob);
      audioRef.current = new Audio(audioUrlRef.current);

      // Add event listeners
      audioRef.current.onplay = () => setIsPlaying(true);
      audioRef.current.onpause = () => setIsPlaying(false);
      audioRef.current.onended = () => setIsPlaying(false);

      setHasAudio(true);
      audioRef.current.play();
    } catch (error) {
      console.error("Error generating audio:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      setHasAudio(false);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const exampleTexts = [
    "Hello! This is a demonstration of text-to-speech synthesis.",
    "The quick brown fox jumps over the lazy dog.",
    "Welcome to our AI-powered speech generation system.",
    "Technology is advancing at an incredible pace."
  ];

  useEffect(() => {
    return () => {
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  return (
    <FeatureLayout
      title="Speech Synthesis"
      description="Convert text to natural-sounding speech with multiple voices. This demonstrates AI-powered audio generation with real-time playback controls."
      icon="🎤"
      category="Audio"
    >
      <div className="space-y-6">
        {/* Audio Player */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
          <div className="p-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-700 dark:text-red-400 font-medium">Error</span>
                </div>
                <p className="text-red-600 dark:text-red-300 text-sm mt-1">{error}</p>
              </div>
            )}

            {!hasAudio && !isLoading && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No audio generated yet</h3>
                <p className="text-slate-600 dark:text-slate-400">Enter some text below to generate speech</p>
              </div>
            )}

            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Generating audio...</h3>
                <p className="text-slate-600 dark:text-slate-400">Please wait while we convert your text to speech</p>
              </div>
            )}

            {hasAudio && !isLoading && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Audio Generated Successfully!</h3>
                
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={toggleAudio}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors"
                  >
                    {isPlaying ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-6a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Play</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.currentTime = 0;
                        audioRef.current.play();
                      }
                    }}
                    className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-4 py-3 rounded-xl transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Replay</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Enter text to convert to speech</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <textarea
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Type or paste your text here..."
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !text.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-6 py-3 rounded-xl transition-colors flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <span>Generate Speech</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Example Texts */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Try these examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exampleTexts.map((example, index) => (
              <button
                key={index}
                onClick={() => setText(example)}
                disabled={isLoading}
                className="text-left p-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">About this feature</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
            <li>• High-quality text-to-speech synthesis</li>
            <li>• Real-time audio generation and playback</li>
            <li>• Play/pause and replay controls</li>
            <li>• Natural-sounding voice output</li>
            <li>• Support for various text lengths</li>
          </ul>
        </div>
      </div>
    </FeatureLayout>
  );
}
