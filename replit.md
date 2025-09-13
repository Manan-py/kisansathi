# Agricultural Technology Platform

## Overview

This is a comprehensive agricultural technology platform designed to help farmers with AI-powered farming assistance, disease detection, market price predictions, and plant growth tracking. The application features a modern web interface with multilingual support (English, Hindi, Punjabi) and voice interaction capabilities, specifically tailored for farmers in India with varying literacy levels.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with agricultural-themed color palette (forest green, sage green, earth brown)
- **State Management**: React Context for language and voice settings, TanStack Query for server state
- **Design System**: Mobile-first responsive design with high contrast and large fonts for accessibility

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **API Design**: RESTful endpoints for chat and plant disease detection
- **File Handling**: Multer middleware for image upload processing
- **Development**: Hot module replacement with Vite integration in development mode

### Core Features
- **AI Chat Assistant**: Agricultural advice using Google Gemini AI with multilingual support
- **Disease Detection**: Plant image analysis with treatment recommendations
- **Market Prices**: Commodity price tracking and predictions with trend analysis
- **Plant Tracker**: Growth monitoring and care recommendations
- **News System**: Agricultural news carousel with categorization
- **Weather Integration**: Current conditions and forecasts

### Internationalization
- **Languages**: English, Hindi (हिंदी), Punjabi (ਪੰਜਾਬੀ)
- **Implementation**: JSON-based translation system with React Context
- **Persistence**: Language preferences stored in localStorage
- **Voice Support**: Speech recognition and synthesis in multiple languages

### Voice Capabilities
- **Speech Recognition**: Web Speech API integration for voice input
- **Text-to-Speech**: Native browser TTS for response playback
- **Language Awareness**: Voice features adapt to selected interface language

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM configured
- **Schema**: User management with UUID primary keys
- **Migration**: Drizzle Kit for database schema management
- **Development**: In-memory storage fallback for development

## External Dependencies

- **AI Services**: Google Gemini API for agricultural advice and plant disease analysis
- **Database**: Neon serverless PostgreSQL for production data storage
- **UI Framework**: Radix UI primitives for accessible component foundation
- **Styling**: Tailwind CSS for utility-first styling approach
- **Charts**: Recharts for market price visualization
- **Development**: Replit-specific plugins for development environment integration
- **Build Tools**: ESBuild for production bundling, TypeScript for type safety
- **HTTP Client**: Native Fetch API with TanStack Query for data fetching and caching