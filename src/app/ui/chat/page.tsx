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
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
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
        <div className="h-96 overflow-y-auto p-4 space-y-4">
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
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Start a conversation</h3>
              <p className="text-slate-600 dark:text-slate-400">Ask me anything! I can help with questions, creative tasks, analysis, and more.</p>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
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

        {/* Input Area */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={status === "submitted" || status === "streaming"}
            />
            {status === "submitted" || status === "streaming" ? (
              <button
                type="button"
                onClick={stop}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition-colors flex items-center space-x-2"
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
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-6 py-3 rounded-xl transition-colors flex items-center space-x-2 disabled:cursor-not-allowed"
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

      {/* Feature Info */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">About this feature</h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
          <li>• Real-time streaming responses for immediate feedback</li>
          <li>• Proper error handling and user feedback</li>
          <li>• Message history and conversation context</li>
          <li>• Responsive design with modern UI patterns</li>
          <li>• Built with Vercel AI SDK's useChat hook</li>
        </ul>
      </div>
    </FeatureLayout>
  );
};

export default ChatPage;
