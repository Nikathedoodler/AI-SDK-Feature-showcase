"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface FeatureLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  icon: string;
  category: string;
}

export default function FeatureLayout({ 
  children, 
  title, 
  description, 
  icon, 
  category 
}: FeatureLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">AI SDK Showcase</h1>
                <p className="text-xs text-slate-600 dark:text-slate-400">Back to features</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/vercel/ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm"
              >
                GitHub
              </a>
              <a
                href="https://sdk.vercel.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm"
              >
                Docs
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Feature Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <div className="text-4xl">{icon}</div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{title}</h2>
              <span className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                {category}
              </span>
            </div>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      {/* Feature Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <Link 
              href="/"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to all features</span>
            </Link>
            <div className="text-sm text-slate-500 dark:text-slate-500">
              Built with Vercel AI SDK
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
