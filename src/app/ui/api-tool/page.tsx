"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { ChatMessage } from "@/app/api/api-tool/route";
import { WeatherCard } from "./weather-card";
import FeatureLayout from "../../components/FeatureLayout";

export default function APIToolPage() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error, stop } = useChat<ChatMessage>({
    transport: new DefaultChatTransport({
      api: "/api/api-tool",
    }),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  const examplePrompts = [
    "What's the weather in New York?",
    "Get weather for London",
    "Check weather conditions in Tokyo",
    "What's the weather like in Paris?",
    "Show me weather for San Francisco"
  ];

  return (
    <FeatureLayout
      title="API Integration"
      description="Connect to external APIs and services through AI. This demonstrates how AI can integrate with third-party APIs to provide real-time data and services."
      icon="🌐"
      category="Integration"
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
              <span className="text-sm text-slate-600 dark:text-slate-400 ml-4">API Integration Assistant</span>
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
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">API Integration Ready</h3>
                <p className="text-slate-600 dark:text-slate-400">I can connect to external APIs to get real-time data like weather information!</p>
              </div>
            )}

            {messages.map((message) => (
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
                              key={`${message.id}-text-${index}`}
                              className="whitespace-pre-wrap text-sm leading-relaxed"
                            >
                              {part.text}
                            </div>
                          );
                        case "tool-call":
                          return (
                            <div
                              key={`${message.id}-tool-call-${index}`}
                              className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mt-2"
                            >
                              <div className="flex items-center space-x-2 mb-2">
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                </svg>
                                <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                                  Calling {part.toolName}...
                                </span>
                              </div>
                              <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                                {JSON.stringify(part.args, null, 2)}
                              </div>
                            </div>
                          );
                        case "tool-result":
                          return (
                            <div
                              key={`${message.id}-tool-result-${index}`}
                              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mt-2"
                            >
                              <div className="flex items-center space-x-2 mb-2">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm text-green-700 dark:text-green-300 font-medium">
                                  {part.toolName} result
                                </span>
                              </div>
                              {part.toolName === "getWeather" && part.result ? (
                                <WeatherCard weather={part.result} />
                              ) : (
                                <div className="text-sm text-green-800 dark:text-green-200">
                                  {typeof part.result === 'string' ? part.result : JSON.stringify(part.result, null, 2)}
                                </div>
                              )}
                            </div>
                          );
                        default:
                          return null;
                      }
                    })}
                  </div>
                </div>
              </div>
            ))}

            {(status === "submitted" || status === "streaming") && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">Calling external API...</span>
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
                placeholder="Ask me to get weather information..."
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Send</span>
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Example Prompts */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">Try these examples</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {examplePrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setInput(prompt)}
                disabled={status === "submitted" || status === "streaming"}
                className="text-left p-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 sm:p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">About this feature</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
            <li>• External API integration and data fetching</li>
            <li>• Real-time weather data from OpenWeatherMap</li>
            <li>• Structured API responses with custom components</li>
            <li>• Error handling for API failures</li>
            <li>• Visual data presentation with WeatherCard component</li>
          </ul>
        </div>
      </div>
    </FeatureLayout>
  );
}