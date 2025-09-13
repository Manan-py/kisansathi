import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translationService } from '../services/translationService'

export type Language = 'en' | 'hi' | 'pa'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  translate: (text: string) => Promise<string>
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('agritech-language') as Language
    if (savedLanguage && ['en', 'hi', 'pa'].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('agritech-language', lang)
  }

  const translate = async (text: string): Promise<string> => {
    if (language === 'en') return text
    
    try {
      return await translationService.translateText(text, language, 'en')
    } catch (error) {
      console.error('Translation failed:', error)
      return text
    }
  }

  const isRTL = false // None of our supported languages are RTL

  const value: LanguageContextType = {
    language,
    setLanguage,
    translate,
    isRTL
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}