import { Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { useVoice } from "@/contexts/VoiceContext"

interface VoiceToggleProps {
  isVoiceEnabled?: boolean
  onToggle?: (enabled: boolean) => void
}

export function VoiceToggle({ isVoiceEnabled: propVoiceEnabled, onToggle: propOnToggle }: VoiceToggleProps) {
  const { t } = useLanguage()
  const { isVoiceEnabled: contextVoiceEnabled, setIsVoiceEnabled } = useVoice()
  
  const isVoiceEnabled = propVoiceEnabled !== undefined ? propVoiceEnabled : contextVoiceEnabled
  const onToggle = propOnToggle || setIsVoiceEnabled

  return (
    <Button
      variant={isVoiceEnabled ? "default" : "ghost"}
      size="icon"
      onClick={() => onToggle(!isVoiceEnabled)}
      className="h-11 w-11"
      aria-label={isVoiceEnabled ? t('voice.micOn') : t('voice.micOff')}
      data-testid="button-voice-toggle"
    >
      {isVoiceEnabled ? (
        <Mic className="h-5 w-5" />
      ) : (
        <MicOff className="h-5 w-5" />
      )}
    </Button>
  )
}