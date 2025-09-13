import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

type Language = 'en' | 'hi' | 'pa'

export function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en')

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  ]

  const translatePage = (targetLang: Language) => {
    setCurrentLanguage(targetLang)
    
    if (targetLang === 'en') {
      // Reset to original language
      document.documentElement.lang = 'en'
      // Clear any existing translations by reloading
      window.location.reload()
      return
    }

    // Set the page language for browser translation
    document.documentElement.lang = targetLang
    
    // Use browser's built-in translation feature
    // This will prompt the user to translate if browser supports it
    const meta = document.createElement('meta')
    meta.name = 'google'
    meta.content = 'notranslate'
    
    // Remove the notranslate meta tag if it exists to allow translation
    const existingMeta = document.querySelector('meta[name="google"][content="notranslate"]')
    if (existingMeta) {
      existingMeta.remove()
    }
    
    // Try to trigger browser translation using Google Translate
    if (!document.getElementById('google_translate_element')) {
      const script = document.createElement('script')
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      
      // Create the callback function
      ;(window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,hi,pa',
          autoDisplay: false,
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element')
        
        // Auto-trigger translation after a brief delay
        setTimeout(() => {
          const targetLanguageMap: Record<Language, string> = {
            'hi': 'hi',
            'pa': 'pa', 
            'en': 'en'
          }
          const langCode = targetLanguageMap[targetLang]
          if (langCode && langCode !== 'en') {
            const selectElement = document.querySelector('select.goog-te-combo') as HTMLSelectElement
            if (selectElement) {
              selectElement.value = langCode
              selectElement.dispatchEvent(new Event('change'))
            }
          }
        }, 1000)
      }
      
      document.head.appendChild(script)
      
      // Add the translate element div (hidden)
      const translateDiv = document.createElement('div')
      translateDiv.id = 'google_translate_element'
      translateDiv.style.display = 'none'
      document.body.appendChild(translateDiv)
    } else {
      // If already initialized, just trigger translation
      const selectElement = document.querySelector('select.goog-te-combo') as HTMLSelectElement
      if (selectElement) {
        const targetLanguageMap: Record<Language, string> = {
          'hi': 'hi',
          'pa': 'pa', 
          'en': 'en'
        }
        const langCode = targetLanguageMap[targetLang]
        if (langCode) {
          selectElement.value = langCode
          selectElement.dispatchEvent(new Event('change'))
        }
      }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-11 w-11"
          aria-label="Language Selector"
          data-testid="button-language-selector"
        >
          <Languages className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => translatePage(lang.code)}
            className={`flex items-center justify-between cursor-pointer ${
              currentLanguage === lang.code ? 'bg-accent' : ''
            }`}
            data-testid={`option-language-${lang.code}`}
          >
            <span className="flex flex-col">
              <span className="font-medium">{lang.nativeName}</span>
              <span className="text-sm text-muted-foreground">{lang.name}</span>
            </span>
            {currentLanguage === lang.code && (
              <span className="text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}