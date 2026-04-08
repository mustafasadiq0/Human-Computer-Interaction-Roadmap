import React from 'react'
import { BookOpen, Clock, DollarSign, Target, Users, Brain, Stethoscope, Code, Factory, Lightbulb } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const LearningPaths = () => {
  const paths = [
    {
      id: 'hobby',
      icon: Lightbulb,
      title: "المسار الاستكشافي (الهاوي)",
      description: "مناسب للمهتمين بالتعلم الشخصي والاستكشاف",
      color: "bg-blue-500",
      timeframe: "2-6 أشهر للبدء",
      budget: "100-500 دولار",
      difficulty: "مبتدئ",
      skills: ["فضول علمي", "صبر للتعلم", "اهتمام بالتكنولوجيا"],
      steps: [
        "ابدأ بجهاز NeuroSky MindWave Mobile 2",
        "تعلم أساسيات Python",
        "جرب تطبيقات بسيطة مثل ألعاب التركيز",
        "انضم لمجتمعات OpenBCI",
        "اتبع دروس YouTube للمبتدئين"
      ],
      tools: ["NeuroSky", "Python", "OpenBCI", "Arduino"],
      nextSteps: "بعد إتقان الأساسيات، يمكنك الانتقال للمسار التطبيقي أو الطبي"
    },
    {
      id: 'medical',
      icon: Stethoscope,
      title: "المسار الطبي",
      description: "للمهتمين بالتطبيقات الطبية وإعادة التأهيل",
      color: "bg-green-500",
      timeframe: "1-3 سنوات للتخصص",
      budget: "2000-10000 دولار",
      difficulty: "متقدم",
      skills: ["معرفة طبية", "تعامل مع المرضى", "فهم اللوائح الطبية"],
      steps: [
        "ادرس فسيولوجيا الدماغ والجهاز العصبي",
        "تعلم أساسيات معالجة الإشارات الطبية",
        "احصل على تدريب في أخلاقيات البحث الطبي",
        "تعاون مع مستشفيات ومراكز إعادة التأهيل",
        "ادرس اللوائح الطبية والموافقات"
      ],
      tools: ["EEG", "fMRI", "MATLAB", "LabVIEW", "BCI2000"],
      nextSteps: "التخصص في مجال محدد مثل إعادة التأهيل أو الأطراف الاصطناعية"
    },
    {
      id: 'academic',
      icon: Brain,
      title: "المسار البحثي الأكاديمي",
      description: "للباحثين والأكاديميين المهتمين بالبحث العلمي",
      color: "bg-purple-500",
      timeframe: "3-7 سنوات للدكتوراه",
      budget: "5000-20000 دولار",
      difficulty: "خبير",
      skills: ["تفكير نقدي", "كتابة علمية", "تحليل إحصائي متقدم"],
      steps: [
        "احصل على درجة عليا في علوم الأعصاب أو الهندسة",
        "تعلم MATLAB وR للتحليل الإحصائي",
        "اقرأ الأوراق العلمية الحديثة",
        "شارك في مؤتمرات BCI الدولية",
        "ابدأ مشروع بحثي تحت إشراف أكاديمي"
      ],
      tools: ["MATLAB", "R", "Python", "SPSS", "EEGLab"],
      nextSteps: "النشر في المجلات العلمية والحصول على منح بحثية"
    },
    {
      id: 'developer',
      icon: Code,
      title: "المسار التطبيقي (المطور)",
      description: "لمطوري البرمجيات والمهندسين",
      color: "bg-orange-500",
      timeframe: "6 أشهر - 2 سنة للإتقان",
      budget: "500-3000 دولار",
      difficulty: "متوسط",
      skills: ["برمجة متقدمة", "تطوير واجهات", "حل المشاكل التقنية"],
      steps: [
        "أتقن Python ومكتباته العلمية",
        "تعلم أساسيات معالجة الإشارات",
        "ابدأ بمشاريع OpenBCI",
        "طور تطبيقات ويب تفاعلية",
        "انشر مشاريعك على GitHub"
      ],
      tools: ["Python", "JavaScript", "OpenBCI", "TensorFlow", "React"],
      nextSteps: "تطوير منتجات تجارية أو الانضمام لشركات تقنية متخصصة"
    },
    {
      id: 'industrial',
      icon: Factory,
      title: "المسار الصناعي والأمني",
      description: "للمهتمين بالتطبيقات الصناعية والأمنية",
      color: "bg-red-500",
      timeframe: "1-3 سنوات للتخصص",
      budget: "2000-15000 دولار",
      difficulty: "متقدم",
      skills: ["فهم الأنظمة الصناعية", "إدارة المشاريع", "معرفة بالأمان"],
      steps: [
        "ادرس أنظمة التحكم الصناعية",
        "تعلم عن الأمن السيبراني",
        "فهم متطلبات الصناعة والمعايير",
        "طور مهارات إدارة المشاريع",
        "تعاون مع شركات التكنولوجيا"
      ],
      tools: ["PLC", "SCADA", "IoT", "Machine Learning", "Cybersecurity Tools"],
      nextSteps: "قيادة مشاريع تحول رقمي في الشركات الصناعية"
    }
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'مبتدئ': return 'bg-green-100 text-green-800'
      case 'متوسط': return 'bg-yellow-100 text-yellow-800'
      case 'متقدم': return 'bg-orange-100 text-orange-800'
      case 'خبير': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="gradient-text">المسارات التعليمية</span> في BCI
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          اختر المسار الذي يناسب أهدافك ومستوى خبرتك. كل مسار مصمم ليوصلك لهدفك بأفضل طريقة ممكنة
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {paths.map((path) => {
          const Icon = path.icon
          return (
            <Card key={path.id} className="card-hover h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${path.color} text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge className={getDifficultyColor(path.difficulty)}>
                    {path.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-2">{path.title}</CardTitle>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {path.description}
                </p>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                {/* Key Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                    <span>{path.timeframe}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground ml-2" />
                    <span>{path.budget}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="font-semibold text-sm mb-3 flex items-center">
                    <Target className="h-4 w-4 ml-2" />
                    المهارات المطلوبة
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {path.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Steps */}
                <div className="mb-6 flex-1">
                  <h4 className="font-semibold text-sm mb-3 flex items-center">
                    <BookOpen className="h-4 w-4 ml-2" />
                    خطوات التعلم
                  </h4>
                  <ul className="space-y-2">
                    {path.steps.slice(0, 3).map((step, index) => (
                      <li key={index} className="text-sm flex items-start">
                        <div className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5 ml-2 flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                    {path.steps.length > 3 && (
                      <li className="text-sm text-muted-foreground">
                        + {path.steps.length - 3} خطوات أخرى...
                      </li>
                    )}
                  </ul>
                </div>

                {/* Tools */}
                <div className="mb-6">
                  <h4 className="font-semibold text-sm mb-3">الأدوات الرئيسية</h4>
                  <div className="flex flex-wrap gap-1">
                    {path.tools.map((tool, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-muted/50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-sm mb-2">الخطوات التالية</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {path.nextSteps}
                  </p>
                </div>

                {/* Action Button */}
                <Button className={`w-full ${path.color} text-white hover:opacity-90`}>
                  ابدأ هذا المسار
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Comparison Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-center mb-8">مقارنة سريعة بين المسارات</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border p-4 text-right">المسار</th>
                <th className="border border-border p-4 text-center">المدة</th>
                <th className="border border-border p-4 text-center">التكلفة</th>
                <th className="border border-border p-4 text-center">الصعوبة</th>
                <th className="border border-border p-4 text-center">المخرجات</th>
              </tr>
            </thead>
            <tbody>
              {paths.map((path) => (
                <tr key={path.id} className="hover:bg-muted/30">
                  <td className="border border-border p-4">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${path.color} ml-2`}></div>
                      <span className="font-medium">{path.title}</span>
                    </div>
                  </td>
                  <td className="border border-border p-4 text-center text-sm">
                    {path.timeframe}
                  </td>
                  <td className="border border-border p-4 text-center text-sm">
                    {path.budget}
                  </td>
                  <td className="border border-border p-4 text-center">
                    <Badge className={getDifficultyColor(path.difficulty)}>
                      {path.difficulty}
                    </Badge>
                  </td>
                  <td className="border border-border p-4 text-center text-sm">
                    {path.id === 'hobby' && 'مشاريع شخصية'}
                    {path.id === 'medical' && 'تطبيقات طبية'}
                    {path.id === 'academic' && 'أبحاث علمية'}
                    {path.id === 'developer' && 'منتجات تقنية'}
                    {path.id === 'industrial' && 'حلول صناعية'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">غير متأكد من المسار المناسب؟</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              خذ اختبارنا التفاعلي لتحديد المسار الأنسب لك بناءً على خبرتك وأهدافك
            </p>
            <Button size="lg" className="hero-gradient text-white">
              <Target className="ml-2 h-5 w-5" />
              ابدأ اختبار تحديد المسار
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LearningPaths

