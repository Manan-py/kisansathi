import { useState } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

export function WhatsAppChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "नमस्ते! मैं आपका कृषि सहायक हूं। आप मुझसे फसल, बीमारी, मौसम और खेती से जुड़े किसी भी सवाल पूछ सकते हैं।",
      sender: 'ai',
      time: '10:30 AM'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: 'user', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: `आपके सवाल "${input}" के बारे में मैं आपकी मदद कर सकता हूं। कृषि विशेषज्ञों से सलाह लेना हमेशा अच्छा होता है।`,
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="h-[600px] bg-gray-100 dark:bg-gray-900 rounded-xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-green-500 text-white p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-500 font-bold text-lg">
          🤖
        </div>
        <div>
          <h3 className="font-semibold text-lg">कृषि सहायक</h3>
          <p className="text-green-100 text-sm">ऑनलाइन</p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 bg-gray-50 dark:bg-gray-800" data-testid="chat-messages">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-green-500 text-white rounded-br-none shadow-md'
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-md border'
                }`}
                data-testid={`message-${message.sender}-${message.id}`}
              >
                <p className="text-lg leading-relaxed font-medium">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                }`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-700 rounded-lg rounded-bl-none px-4 py-3 shadow-md border max-w-[80%]">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="अपना संदेश लिखें..."
            className="flex-1 text-lg border-gray-300 rounded-full px-4"
            data-testid="input-chat"
          />
          {input.trim() ? (
            <Button 
              onClick={sendMessage}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12"
              data-testid="button-send"
            >
              <Send className="h-5 w-5" />
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-green-500 rounded-full w-12 h-12"
            >
              <Mic className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}