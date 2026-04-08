import React, { useState } from 'react'
import { Brain, Zap, Shield, Stethoscope, Gamepad2, Factory, ChevronRight, Play, Pause } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const AboutBCI = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const bciTypes = [
    {
      icon: Shield,
      title: "غير جراحية (Non-invasive)",
      description: "آمنة تماماً، تستخدم أقطاب على فروة الرأس",
      examples: ["EEG", "fNIRS"],
      pros: ["آمنة 100%", "سهلة الاستخدام", "تكلفة منخفضة"],
      cons: ["دقة أقل", "تأثر بالضوضاء"]
    },
    {
      icon: Zap,
      title: "شبه جراحية (Semi-invasive)",
      description: "أقطاب تحت الجمجمة فوق سطح الدماغ",
      examples: ["ECoG"],
      pros: ["دقة أعلى", "استقرار أفضل"],
      cons: ["تدخل جراحي", "تكلفة أعلى"]
    },
    {
      icon: Brain,
      title: "جراحية (Invasive)",
      description: "أقطاب مزروعة داخل أنسجة الدماغ",
      examples: ["Microelectrodes"],
      pros: ["أعلى دقة", "تحكم دقيق"],
      cons: ["مخاطر عالية", "تكلفة باهظة"]
    }
  ]

  const applications = [
    {
      icon: Stethoscope,
      title: "التطبيقات الطبية",
      description: "مساعدة المرضى وإعادة التأهيل",
      examples: [
        "مساعدة المصابين بالشلل",
        "إعادة التأهيل بعد السكتة الدماغية",
        "الأطراف الاصطناعية الذكية",
        "علاج الصرع والاكتئاب"
      ]
    },
    {
      icon: Gamepad2,
      title: "الألعاب والترفيه",
      description: "تجارب تفاعلية جديدة",
      examples: [
        "ألعاب متحكم بها بالدماغ",
        "الواقع الافتراضي المعزز",
        "تطبيقات التأمل والاسترخاء",
        "التدريب الرياضي الذهني"
      ]
    },
    {
      icon: Factory,
      title: "التطبيقات الصناعية",
      description: "تحسين الكفاءة والأمان",
      examples: [
        "التحكم في الروبوتات",
        "مراقبة حالة العمال",
        "أنظمة الأمان المتقدمة",
        "واجهات المستخدم الذكية"
      ]
    }
  ]

  const timeline = [
    { year: "1924", event: "اكتشاف EEG بواسطة هانز بيرغر" },
    { year: "1960s", event: "أول تجارب BCI على الحيوانات" },
    { year: "1998", event: "أول قطب كهربائي في دماغ إنسان" },
    { year: "2000s", event: "تطوير أنظمة BCI التجارية" },
    { year: "2010s", event: "انتشار أجهزة BCI للمستهلكين" },
    { year: "2020s", event: "تقدم كبير في الذكاء الاصطناعي وBCI" }
  ]

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          ما هي <span className="gradient-text">واجهات الدماغ والحاسوب</span>؟
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          تقنية ثورية تمكن من التواصل المباشر بين الدماغ البشري والأجهزة الخارجية، 
          فاتحة آفاقاً جديدة في الطب والتكنولوجيا والحياة اليومية
        </p>
      </div>

      {/* Video Introduction */}
      <div className="mb-16">
        <Card className="overflow-hidden">
          <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <div className="text-center">
              <Button
                size="lg"
                className="mb-4"
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              >
                {isVideoPlaying ? <Pause className="ml-2 h-5 w-5" /> : <Play className="ml-2 h-5 w-5" />}
                {isVideoPlaying ? "إيقاف" : "تشغيل"} الفيديو التوضيحي
              </Button>
              <p className="text-muted-foreground">
                شرح مبسط لكيفية عمل واجهات الدماغ والحاسوب
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* BCI Types */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-center mb-8">أنواع واجهات الدماغ والحاسوب</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bciTypes.map((type, index) => {
            const Icon = type.icon
            return (
              <Card key={index} className="card-hover">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-center">
                    {type.description}
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-sm mb-2 text-green-600">المزايا:</h5>
                      <ul className="text-sm space-y-1">
                        {type.pros.map((pro, i) => (
                          <li key={i} className="flex items-center">
                            <ChevronRight className="h-3 w-3 text-green-500 ml-1" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-sm mb-2 text-orange-600">العيوب:</h5>
                      <ul className="text-sm space-y-1">
                        {type.cons.map((con, i) => (
                          <li key={i} className="flex items-center">
                            <ChevronRight className="h-3 w-3 text-orange-500 ml-1" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* How it Works */}
      <div className="mb-16">
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-8">كيف تعمل واجهات الدماغ والحاسوب؟</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { step: "1", title: "التقاط الإشارات", desc: "أجهزة استشعار تلتقط الإشارات الكهربائية من الدماغ" },
                { step: "2", title: "التضخيم", desc: "تضخيم الإشارات الضعيفة وتحويلها لرقمية" },
                { step: "3", title: "المعالجة", desc: "تنظيف الإشارات وإزالة الضوضاء" },
                { step: "4", title: "التحليل", desc: "استخلاص الميزات وتصنيف الأنماط" },
                { step: "5", title: "التحكم", desc: "ترجمة النتائج لأوامر للأجهزة الخارجية" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    {item.step}
                  </div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                  {index < 4 && (
                    <ChevronRight className="h-5 w-5 text-primary mx-auto mt-4 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-center mb-8">التطبيقات الرئيسية</h3>
        <Tabs defaultValue="medical" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="medical">طبية</TabsTrigger>
            <TabsTrigger value="entertainment">ترفيهية</TabsTrigger>
            <TabsTrigger value="industrial">صناعية</TabsTrigger>
          </TabsList>
          
          {applications.map((app, index) => {
            const Icon = app.icon
            const tabValue = index === 0 ? "medical" : index === 1 ? "entertainment" : "industrial"
            
            return (
              <TabsContent key={index} value={tabValue}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{app.title}</CardTitle>
                        <p className="text-muted-foreground">{app.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {app.examples.map((example, i) => (
                        <div key={i} className="flex items-center p-3 bg-muted/50 rounded-lg">
                          <ChevronRight className="h-4 w-4 text-primary ml-2" />
                          <span>{example}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-center mb-8">تاريخ تطور BCI</h3>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <Card className="card-hover">
                    <CardContent className="p-4">
                      <div className="font-bold text-primary text-lg mb-2">{item.year}</div>
                      <p className="text-sm">{item.event}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutBCI

