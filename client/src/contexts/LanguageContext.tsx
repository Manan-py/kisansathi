import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'en' | 'hi' | 'pa'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en')
  const [translations, setTranslations] = useState<Record<string, any>>({})

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('agritech-language') as Language
    if (savedLanguage && ['en', 'hi', 'pa'].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  useEffect(() => {
    // Load translations for current language
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`../translations/${language}.json`)
        setTranslations(translationModule.default)
      } catch (error) {
        console.error('Failed to load translations:', error)
        // Fallback to English if translation loading fails
        if (language !== 'en') {
          const fallbackModule = await import('../translations/en.json')
          setTranslations(fallbackModule.default)
        }
      }
    }
    
    loadTranslations()
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('agritech-language', lang)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Return the key if translation is not found
        return key
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  const isRTL = false // None of our supported languages are RTL

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
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