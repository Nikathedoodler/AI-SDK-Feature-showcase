"use client";

import Link from "next/link";
import { useState } from "react";

const features = [
  {
    id: "chat",
    title: "AI Chat",
    description: "Interactive conversation with streaming responses and real-time updates",
    icon: "💬",
    path: "/ui/chat",
    category: "Conversation"
  },
  {
    id: "multi-modal-chat",
    title: "Multi-modal Chat",
    description: "Chat with images, documents, and multimedia content with streaming responses",
    icon: "📎",
    path: "/ui/multi-modal-chat",
    category: "Conversation"
  },
  {
    id: "generate-image",
    title: "Image Generation",
    description: "Create stunning images from text descriptions using DALL-E",
    icon: "🎨",
    path: "/ui/generate-image",
    category: "Visual"
  },
  {
    id: "generate-speech",
    title: "Speech Synthesis",
    description: "Convert text to natural-sounding speech with multiple voices",
    icon: "🎤",
    path: "/ui/generate-speech",
    category: "Audio"
  },
  {
    id: "transcribe-audio",
    title: "Audio Transcription",
    description: "Convert speech to text with high accuracy and language detection",
    icon: "🎧",
    path: "/ui/transcribe-audio",
    category: "Audio"
  },
  {
    id: "web-search-tool",
    title: "Web Search",
    description: "Real-time web search with source citations and context",
    icon: "🔍",
    path: "/ui/web-search-tool",
    category: "Research"
  },
  {
    id: "mcp-tools",
    title: "MCP Tools",
    description: "Model Context Protocol integration for weather, stocks, and more",
    icon: "🔧",
    path: "/ui/mcp-tools",
    category: "Integration"
  },
  {
    id: "structured-data",
    title: "Structured Data",
    description: "Generate responses with predefined schemas and validation",
    icon: "📊",
    path: "/ui/structured-data",
    category: "Data"
  },
  {
    id: "tools",
    title: "Function Calling",
    description: "Execute functions and tools within AI conversations",
    icon: "⚙️",
    path: "/ui/tools",
    category: "Integration"
  },
  {
    id: "multiple-tools",
    title: "Tool Orchestration",
    description: "Coordinate multiple tools and functions in complex workflows",
    icon: "🔗",
    path: "/ui/multiple-tools",
    category: "Integration"
  },
  {
    id: "api-tool",
    title: "API Integration",
    description: "Connect to external APIs and services through AI",
    icon: "🌐",
    path: "/ui/api-tool",
    category: "Integration"
  },
  {
    id: "client-side-tools",
    title: "Client-side Tools",
    description: "Browser-based tools and utilities for enhanced functionality",
    icon: "🖥️",
    path: "/ui/client-side-tools",
    category: "Browser"
  }
];

const categories = ["All", "Conversation", "Visual", "Audio", "Research", "Integration", "Data", "Browser"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFeatures = selectedCategory === "All" 
    ? features 
    : features.filter(feature => feature.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI SDK Showcase</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">Comprehensive AI capabilities demonstration</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/vercel/ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://sdk.vercel.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Documentation
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Explore the Power of{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI SDK
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Discover cutting-edge AI capabilities including chat, image generation, speech synthesis, 
            web search, and more. Each feature demonstrates real-world applications and best practices.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 dark:text-slate-500">
            <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
              Next.js 15
            </span>
            <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
              React 19
            </span>
            <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
              TypeScript
            </span>
            <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
              Tailwind CSS
            </span>
            <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
              AI SDK v5
            </span>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFeatures.map((feature) => (
              <Link
                key={feature.id}
                href={feature.path}
                className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-2xl">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">
                      {feature.category}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Try it out
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-600 dark:text-slate-400">
            <p>Built with ❤️ using the Vercel AI SDK</p>
            <p className="text-sm mt-2">
              Showcasing modern AI development practices and capabilities
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
