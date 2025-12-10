"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useTranslation } from 'react-i18next'
import { createClient } from "@/lib/supabase"

interface ProgressData {
  name: string
  mathematics: number
  science: number
  english: number
  social: number
  tamil: number
}

interface SubjectScore {
  subject: string
  score: number
  total: number
}

export default function ProgressPage() {
  const { t } = useTranslation()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [progressData, setProgressData] = useState<ProgressData[]>([])
  const [userGrade, setUserGrade] = useState<number>(10)
  const [loading, setLoading] = useState(true)
  const [subjectScores, setSubjectScores] = useState<SubjectScore[]>([])

  useEffect(() => {
    loadUserAndProgress()
  }, [])

  const loadUserAndProgress = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) return

      // Get user profile
      const { data: profile } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('id', authUser.id)
        .single()

      if (profile) {
        setUser(profile)
        setUserGrade(profile.grade || 10)
        await loadRealProgressData(authUser.id, profile.grade)
      }
    } catch (error) {
      console.error('Error loading progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadRealProgressData = async (userId: string, grade: number) => {
    try {
      // Get assessments from database
      const { data: assessments } = await supabase
        .from('assessments')
        .select('*')
        .eq('student_id', userId)
        .order('created_at', { ascending: true })

      if (assessments && assessments.length > 0) {
        // Group by month and calculate averages
        const monthlyData: { [key: string]: { [subject: string]: number[] } } = {}
        
        assessments.forEach((assessment) => {
          const date = new Date(assessment.created_at)
          const monthKey = date.toLocaleString('en', { month: 'short' })
          
          if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = {}
          }
          
          const subject = assessment.subject || 'general'
          if (!monthlyData[monthKey][subject]) {
            monthlyData[monthKey][subject] = []
          }
          
          monthlyData[monthKey][subject].push(assessment.score || 0)
        })

        // Convert to chart format
        const chartData = Object.entries(monthlyData).map(([month, subjects]) => {
          return {
            name: month,
            mathematics: subjects.mathematics ? Math.round(subjects.mathematics.reduce((a, b) => a + b, 0) / subjects.mathematics.length) : 0,
            science: subjects.science ? Math.round(subjects.science.reduce((a, b) => a + b, 0) / subjects.science.length) : 0,
            english: subjects.english ? Math.round(subjects.english.reduce((a, b) => a + b, 0) / subjects.english.length) : 0,
            social: subjects['social science'] ? Math.round(subjects['social science'].reduce((a, b) => a + b, 0) / subjects['social science'].length) : 0,
            tamil: subjects.tamil ? Math.round(subjects.tamil.reduce((a, b) => a + b, 0) / subjects.tamil.length) : 0,
          }
        })

        setProgressData(chartData.length > 0 ? chartData : getDefaultData(grade))
        
        // Calculate current subject scores
        const currentScores: SubjectScore[] = [
          { subject: 'mathematics', score: chartData[chartData.length - 1]?.mathematics || 0, total: 100 },
          { subject: 'science', score: chartData[chartData.length - 1]?.science || 0, total: 100 },
          { subject: 'english', score: chartData[chartData.length - 1]?.english || 0, total: 100 },
          { subject: 'social', score: chartData[chartData.length - 1]?.social || 0, total: 100 },
          { subject: 'tamil', score: chartData[chartData.length - 1]?.tamil || 0, total: 100 },
        ]
        setSubjectScores(currentScores)
      } else {
        // No assessments yet - show empty state
        setProgressData(getDefaultData(grade))
        setSubjectScores([
          { subject: 'mathematics', score: 0, total: 100 },
          { subject: 'science', score: 0, total: 100 },
          { subject: 'english', score: 0, total: 100 },
          { subject: 'social', score: 0, total: 100 },
          { subject: 'tamil', score: 0, total: 100 },
        ])
      }
    } catch (error) {
      console.error('Error loading assessment data:', error)
      setProgressData(getDefaultData(grade))
    }
  }

  const getDefaultData = (grade: number): ProgressData[] => {
    return [
      { name: "No data yet", mathematics: 0, science: 0, english: 0, social: 0, tamil: 0 }
    ]
  }

  if (loading) {
    return <div className="flex items-center justify-center py-8">Loading your progress...</div>
  }

  if (!user) return null

  // Calculate overall performance
  const latestData = progressData[progressData.length - 1] || { mathematics: 0, science: 0, english: 0, social: 0, tamil: 0 }
  const overallAverage = Math.round((latestData.mathematics + latestData.science + latestData.english + latestData.social + latestData.tamil) / 5)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">{t('progress.title')}</h1>
        <p className="text-muted-foreground">{t('progress.subtitle')}</p>
      </div>

      {/* Overall Performance */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('progress.overallPerformance')}</CardTitle>
            <CardDescription>{t('progress.allSubjects')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">{overallAverage}%</p>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${overallAverage}%` }}></div>
              </div>
              <p className="text-sm text-muted-foreground">↑ {t('progress.readyExams')}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('subjects.mathematics')}</CardTitle>
            <CardDescription>Algebra, Geometry, Trigonometry</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">{latestData.mathematics}%</p>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${latestData.mathematics}%` }}></div>
              </div>
              <p className="text-sm text-muted-foreground">{t('progress.strongIn')} Quadratic Equations</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('subjects.science')}</CardTitle>
            <CardDescription>Physics, Chemistry, Biology</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">{latestData.science}%</p>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${latestData.science}%` }}></div>
              </div>
              <p className="text-sm text-muted-foreground">{t('progress.excellentIn')} Biology</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t('progress.monthlyProgress')}</CardTitle>
          <CardDescription>
            {progressData[0]?.name === "No data yet" 
              ? "Take assessments to see your progress" 
              : `Grade ${userGrade} Tamil Nadu Board Subjects - Based on your test results`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {progressData[0]?.name === "No data yet" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground mb-4">No assessment data available yet</p>
              <p className="text-sm text-muted-foreground">Complete some assessments to track your progress over time</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="mathematics" fill="#3b82f6" name={t('subjects.mathematics')} />
                <Bar dataKey="science" fill="#10b981" name={t('subjects.science')} />
                <Bar dataKey="english" fill="#f59e0b" name={t('subjects.english')} />
                <Bar dataKey="social" fill="#8b5cf6" name={t('progress.socialScience')} />
                <Bar dataKey="tamil" fill="#ef4444" name={t('subjects.tamil')} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Tamil Nadu Board Exam Readiness */}
      <Card>
        <CardHeader>
          <CardTitle>{userGrade === 10 ? t('progress.boardReadiness') : t('progress.foundationBuilding')} - Class {userGrade}</CardTitle>
          <CardDescription>{t('progress.preparationStatus')} TNSCERT {userGrade === 10 ? 'board examinations' : 'curriculum'}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(userGrade === 7 ? [
              { skill: "Mathematics - Integers, Fractions & Basic Algebra", score: latestData.mathematics, status: "Good" },
              { skill: "Science - Plants, Animals & Basic Concepts", score: latestData.science, status: "Good" },
              { skill: "English - Reading, Writing & Grammar Basics", score: latestData.english, status: "Very Good" },
              { skill: "Social Science - History & Geography Basics", score: latestData.social, status: "Good" },
              { skill: "Tamil - Literature & Grammar", score: latestData.tamil, status: "Excellent" },
            ] : [
              { skill: "Mathematics - Algebra & Trigonometry", score: latestData.mathematics, status: "Good" },
              { skill: "Science - Physics, Chemistry, Biology", score: latestData.science, status: "Excellent" },
              { skill: "English - Grammar & Literature", score: latestData.english, status: "Very Good" },
              { skill: "Social Science - History & Geography", score: latestData.social, status: "Good" },
              { skill: "Tamil - Literature & Grammar", score: latestData.tamil, status: "Excellent" },
            ]).map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.skill}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-semibold">{item.score}%</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.score >= 85 ? 'bg-green-100 text-green-800' : 
                      item.score >= 75 ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${item.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>📚 {t('progress.studyRecommendations')}</CardTitle>
          <CardDescription>{t('progress.personalizedSuggestions')} Grade {userGrade} Tamil Nadu {userGrade === 10 ? 'Board preparation' : 'curriculum learning'}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {userGrade === 7 ? (
              <>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900">🔢 {t('progress.mathFocus')}</h4>
                  <p className="text-sm text-blue-700">Practice more integer operations and fraction problems. Build strong number sense.</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900">🔬 {t('progress.scienceStrength')}</h4>
                  <p className="text-sm text-green-700">{t('progress.excellentProgress')} Focus on understanding plant nutrition and basic animal biology concepts.</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-900">📚 Reading Skills</h4>
                  <p className="text-sm text-yellow-700">Continue building English vocabulary. Practice reading short stories daily.</p>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900">🔢 {t('progress.mathFocus')}</h4>
                  <p className="text-sm text-blue-700">Practice more coordinate geometry problems. Review trigonometric identities.</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900">🔬 {t('progress.scienceStrength')}</h4>
                  <p className="text-sm text-green-700">{t('progress.excellentProgress')} Focus on numerical problems in physics for board exam preparation.</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-900">🌍 {t('progress.socialScience')}</h4>
                  <p className="text-sm text-yellow-700">Review Indian National Movement timeline. Practice map work for geography.</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
