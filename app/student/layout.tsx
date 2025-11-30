"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, BookOpen, TrendingUp, Brain, Sparkles, Globe } from "lucide-react"
import { createClient } from "@/lib/supabase"
import { LanguageProvider, useLanguage } from "@/lib/contexts/LanguageContext"

// Language selector component
function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()

  const languages = [
    { code: "en" as const, name: "English", flag: "🇬🇧" },
    { code: "hi" as const, name: "हिंदी", flag: "🇮🇳" },
    { code: "te" as const, name: "తెలుగు", flag: "🇮🇳" },
    { code: "ta" as const, name: "தமிழ்", flag: "🇮🇳" },
  ]

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as any)}
        className="px-2 py-1 border rounded-md text-sm bg-background hover:bg-muted transition-colors"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}

// Main layout content
function StudentLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()
  const { t, isLoading } = useLanguage()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/login")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem("user")
    localStorage.removeItem("learn-buddy-language")
    router.push("/auth/login")
  }

  if (!user || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="border-b bg-card sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/student/learn" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              <Brain className="w-5 h-5" />
            </div>
            <span className="font-bold text-foreground hidden sm:inline">Learn Buddy</span>
          </Link>

          <div className="flex items-center gap-4">
            <LanguageSelector />
            <div className="text-sm">
              <p className="font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{t.common.grade} {user.grade}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout} 
              title={t.common.logout}
              className="hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 border-r bg-muted/20 min-h-screen">
          <div className="p-6 space-y-2">
            <Link href="/student/learn">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer group">
                <BookOpen className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-medium">{t.student.learn}</span>
              </div>
            </Link>
            <Link href="/student/flashcards">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer group">
                <Brain className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-medium">{t.student.flashcards}</span>
              </div>
            </Link>
            <Link href="/student/adk-agents">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer group">
                <Sparkles className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-medium">{t.student.aiAgents}</span>
              </div>
            </Link>
            <Link href="/student/progress">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer group">
                <TrendingUp className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-medium">{t.student.myProgress}</span>
              </div>
            </Link>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 max-w-6xl mx-auto w-full">{children}</main>
      </div>
    </div>
  )
}

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <StudentLayoutContent>{children}</StudentLayoutContent>
    </LanguageProvider>
  )
}
