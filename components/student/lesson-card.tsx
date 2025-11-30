import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle } from "lucide-react"
import { useLanguage } from "@/lib/contexts/LanguageContext"

interface Lesson {
  id: string
  title: string
  subject: "literacy" | "numeracy" | "mathematics" | "science" | "english" | "social_studies" | "hindi" | "physics" | "chemistry" | "biology" | "computer_science"
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number
  completed: boolean
}

export default function LessonCard({ lesson }: { lesson: Lesson }) {
  const { t } = useLanguage()
  
  const difficultyColor = {
    beginner: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
    intermediate: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    advanced: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  }

  const subjectNames = {
    literacy: t.subjects.literacy,
    numeracy: t.subjects.numeracy,
    mathematics: t.subjects.mathematics,
    science: t.subjects.science,
    english: t.subjects.english,
    social_studies: t.subjects.socialStudies,
    hindi: t.subjects.hindi,
    physics: t.subjects.physics,
    chemistry: t.subjects.chemistry,
    biology: t.subjects.biology,
    computer_science: t.subjects.computerScience,
  }

  const difficultyNames = {
    beginner: t.common.beginner,
    intermediate: t.common.intermediate,
    advanced: t.common.advanced,
  }

  const subjectColor = {
    literacy: "text-blue-600",
    numeracy: "text-orange-600",
    mathematics: "text-purple-600",
    science: "text-green-600",
    english: "text-blue-500",
    social_studies: "text-yellow-600",
    hindi: "text-red-600",
    physics: "text-indigo-600",
    chemistry: "text-cyan-600", 
    biology: "text-emerald-600",
    computer_science: "text-gray-600",
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-primary/20 hover:border-primary/40">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight">{lesson.title}</CardTitle>
            <CardDescription className="mt-1">
              <span className={`font-medium ${subjectColor[lesson.subject]}`}>
                {subjectNames[lesson.subject]}
              </span>
            </CardDescription>
          </div>
          {lesson.completed && (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-xs font-medium">{t.common.completed}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${difficultyColor[lesson.difficulty]}`}
          >
            {difficultyNames[lesson.difficulty]}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-4 h-4" />
            {lesson.duration} {t.common.minutes}
          </div>
        </div>
        <Button 
          className="w-full transition-all hover:scale-105" 
          disabled={lesson.completed}
          variant={lesson.completed ? "secondary" : "default"}
        >
          {lesson.completed ? t.common.completed : t.common.startLesson}
        </Button>
      </CardContent>
    </Card>
  )
}
