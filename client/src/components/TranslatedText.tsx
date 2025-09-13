import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface TranslatedTextProps {
  text: string
  className?: string
  fallback?: string
}

export function TranslatedText({ text, className, fallback }: TranslatedTextProps) {
  const { language, translate } = useLanguage()
  const [translatedText, setTranslatedText] = useState(text)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (language === 'en') {
      setTranslatedText(text)
      return
    }

    const translateText = async () => {
      setIsLoading(true)
      try {
        const translated = await translate(text)
        setTranslatedText(translated)
      } catch (error) {
        console.error('Translation error:', error)
        setTranslatedText(fallback || text)
      } finally {
        setIsLoading(false)
      }
    }

    translateText()
  }, [text, language, translate, fallback])

  return (
    <span className={className}>
      {isLoading && fallback ? fallback : translatedText}
    </span>
  )
}

// Hook version for inline usage
export function useTranslation(text: string): string {
  const { language, translate } = useLanguage()
  const [translatedText, setTranslatedText] = useState(text)

  useEffect(() => {
    if (language === 'en') {
      setTranslatedText(text)
      return
    }

    translate(text).then(setTranslatedText).catch(() => setTranslatedText(text))
  }, [text, language, translate])

  return translatedText
}