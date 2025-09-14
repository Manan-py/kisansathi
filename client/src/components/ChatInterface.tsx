import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Mic, MicOff, Play, Pause, Square } from "lucide-react"


interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export function ChatInterface() {
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
  const [isRecording, setIsRecording] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(true)
  const recognitionRef = useRef<any>(null)
  const partialRef = useRef<string>("")
  const [ttsSupported, setTtsSupported] = useState(true)
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null)
  const [isSpeechPaused, setIsSpeechPaused] = useState(false)
  const ttsUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null)


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
          message: messageToSend
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

  // Initialize Web Speech API recognition
  useEffect(() => {
    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (!SpeechRecognition) {
        setSpeechSupported(false)
        return
      }

      const recognition = new SpeechRecognition()
      recognition.lang = 'en-IN'
      recognition.interimResults = true
      recognition.continuous = false

      recognition.onstart = () => {
        setIsRecording(true)
        partialRef.current = ""
      }

      recognition.onresult = (event: any) => {
        let interimTranscript = ""
        let finalTranscript = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        if (interimTranscript) {
          partialRef.current = interimTranscript
          setInput((prev) => (finalTranscript ? finalTranscript : interimTranscript))
        }

        if (finalTranscript) {
          partialRef.current = ""
          setInput(finalTranscript)
          // Auto-send on final transcript
          handleSendMessage(finalTranscript)
        }
      }

      recognition.onerror = () => {
        setIsRecording(false)
      }

      recognition.onend = () => {
        setIsRecording(false)
      }

      recognitionRef.current = recognition
    } catch {
      setSpeechSupported(false)
    }
  }, [])

  const startRecording = () => {
    if (!recognitionRef.current || isLoading) return
    try {
      recognitionRef.current.start()
    } catch {
      // ignore double start errors
    }
  }

  const stopRecording = () => {
    if (!recognitionRef.current) return
    try {
      recognitionRef.current.stop()
    } catch {
      // ignore stop errors
    }
  }

  const toggleRecording = () => {
    if (!speechSupported) return
    if (isRecording) stopRecording()
    else startRecording()
  }

  // Initialize TTS support
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('speechSynthesis' in window) || typeof (window as any).SpeechSynthesisUtterance === 'undefined') {
      setTtsSupported(false)
    }
  }, [])

  const speakMessage = (message: Message) => {
    if (!ttsSupported) return
    try {
      // Stop anything currently speaking
      window.speechSynthesis.cancel()

      const utterance = new (window as any).SpeechSynthesisUtterance(message.content)
      utterance.lang = 'en-IN'
      utterance.rate = 1
      utterance.onend = () => {
        setSpeakingMessageId(null)
        setIsSpeechPaused(false)
        ttsUtteranceRef.current = null
      }
      ttsUtteranceRef.current = utterance
      setSpeakingMessageId(message.id)
      setIsSpeechPaused(false)
      window.speechSynthesis.speak(utterance)
    } catch {
      // ignore
    }
  }

  const togglePlayPauseForMessage = (message: Message) => {
    if (!ttsSupported) return
    const synth = window.speechSynthesis
    if (speakingMessageId === message.id) {
      if (synth.speaking && !synth.paused) {
        synth.pause()
        setIsSpeechPaused(true)
      } else if (synth.paused) {
        synth.resume()
        setIsSpeechPaused(false)
      } else {
        // finished already, start from beginning
        speakMessage(message)
      }
    } else {
      synth.cancel()
      speakMessage(message)
    }
  }

  const endSpeech = () => {
    if (!ttsSupported) return
    const synth = window.speechSynthesis
    synth.cancel()
    setSpeakingMessageId(null)
    setIsSpeechPaused(false)
  }


  return (
    <Card className="h-[600px] flex flex-col" data-testid="card-chat">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AgriBot Assistant
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
                  {message.sender === 'ai' && ttsSupported && (
                    <div className="mt-2 flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 ${speakingMessageId === message.id ? 'text-primary' : ''}`}
                        onClick={() => togglePlayPauseForMessage(message)}
                        aria-label={speakingMessageId === message.id ? (isSpeechPaused ? 'Resume voice' : 'Pause voice') : 'Play voice'}
                        title={speakingMessageId === message.id ? (isSpeechPaused ? 'Resume' : 'Pause') : 'Play'}
                      >
                        {speakingMessageId === message.id && !isSpeechPaused ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        className="p-0 h-auto w-auto m-0 bg-transparent hover:bg-transparent active:bg-transparent border-0 text-red-600 hover:text-red-700"
                        onClick={endSpeech}
                        aria-label="End voice"
                        title="End"
                      >
                        <Square className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
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
            disabled={isLoading}
            data-testid="input-chat"
          />
          <Button
            onClick={toggleRecording}
            disabled={isLoading || !speechSupported}
            className={`h-11 w-11 ${isRecording ? 'bg-red-100 text-red-600 hover:bg-red-200' : ''}`}
            size="icon"
            aria-label={isRecording ? "Stop voice input" : "Start voice input"}
            title={speechSupported ? (isRecording ? 'Stop voice input' : 'Start voice input') : 'Speech recognition not supported'}
            data-testid="button-mic-toggle"
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          
          <Button 
            onClick={() => handleSendMessage()}
            disabled={isLoading || !input.trim()}
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