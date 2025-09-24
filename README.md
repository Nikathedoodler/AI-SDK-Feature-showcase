# AI SDK Feature Showcase

A comprehensive demonstration of the Vercel AI SDK capabilities, showcasing modern AI development practices with a beautiful, professional interface.

## 🚀 Features

This showcase includes **14 different AI capabilities** organized by category:

### 💬 Conversation
- **AI Chat** - Interactive conversation with streaming responses
- **Multi-modal Chat** - Chat with images, documents, and multimedia content

### ✍️ Text Generation
- **Text Completion** - Generate and complete text with advanced language models

### 🎨 Visual
- **Image Generation** - Create stunning images from text descriptions using DALL-E

### 🎤 Audio
- **Speech Synthesis** - Convert text to natural-sounding speech
- **Audio Transcription** - Convert speech to text with high accuracy

### 🔍 Research
- **Web Search** - Real-time web search with source citations and context

### ⚙️ Integration
- **MCP Tools** - Model Context Protocol integration for weather, stocks, and more
- **Function Calling** - Execute functions and tools within AI conversations
- **Tool Orchestration** - Coordinate multiple tools and functions in complex workflows
- **API Integration** - Connect to external APIs and services through AI

### 📊 Data
- **Structured Data** - Generate responses with predefined schemas and validation

### 🌊 Real-time
- **Streaming** - Real-time streaming responses for dynamic user experiences

### 🖥️ Browser
- **Client-side Tools** - Browser-based tools and utilities for enhanced functionality

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4 with modern design patterns
- **AI**: Vercel AI SDK v5
- **Fonts**: Geist Sans & Geist Mono
- **Deployment**: Optimized for Vercel

## 🎨 Design Features

- **Modern UI/UX** - Professional design with dark/light mode support
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Feature Discovery** - Categorized feature grid with filtering
- **Interactive Examples** - Each feature includes example prompts and use cases
- **Real-time Feedback** - Visual indicators for loading states and progress
- **Error Handling** - Comprehensive error states with user-friendly messages
- **Source Citations** - Transparent source attribution for web search results

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AI-SDK-Feature-showcase
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your API keys:
   - `OPENAI_API_KEY` - For chat, image generation, and speech synthesis
   - `SERPER_API_KEY` - For web search functionality

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                 # API routes for each feature
│   ├── components/          # Shared components
│   ├── ui/                  # Feature-specific pages
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── public/                  # Static assets
└── ...
```

## 🎯 Key Features Demonstrated

### Modern React Patterns
- Server and Client Components
- Custom hooks for AI functionality
- Proper error boundaries and loading states
- TypeScript for type safety

### AI SDK Best Practices
- Streaming responses for real-time UX
- Tool calling and function execution
- Multi-modal content handling
- Proper error handling and retry logic

### Professional UI/UX
- Consistent design system
- Accessible components
- Responsive design patterns
- Modern animations and transitions

## 🔧 Customization

Each feature is modular and can be easily customized:

1. **Styling**: Modify Tailwind classes in components
2. **API Integration**: Update API routes in `/app/api/`
3. **Features**: Add new features by creating new pages in `/app/ui/`
4. **Layout**: Customize the shared `FeatureLayout` component

## 📚 Learning Resources

- [Vercel AI SDK Documentation](https://sdk.vercel.ai)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)

## 🤝 Contributing

This project serves as a demonstration of AI SDK capabilities. Feel free to:

- Add new features and examples
- Improve the UI/UX design
- Enhance error handling
- Add more comprehensive documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using the Vercel AI SDK. Showcasing modern AI development practices and capabilities.
