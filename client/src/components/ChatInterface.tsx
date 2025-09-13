import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Mic, MicOff, Volume2, VolumeX } from "lucide-react"
import { useVoice } from "@/contexts/VoiceContext"
import { useLanguage } from "@/contexts/LanguageContext"

// Web Speech API type declarations
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
  
  class SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onerror: ((this: SpeechRecognition, ev: Event) => any) | null;
    onend: ((this: SpeechRecognition, ev: Event) => any) | null;
    start(): void;
    stop(): void;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export function ChatInterface() {
  const { isVoiceEnabled } = useVoice()
  const { language } = useLanguage()
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI agricultural assistant. How can I help you today? You can ask me about crop diseases, weather patterns, irrigation schedules, or any farming-related questions.",
      sender: "ai",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for speech recognition support
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        setSpeechSupported(true)
        recognitionRef.current = new SpeechRecognition()
        
        if (recognitionRef.current) {
          recognitionRef.current.continuous = false
          recognitionRef.current.interimResults = true
          
          // Set language based on current language
          const langMap: Record<string, string> = {
            'en': 'en-US',
            'hi': 'hi-IN', 
            'pa': 'pa-IN'
          }
          recognitionRef.current.lang = 'en-US'
        }
      }
      
      // Initialize speech synthesis
      if (window.speechSynthesis) {
        synthRef.current = window.speechSynthesis
        
        // Load available voices
        const loadVoices = () => {
          const voices = synthRef.current?.getVoices() || []
          setAvailableVoices(voices)
        }
        
        loadVoices()
        synthRef.current.addEventListener('voiceschanged', loadVoices)
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (synthRef.current) {
        synthRef.current.removeEventListener('voiceschanged', () => {})
        synthRef.current.cancel()
      }
    }
  }, [])

  const handleSendMessage = async (messageText?: string) => {
    const messageToSend = messageText || input.trim()
    if (!messageToSend) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      sender: "user", 
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: messageToSend,
          language: language 
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "ai",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
      
      // Speak the AI response if voice is enabled
      if (isVoiceEnabled && synthRef.current && data.response) {
        speakText(data.response)
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting to the agricultural assistant right now. Please try again in a moment.",
        sender: "ai",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const findBestVoice = (targetLang: string): SpeechSynthesisVoice | null => {
    if (availableVoices.length === 0) return null
    
    // First try exact match
    let voice = availableVoices.find(v => v.lang === targetLang)
    if (voice) return voice
    
    // Try language prefix match (e.g., 'hi' for 'hi-IN')
    const langPrefix = targetLang.split('-')[0]
    voice = availableVoices.find(v => v.lang.startsWith(langPrefix))
    if (voice) return voice
    
    // Fallback to default voice
    return availableVoices.find(v => v.default) || availableVoices[0] || null
  }

  const speakText = (text: string) => {
    if (!synthRef.current) return
    
    // Cancel any ongoing speech
    stopSpeaking()
    
    const utterance = new SpeechSynthesisUtterance(text)
    
    // Set language-specific voice
    const langMap: Record<string, string> = {
      'en': 'en-US',
      'hi': 'hi-IN',
      'pa': 'pa-IN'
    }
    const targetLang = 'en-US'
    const voice = findBestVoice(targetLang)
    
    if (voice) {
      utterance.voice = voice
    } else {
      utterance.lang = targetLang
    }
    
    utterance.rate = 0.9
    utterance.pitch = 1
    
    utterance.onstart = () => {
      setIsSpeaking(true)
      setIsPaused(false)
    }
    
    utterance.onend = () => {
      setIsSpeaking(false)
      setIsPaused(false)
      currentUtteranceRef.current = null
    }
    
    utterance.onerror = () => {
      setIsSpeaking(false)
      setIsPaused(false)
      currentUtteranceRef.current = null
    }
    
    currentUtteranceRef.current = utterance
    synthRef.current.speak(utterance)
  }

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
      setIsPaused(false)
      currentUtteranceRef.current = null
    }
  }

  const pauseResumeSpeaking = () => {
    if (!synthRef.current || !isSpeaking) return
    
    if (isPaused) {
      synthRef.current.resume()
      setIsPaused(false)
    } else {
      synthRef.current.pause()
      setIsPaused(true)
    }
  }

  const startListening = () => {
    if (!recognitionRef.current || !speechSupported) return
    
    setIsListening(true)
    
    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
      
      // If final result, send the message
      if (event.results[0].isFinal) {
        setIsListening(false)
        handleSendMessage(transcript)
      }
    }
    
    recognitionRef.current.onerror = () => {
      setIsListening(false)
    }
    
    recognitionRef.current.onend = () => {
      setIsListening(false)
    }
    
    recognitionRef.current.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
  }

  return (
    <Card className="h-[600px] flex flex-col" data-testid="card-chat">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AgriBot Assistant
          </div>
          {isVoiceEnabled && synthRef.current && isSpeaking && (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={pauseResumeSpeaking}
                className="h-11 w-11"
                aria-label={isPaused ? "Resume Speaking" : "Pause Speaking"}
                data-testid="button-pause-resume-speaking"
              >
                {isPaused ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={stopSpeaking}
                className="h-11 w-11"
                aria-label="Stop Speaking"
                data-testid="button-stop-speaking"
              >
                <VolumeX className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-full gap-4">
        <ScrollArea className="flex-1 pr-4" data-testid="chat-messages">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                data-testid={`message-${message.sender}-${message.id}`}
              >
                {message.sender === "ai" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-md ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm" data-testid={`message-content-${message.id}`}>
                    {message.content}
                  </p>
                </div>
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-secondary">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start" data-testid="loading-message">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-sm">Thinking...</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="flex gap-2">
          <Input
            placeholder="Ask me about farming, crops, diseases..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={isLoading || isListening}
            className={isListening ? "border-primary bg-primary/5" : ""}
            data-testid="input-chat"
          />
          
          {isVoiceEnabled && speechSupported && (
            <Button
              variant={isListening ? "default" : "ghost"}
              size="icon"
              onClick={isListening ? stopListening : startListening}
              disabled={isLoading}
              className={`h-11 w-11 ${isListening ? "bg-red-500 hover:bg-red-600 text-white" : ""}`}
              aria-label={isListening ? "Stop Listening" : "Start Listening"}
              data-testid="button-voice-input"
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          )}
          
          <Button 
            onClick={() => handleSendMessage()}
            disabled={isLoading || !input.trim() || isListening}
            className="h-11 w-11"
            size="icon"
            aria-label="Send message"
            data-testid="button-send-message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}