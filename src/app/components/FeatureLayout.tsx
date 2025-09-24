"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface FeatureLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  icon: string;
  category: string;
}

const features = [
  {
    id: "chat",
    title: "AI Chat",
    description: "Interactive conversation with streaming responses",
    icon: "💬",
    path: "/ui/chat",
    category: "Conversation"
  },
  {
    id: "multi-modal-chat",
    title: "Multi-modal Chat",
    description: "Chat with images, documents, and multimedia content",
    icon: "📎",
    path: "/ui/multi-modal-chat",
    category: "Conversation"
  },
  {
    id: "generate-image",
    title: "Image Generation",
    description: "Create stunning images from text descriptions",
    icon: "🎨",
    path: "/ui/generate-image",
    category: "Visual"
  },
  {
    id: "generate-speech",
    title: "Speech Synthesis",
    description: "Convert text to natural-sounding speech",
    icon: "🎤",
    path: "/ui/generate-speech",
    category: "Audio"
  },
  {
    id: "transcribe-audio",
    title: "Audio Transcription",
    description: "Convert speech to text with high accuracy",
    icon: "🎧",
    path: "/ui/transcribe-audio",
    category: "Audio"
  },
  {
    id: "web-search-tool",
    title: "Web Search",
    description: "Real-time web search with source citations",
    icon: "🔍",
    path: "/ui/web-search-tool",
    category: "Research"
  },
  {
    id: "mcp-tools",
    title: "MCP Tools",
    description: "Model Context Protocol integration",
    icon: "🔧",
    path: "/ui/mcp-tools",
    category: "Integration"
  },
  {
    id: "structured-data",
    title: "Structured Data",
    description: "Generate responses with predefined schemas",
    icon: "📊",
    path: "/ui/structured-data",
    category: "Data"
  },
  {
    id: "tools",
    title: "Function Calling",
    description: "Execute functions and tools within conversations",
    icon: "⚙️",
    path: "/ui/tools",
    category: "Integration"
  },
  {
    id: "multiple-tools",
    title: "Tool Orchestration",
    description: "Coordinate multiple tools and functions",
    icon: "🔗",
    path: "/ui/multiple-tools",
    category: "Integration"
  },
  {
    id: "api-tool",
    title: "API Integration",
    description: "Connect to external APIs and services",
    icon: "🌐",
    path: "/ui/api-tool",
    category: "Integration"
  },
  {
    id: "client-side-tools",
    title: "Client-side Tools",
    description: "Browser-based tools and utilities",
    icon: "🖥️",
    path: "/ui/client-side-tools",
    category: "Browser"
  }
];

const categories = ["All", "Conversation", "Visual", "Audio", "Research", "Integration", "Data", "Browser"];

export default function FeatureLayout({ 
  children, 
  title, 
  description, 
  icon, 
  category 
}: FeatureLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFeatures = selectedCategory === "All" 
    ? features 
    : features.filter(feature => feature.category === selectedCategory);

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Link 
                  href="/"
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Home"
                >
                  <svg className="w-5 h-5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </Link>
                <Link href="/" className="group">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI SDK Showcase</h1>
                </Link>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {filteredFeatures.map((feature) => (
                <Link
                  key={feature.id}
                  href={feature.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors group ${
                    pathname === feature.path
                      ? "bg-slate-100 dark:bg-slate-800"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="text-lg">{feature.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-medium truncate ${
                      pathname === feature.path
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-700 dark:text-slate-300"
                    }`}>
                      {feature.title}
                    </h3>
                  </div>
                  {pathname === feature.path && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
              <a
                href="https://github.com/vercel/ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://sdk.vercel.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                Docs
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link 
                href="/"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center space-x-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Home</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Content */}
        <main className="flex-1 pt-6 px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-slate-500 dark:text-slate-500">
                Built with Vercel AI SDK
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-500">
                {features.length} AI Features Available
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
