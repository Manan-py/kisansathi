// Translation service using LibreTranslate API
interface TranslationCache {
  [key: string]: {
    [targetLang: string]: string
  }
}

interface LibreTranslateResponse {
  translatedText: string
}

class TranslationService {
  private cache: TranslationCache = {}
  private baseUrl = 'https://libretranslate.com'
  
  // Language code mapping for LibreTranslate
  private languageMap: Record<string, string> = {
    'en': 'en',
    'hi': 'hi', 
    'pa': 'pa'
  }

  async translateText(text: string, targetLanguage: string, sourceLanguage: string = 'en'): Promise<string> {
    // Return original text if target is same as source
    if (targetLanguage === sourceLanguage) {
      return text
    }

    // Check cache first
    const cacheKey = `${text}_${sourceLanguage}`
    if (this.cache[cacheKey] && this.cache[cacheKey][targetLanguage]) {
      return this.cache[cacheKey][targetLanguage]
    }

    try {
      const targetLangCode = this.languageMap[targetLanguage] || targetLanguage
      const sourceLangCode = this.languageMap[sourceLanguage] || sourceLanguage

      const response = await fetch(`${this.baseUrl}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          q: text,
          source: sourceLangCode,
          target: targetLangCode
        })
      })

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.status}`)
      }

      const data: LibreTranslateResponse = await response.json()
      const translatedText = data.translatedText

      // Cache the result
      if (!this.cache[cacheKey]) {
        this.cache[cacheKey] = {}
      }
      this.cache[cacheKey][targetLanguage] = translatedText

      return translatedText
    } catch (error) {
      console.error('Translation error:', error)
      // Fallback to original text on error
      return text
    }
  }

  async translateMultiple(texts: string[], targetLanguage: string, sourceLanguage: string = 'en'): Promise<string[]> {
    const promises = texts.map(text => this.translateText(text, targetLanguage, sourceLanguage))
    return Promise.all(promises)
  }

  // Clear cache if needed
  clearCache() {
    this.cache = {}
  }

  // Get supported languages
  getSupportedLanguages(): string[] {
    return Object.keys(this.languageMap)
  }
}

export const translationService = new TranslationService()