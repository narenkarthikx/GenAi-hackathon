import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/contexts/LanguageContext"

interface Gap {
  id: string
  area: string
  severity: "low" | "medium" | "high"
  recommendation: string
}

export default function GapDetector({ gap }: { gap: Gap }) {
  const { t } = useLanguage()
  
  const severityColor = {
    low: "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800",
    medium: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800",
    high: "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800",
  }

  const severityIcon = {
    low: "text-green-600 dark:text-green-400",
    medium: "text-yellow-600 dark:text-yellow-400",
    high: "text-red-600 dark:text-red-400",
  }

  const severityNames = {
    low: t.common.low,
    medium: t.common.medium,
    high: t.common.high,
  }

  const severityBadgeColor = {
    low: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    high: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  }

  return (
    <Card className={`border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 ${severityColor[gap.severity]}`}>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <AlertCircle className={`w-5 h-5 ${severityIcon[gap.severity]}`} />
            <h3 className="font-semibold text-foreground flex-1">{gap.area}</h3>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${severityBadgeColor[gap.severity]}`}
            >
              {severityNames[gap.severity]} {t.common.priority}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed pl-8">{gap.recommendation}</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full bg-transparent hover:bg-primary/10 hover:border-primary transition-all hover:scale-105 group"
          >
            <TrendingUp className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            {t.common.practiceNow}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
