# Environment Setup

This project uses environment variables for configuration. Follow these steps to set up your environment:

## 1. Copy Environment Template

```bash
cp .env.example .env
```

## 2. Configure Your API Keys

Edit the `.env` file and add your API keys:

```env
# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Development Environment
NODE_ENV=development
```

## 3. Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and paste it in your `.env` file

## 4. Start the Development Server

```bash
npm run dev
```

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already added to `.gitignore`
- Use `.env.example` as a template for other developers

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key for AI chat functionality | Yes |
| `NODE_ENV` | Environment mode (development/production) | No (defaults to development) |
