"use client";

import React from "react";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { ChatMessage } from "@/app/api/web-search-tool/route";
import FeatureLayout from "../../components/FeatureLayout";

export default function WebSearchToolPage() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error, stop } = useChat<ChatMessage>({
    transport: new DefaultChatTransport({
      api: "/api/web-search-tool",
    }),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  const exampleQueries = [
    "What are the latest developments in AI?",
    "Current weather in New York",
    "Best restaurants in San Francisco",
    "Latest news about space exploration",
    "How to learn React in 2024"
  ];

  return (
    <FeatureLayout
      title="Web Search"
      description="Search the web in real-time with AI-powered results and source citations. This demonstrates how AI can access current information and provide accurate, cited responses."
      icon="🔍"
      category="Research"
    >
      <div className="space-y-6">
        {/* Chat Interface */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden h-[600px] sm:h-[700px] lg:h-[800px] flex flex-col">
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400 ml-4">Web Search Assistant</span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-700 dark:text-red-400 font-medium">Error</span>
                </div>
                <p className="text-red-600 dark:text-red-300 text-sm mt-1">{error.message}</p>
              </div>
            )}

            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Search the web with AI</h3>
                <p className="text-slate-600 dark:text-slate-400">Ask me anything and I'll search the web for current information with proper citations.</p>
              </div>
            )}

            {messages.map((message) => {
              const sources = message.parts.filter(
                (part) => part.type === "source-url"
              );

              return (
                <div key={message.id} className="space-y-3">
                  <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                      message.role === "user" 
                        ? "bg-blue-600 text-white" 
                        : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white"
                    }`}>
                      <div className="text-sm font-medium mb-1">
                        {message.role === "user" ? "You" : "AI"}
                      </div>
                      {message.parts.map((part, index) => {
                        switch (part.type) {
                          case "text":
                            return (
                              <div
                                key={`${message.id}-${index}`}
                                className="whitespace-pre-wrap text-sm leading-relaxed"
                              >
                                {part.text}
                              </div>
                            );
                          case "tool-web_search":
                            switch (part.state) {
                              case "input-streaming":
                                return (
                                  <div
                                    key={`${message.id}-web_search-${index}`}
                                    className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mt-2"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                      <span className="text-sm text-blue-700 dark:text-blue-300">
                                        Preparing search query...
                                      </span>
                                    </div>
                                  </div>
                                );
                              case "input-available":
                                return (
                                  <div
                                    key={`${message.id}-web_search-${index}`}
                                    className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mt-2"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                      <span className="text-sm text-blue-700 dark:text-blue-300">
                                        Searching the web...
                                      </span>
                                    </div>
                                  </div>
                                );
                              case "output-available":
                                return (
                                  <div
                                    key={`${message.id}-web_search-${index}`}
                                    className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mt-2"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>
                                      <span className="text-sm text-green-700 dark:text-green-300">
                                        Search completed
                                      </span>
                                    </div>
                                  </div>
                                );
                              case "output-error":
                                return (
                                  <div
                                    key={`${message.id}-web_search-${index}`}
                                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mt-2"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                      <span className="text-sm text-red-700 dark:text-red-300">
                                        Search failed: {part.errorText}
                                      </span>
                                    </div>
                                  </div>
                                );
                              default:
                                return null;
                            }
                          default:
                            return null;
                        }
                      })}
                    </div>
                  </div>

                  {/* Sources */}
                  {message.role === "assistant" && sources.length > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <span className="text-blue-700 dark:text-blue-300 text-sm font-medium">
                          Sources ({sources.length})
                        </span>
                      </div>
                      <div className="space-y-2">
                        {sources.map((part, i) => {
                          if (part.type === "source-url") {
                            return (
                              <a
                                key={`${message.id}-${i}`}
                                href={part.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-2 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                              >
                                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium truncate">
                                  {part.title || part.url}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                  {part.url}
                                </div>
                              </a>
                            );
                          }
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {(status === "submitted" || status === "streaming") && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">Searching and analyzing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-200 dark:border-slate-700 p-3 sm:p-4 bg-slate-50 dark:bg-slate-900">
            <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
              <input
                className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ask me anything to search the web..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={status === "submitted" || status === "streaming"}
              />
              {status === "submitted" || status === "streaming" ? (
                <button
                  type="button"
                  onClick={stop}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-colors flex items-center space-x-1 sm:space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6h12v12H6z" />
                  </svg>
                  <span>Stop</span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={status !== "ready" || !input.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-colors flex items-center space-x-1 sm:space-x-2 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search</span>
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Example Queries */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Try these examples</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exampleQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => setInput(query)}
                disabled={status === "submitted" || status === "streaming"}
                className="text-left p-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {query}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">About this feature</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
            <li>• Real-time web search with current information</li>
            <li>• Source citations for transparency and verification</li>
            <li>• AI-powered result analysis and summarization</li>
            <li>• Visual search status indicators</li>
            <li>• Error handling for failed searches</li>
          </ul>
        </div>
      </div>
    </FeatureLayout>
  );
}