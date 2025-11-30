"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, type Language } from '@/lib/utils/translations'
import { createClient } from '@/lib/supabase'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => Promise<void>
  t: typeof translations.en
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: React.ReactNode
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>('en')
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        // First check if user is logged in and has a saved language preference
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          const { data: profile } = await supabase
            .from('student_profiles')
            .select('language')
            .eq('id', user.id)
            .single()
          
          if (profile?.language) {
            setLanguageState(profile.language as Language)
          } else {
            // Check localStorage for saved language
            const savedLanguage = localStorage.getItem('learn-buddy-language')
            if (savedLanguage && savedLanguage in translations) {
              setLanguageState(savedLanguage as Language)
            }
          }
        } else {
          // For non-logged in users, check localStorage
          const savedLanguage = localStorage.getItem('learn-buddy-language')
          if (savedLanguage && savedLanguage in translations) {
            setLanguageState(savedLanguage as Language)
          }
        }
      } catch (error) {
        console.error('Error initializing language:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeLanguage()
  }, [supabase])

  const setLanguage = async (newLanguage: Language) => {
    try {
      setLanguageState(newLanguage)
      
      // Save to localStorage
      localStorage.setItem('learn-buddy-language', newLanguage)
      
      // Save to database if user is logged in
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase
          .from('student_profiles')
          .update({ language: newLanguage })
          .eq('id', user.id)
      }
    } catch (error) {
      console.error('Error updating language:', error)
    }
  }

  const value = {
    language,
    setLanguage,
    t: translations[language],
    isLoading
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}