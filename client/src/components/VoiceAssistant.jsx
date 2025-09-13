import { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    setIsListening(!isListening);
    console.log(isListening ? 'Stopped listening' : 'Started listening');
  };

  return (
    <button
      onClick={toggleListening}
      className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-50 transition-all duration-200 hover:scale-110 ${
        isListening 
          ? 'bg-red-500 text-white animate-pulse' 
          : 'bg-red-500 hover:bg-red-600 text-white'
      }`}
      data-testid="button-voice-assistant"
      title="Voice Assistant"
    >
      {isListening ? (
        <MicOff className="h-6 w-6" />
      ) : (
        <Mic className="h-6 w-6" />
      )}
    </button>
  );
}