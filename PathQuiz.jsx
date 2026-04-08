import React, { useState } from 'react'
import { ChevronRight, ChevronLeft, Target, Download, Share2, RotateCcw } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'

const PathQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState(null)

  const questions = [
    {
      id: 1,
      question: "ما هو مستوى خبرتك في البرمجة؟",
      options: [
        { text: "مبتدئ أو لا أعرف البرمجة", value: "beginner", weight: { hobby: 2, medical: 1, academic: 0, developer: 0, industrial: 0 } },
        { text: "أعرف أساسيات البرمجة", value: "basic", weight: { hobby: 1, medical: 1, academic: 1, developer: 2, industrial: 1 } },
        { text: "مطور متوسط الخبرة", value: "intermediate", weight: { hobby: 0, medical: 1, academic: 2, developer: 3, industrial: 2 } },
        { text: "مطور متقدم أو محترف", value: "advanced", weight: { hobby: 0, medical: 2, academic: 3, developer: 4, industrial: 3 } }
      ]
    },
    {
      id: 2,
      question: "ما هو مجال تخصصك أو اهتمامك الأساسي؟",
      options: [
        { text: "الطب أو علوم الصحة", value: "medical", weight: { hobby: 0, medical: 4, academic: 2, developer: 1, industrial: 1 } },
        { text: "الهندسة أو علوم الحاسوب", value: "engineering", weight: { hobby: 1, medical: 1, academic: 3, developer: 4, industrial: 3 } },
        { text: "علم النفس أو علوم الأعصاب", value: "neuroscience", weight: { hobby: 1, medical: 3, academic: 4, developer: 2, industrial: 1 } },
        { text: "الأعمال أو الإدارة", value: "business", weight: { hobby: 1, medical: 1, academic: 1, developer: 2, industrial: 4 } },
        { text: "مجال آخر أو متنوع", value: "other", weight: { hobby: 3, medical: 1, academic: 2, developer: 2, industrial: 2 } }
      ]
    },
    {
      id: 3,
      question: "ما هو هدفك الرئيسي من تعلم BCI؟",
      options: [
        { text: "الفضول والاستكشاف الشخصي", value: "curiosity", weight: { hobby: 4, medical: 0, academic: 1, developer: 1, industrial: 0 } },
        { text: "تطوير تطبيقات عملية", value: "applications", weight: { hobby: 1, medical: 2, academic: 2, developer: 4, industrial: 3 } },
        { text: "البحث الأكاديمي والنشر العلمي", value: "research", weight: { hobby: 0, medical: 2, academic: 4, developer: 1, industrial: 1 } },
        { text: "مساعدة المرضى وتحسين الرعاية الصحية", value: "healthcare", weight: { hobby: 0, medical: 4, academic: 2, developer: 2, industrial: 1 } },
        { text: "تطوير منتجات تجارية", value: "commercial", weight: { hobby: 0, medical: 1, academic: 1, developer: 3, industrial: 4 } }
      ]
    },
    {
      id: 4,
      question: "كم من الوقت يمكنك تخصيصه للتعلم أسبوعياً؟",
      options: [
        { text: "أقل من 5 ساعات", value: "minimal", weight: { hobby: 3, medical: 1, academic: 0, developer: 1, industrial: 1 } },
        { text: "5-10 ساعات", value: "moderate", weight: { hobby: 2, medical: 2, academic: 2, developer: 3, industrial: 2 } },
        { text: "10-20 ساعة", value: "substantial", weight: { hobby: 1, medical: 3, academic: 3, developer: 4, industrial: 3 } },
        { text: "أكثر من 20 ساعة", value: "intensive", weight: { hobby: 0, medical: 3, academic: 4, developer: 3, industrial: 4 } }
      ]
    },
    {
      id: 5,
      question: "ما هو مستوى معرفتك بعلوم الأعصاب؟",
      options: [
        { text: "لا أعرف شيئاً", value: "none", weight: { hobby: 2, medical: 0, academic: 0, developer: 2, industrial: 2 } },
        { text: "معرفة أساسية", value: "basic", weight: { hobby: 2, medical: 2, academic: 1, developer: 2, industrial: 2 } },
        { text: "معرفة متوسطة", value: "intermediate", weight: { hobby: 1, medical: 3, academic: 3, developer: 1, industrial: 1 } },
        { text: "معرفة متقدمة", value: "advanced", weight: { hobby: 0, medical: 4, academic: 4, developer: 1, industrial: 1 } }
      ]
    },
    {
      id: 6,
      question: "ما نوع المشاريع التي تثير اهتمامك أكثر؟",
      options: [
        { text: "ألعاب وتطبيقات ترفيهية", value: "entertainment", weight: { hobby: 4, medical: 0, academic: 1, developer: 3, industrial: 1 } },
        { text: "أجهزة طبية ومساعدة", value: "medical_devices", weight: { hobby: 0, medical: 4, academic: 2, developer: 2, industrial: 2 } },
        { text: "أبحاث وتجارب علمية", value: "research_projects", weight: { hobby: 1, medical: 2, academic: 4, developer: 1, industrial: 1 } },
        { text: "تطبيقات صناعية وأمنية", value: "industrial_apps", weight: { hobby: 0, medical: 1, academic: 1, developer: 2, industrial: 4 } },
        { text: "أدوات تطوير ومكتبات برمجية", value: "dev_tools", weight: { hobby: 1, medical: 1, academic: 2, developer: 4, industrial: 2 } }
      ]
    },
    {
      id: 7,
      question: "ما هو مستوى الاستثمار المالي الذي تستطيع تحمله؟",
      options: [
        { text: "أقل من 200 دولار", value: "low", weight: { hobby: 3, medical: 0, academic: 1, developer: 2, industrial: 0 } },
        { text: "200-1000 دولار", value: "medium", weight: { hobby: 2, medical: 2, academic: 2, developer: 3, industrial: 2 } },
        { text: "1000-5000 دولار", value: "high", weight: { hobby: 1, medical: 3, academic: 3, developer: 2, industrial: 3 } },
        { text: "أكثر من 5000 دولار", value: "very_high", weight: { hobby: 0, medical: 4, academic: 4, developer: 1, industrial: 4 } }
      ]
    },
    {
      id: 8,
      question: "أي من هذه المهارات تمتلكها أو ترغب في تطويرها؟",
      options: [
        { text: "تحليل البيانات والإحصاء", value: "data_analysis", weight: { hobby: 1, medical: 2, academic: 4, developer: 3, industrial: 2 } },
        { text: "تطوير واجهات المستخدم", value: "ui_development", weight: { hobby: 2, medical: 1, academic: 1, developer: 4, industrial: 2 } },
        { text: "البحث العلمي والكتابة الأكاديمية", value: "academic_writing", weight: { hobby: 0, medical: 2, academic: 4, developer: 1, industrial: 1 } },
        { text: "العمل مع المرضى والرعاية الصحية", value: "patient_care", weight: { hobby: 0, medical: 4, academic: 2, developer: 1, industrial: 1 } },
        { text: "إدارة المشاريع والفرق", value: "project_management", weight: { hobby: 1, medical: 2, academic: 2, developer: 2, industrial: 4 } }
      ]
    }
  ]

  const paths = {
    hobby: {
      name: "المسار الاستكشافي (الهاوي)",
      description: "مناسب للمهتمين بالتعلم الشخصي والاستكشاف",
      color: "bg-blue-500",
      recommendations: [
        "ابدأ بجهاز NeuroSky MindWave Mobile 2",
        "تعلم أساسيات Python",
        "جرب تطبيقات بسيطة مثل ألعاب التركيز",
        "انضم لمجتمعات OpenBCI",
        "اتبع دروس YouTube للمبتدئين"
      ],
      timeframe: "2-6 أشهر للبدء",
      budget: "100-500 دولار",
      skills: ["فضول علمي", "صبر للتعلم", "اهتمام بالتكنولوجيا"]
    },
    medical: {
      name: "المسار الطبي",
      description: "للمهتمين بالتطبيقات الطبية وإعادة التأهيل",
      color: "bg-green-500",
      recommendations: [
        "ادرس فسيولوجيا الدماغ والجهاز العصبي",
        "تعلم أساسيات معالجة الإشارات الطبية",
        "احصل على تدريب في أخلاقيات البحث الطبي",
        "تعاون مع مستشفيات ومراكز إعادة التأهيل",
        "ادرس اللوائح الطبية والموافقات"
      ],
      timeframe: "1-3 سنوات للتخصص",
      budget: "2000-10000 دولار",
      skills: ["معرفة طبية", "تعامل مع المرضى", "فهم اللوائح الطبية"]
    },
    academic: {
      name: "المسار البحثي الأكاديمي",
      description: "للباحثين والأكاديميين المهتمين بالبحث العلمي",
      color: "bg-purple-500",
      recommendations: [
        "احصل على درجة عليا في علوم الأعصاب أو الهندسة",
        "تعلم MATLAB وR للتحليل الإحصائي",
        "اقرأ الأوراق العلمية الحديثة",
        "شارك في مؤتمرات BCI الدولية",
        "ابدأ مشروع بحثي تحت إشراف أكاديمي"
      ],
      timeframe: "3-7 سنوات للدكتوراه",
      budget: "5000-20000 دولار",
      skills: ["تفكير نقدي", "كتابة علمية", "تحليل إحصائي متقدم"]
    },
    developer: {
      name: "المسار التطبيقي (المطور)",
      description: "لمطوري البرمجيات والمهندسين",
      color: "bg-orange-500",
      recommendations: [
        "أتقن Python ومكتباته العلمية",
        "تعلم أساسيات معالجة الإشارات",
        "ابدأ بمشاريع OpenBCI",
        "طور تطبيقات ويب تفاعلية",
        "انشر مشاريعك على GitHub"
      ],
      timeframe: "6 أشهر - 2 سنة للإتقان",
      budget: "500-3000 دولار",
      skills: ["برمجة متقدمة", "تطوير واجهات", "حل المشاكل التقنية"]
    },
    industrial: {
      name: "المسار الصناعي والأمني",
      description: "للمهتمين بالتطبيقات الصناعية والأمنية",
      color: "bg-red-500",
      recommendations: [
        "ادرس أنظمة التحكم الصناعية",
        "تعلم عن الأمن السيبراني",
        "فهم متطلبات الصناعة والمعايير",
        "طور مهارات إدارة المشاريع",
        "تعاون مع شركات التكنولوجيا"
      ],
      timeframe: "1-3 سنوات للتخصص",
      budget: "2000-15000 دولار",
      skills: ["فهم الأنظمة الصناعية", "إدارة المشاريع", "معرفة بالأمان"]
    }
  }

  const selectAnswer = (questionIndex, option) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = option
    setAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateResults = () => {
    const scores = {
      hobby: 0,
      medical: 0,
      academic: 0,
      developer: 0,
      industrial: 0
    }

    answers.forEach(answer => {
      Object.keys(answer.weight).forEach(path => {
        scores[path] += answer.weight[path]
      })
    })

    const maxScore = Math.max(...Object.values(scores))
    const recommendedPath = Object.keys(scores).find(path => scores[path] === maxScore)

    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0)
    const percentages = {}
    Object.keys(scores).forEach(path => {
      percentages[path] = totalScore > 0 ? Math.round((scores[path] / totalScore) * 100) : 0
    })

    return {
      scores,
      percentages,
      recommendedPath,
      pathInfo: paths[recommendedPath]
    }
  }

  const finishQuiz = () => {
    if (answers.length === questions.length) {
      const quizResults = calculateResults()
      setResults(quizResults)
      setShowResults(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setResults(null)
  }

  const downloadResults = () => {
    if (!results) return
    
    const content = `
نتائج اختبار تحديد المسار في واجهات الدماغ والحاسوب (BCI)
================================================================

المسار المُوصى به: ${results.pathInfo.name}
الوصف: ${results.pathInfo.description}

تفاصيل المسار:
- الإطار الزمني: ${results.pathInfo.timeframe}
- الميزانية المتوقعة: ${results.pathInfo.budget}

التوصيات:
${results.pathInfo.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

المهارات المطلوبة:
${results.pathInfo.skills.map(skill => `- ${skill}`).join('\n')}

توزيع النتائج على جميع المسارات:
${Object.keys(results.percentages).map(path => 
  `- ${paths[path].name}: ${results.percentages[path]}%`
).join('\n')}

تاريخ الاختبار: ${new Date().toLocaleDateString('ar-SA')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'نتائج_اختبار_BCI.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareResults = () => {
    if (!results) return
    
    const text = `أكملت اختبار تحديد المسار في BCI! المسار المُوصى به لي هو: ${results.pathInfo.name}`
    
    if (navigator.share) {
      navigator.share({
        title: 'نتائج اختبار BCI',
        text: text,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(text + '\n' + window.location.href)
        .then(() => alert('تم نسخ النتائج إلى الحافظة!'))
        .catch(() => alert('لا يمكن مشاركة النتائج تلقائياً. يرجى نسخ الرابط يدوياً.'))
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (showResults && results) {
    return (
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Target className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">نتائج اختبار تحديد المسار</h2>
            <p className="text-muted-foreground">تم تحليل إجاباتك وتحديد المسار الأنسب لك</p>
          </div>

          {/* Recommended Path */}
          <Card className="mb-8 border-2 border-primary">
            <CardHeader className="text-center">
              <div className={`inline-block px-4 py-2 rounded-full text-white font-semibold mb-4 ${results.pathInfo.color}`}>
                المسار المُوصى به
              </div>
              <CardTitle className="text-2xl">{results.pathInfo.name}</CardTitle>
              <p className="text-muted-foreground">{results.pathInfo.description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">تفاصيل المسار:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الإطار الزمني:</span>
                      <span className="font-medium">{results.pathInfo.timeframe}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الميزانية المتوقعة:</span>
                      <span className="font-medium">{results.pathInfo.budget}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">المهارات المطلوبة:</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.pathInfo.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">التوصيات:</h4>
                <ul className="space-y-2">
                  {results.pathInfo.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-primary mt-1 ml-2 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* All Scores */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>توزيع النتائج على جميع المسارات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.keys(results.percentages).map(pathKey => (
                  <div key={pathKey}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{paths[pathKey].name}</span>
                      <span className="text-muted-foreground">{results.percentages[pathKey]}%</span>
                    </div>
                    <Progress value={results.percentages[pathKey]} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={restartQuiz} variant="outline">
              <RotateCcw className="ml-2 h-4 w-4" />
              إعادة الاختبار
            </Button>
            <Button onClick={downloadResults}>
              <Download className="ml-2 h-4 w-4" />
              تحميل النتائج
            </Button>
            <Button onClick={shareResults} variant="outline">
              <Share2 className="ml-2 h-4 w-4" />
              مشاركة النتائج
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Target className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">اختبار تحديد المسار المناسب</h2>
          <p className="text-muted-foreground">
            أجب على الأسئلة التالية لنساعدك في تحديد المسار الأنسب لك في عالم واجهات الدماغ والحاسوب
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>السؤال {currentQuestion + 1} من {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">{questions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className={`quiz-option p-4 rounded-lg cursor-pointer ${
                    answers[currentQuestion]?.value === option.value ? 'selected' : ''
                  }`}
                  onClick={() => selectAnswer(currentQuestion, option)}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 ml-3 ${
                      answers[currentQuestion]?.value === option.value 
                        ? 'bg-primary border-primary' 
                        : 'border-muted-foreground'
                    }`}></div>
                    <span>{option.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
          >
            <ChevronLeft className="ml-2 h-4 w-4" />
            السابق
          </Button>

          {currentQuestion === questions.length - 1 ? (
            <Button
              onClick={finishQuiz}
              disabled={!answers[currentQuestion]}
              className="bg-primary hover:bg-primary/90"
            >
              إنهاء الاختبار
              <Target className="mr-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={nextQuestion}
              disabled={!answers[currentQuestion]}
            >
              التالي
              <ChevronRight className="mr-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PathQuiz

