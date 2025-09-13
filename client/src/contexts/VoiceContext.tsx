import { createContext, useContext, useState, ReactNode } from 'react'

interface VoiceContextType {
  isVoiceEnabled: boolean
  setIsVoiceEnabled: (enabled: boolean) => void
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined)

interface VoiceProviderProps {
  children: ReactNode
}

export function VoiceProvider({ children }: VoiceProviderProps) {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)

  const value: VoiceContextType = {
    isVoiceEnabled,
    setIsVoiceEnabled
  }

  return (
    <VoiceContext.Provider value={value}>
      {children}
    </VoiceContext.Provider>
  )
}

export function useVoice() {
  const context = useContext(VoiceContext)
  if (context === undefined) {
    throw new Error('useVoice must be used within a VoiceProvider')
  }
  return context
}