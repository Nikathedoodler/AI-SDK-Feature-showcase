"use client";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import FeatureLayout from "../../components/FeatureLayout";

const ChatPage = () => {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, stop } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <FeatureLayout
      title="AI Chat"
      description="Experience interactive conversation with streaming responses and real-time updates. This demonstrates the core chat functionality with proper message handling and user feedback."
      icon="💬"
      category="Conversation"
    >
      {/* Available Features */}
      <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Available Features</h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
          <li>• Real-time streaming responses for immediate feedback</li>
          <li>• Proper error handling and user feedback</li>
          <li>• Message history and conversation context</li>
          <li>• Responsive design with modern UI patterns</li>
          <li>• Built with Vercel AI SDK's useChat hook</li>
        </ul>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 400px)' }}>
        {/* Chat Header */}
        <div className="border-b border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400 ml-4">AI Chat Interface</span>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
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
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white mb-2">Hello there!</h2>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">How can I help you today?</p>
              </div>
              
              {/* Suggested Prompts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl mb-8">
                {[
                  "What are the advantages of using Next.js?",
                  "Write code to demonstrate Dijkstra's algorithm",
                  "Help me write an essay about Silicon Valley",
                  "What is the weather in San Francisco?"
                ].map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(prompt)}
                    disabled={status === "submitted" || status === "streaming"}
                    className="p-4 text-left bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 rounded-xl transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.length > 0 && (
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
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
                        default:
                          return null;
                      }
                    })}
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
                      <span className="text-sm text-slate-600 dark:text-slate-400">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-3 sm:p-4 bg-white dark:bg-slate-800">
          <form onSubmit={handleSubmit} className="flex items-end gap-2 sm:gap-3">
            <div className="flex-1 relative">
              <input
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Send a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={status === "submitted" || status === "streaming"}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <button
                type="submit"
                disabled={status !== "ready" || !input.trim()}
                className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-full transition-colors flex items-center justify-center disabled:cursor-not-allowed"
              >
                {status === "submitted" || status === "streaming" ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6h12v12H6z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </form>
          
          {/* Model Indicator */}
          <div className="flex items-center justify-between mt-2 sm:mt-3 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>GPT-4</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <button className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </FeatureLayout>
  );
};

export default ChatPage;
