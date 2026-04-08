import React, { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, BookOpen, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const faqs = [
    {
      id: 1,
      category: 'basics',
      question: "ما هي واجهات الدماغ والحاسوب (BCI)؟",
      answer: "واجهات الدماغ والحاسوب هي أنظمة تمكن من التواصل المباشر بين الدماغ البشري والأجهزة الخارجية دون الحاجة للعضلات أو الأعصاب الطرفية. تعمل هذه التقنية على قراءة الإشارات الكهربائية من الدماغ وترجمتها إلى أوامر يمكن للحاسوب فهمها وتنفيذها.",
      tags: ["أساسيات", "تعريف"]
    },
    {
      id: 2,
      category: 'basics',
      question: "هل تقنية BCI آمنة؟",
      answer: "نعم، تقنيات BCI غير الجراحية آمنة تماماً. تستخدم أقطاب كهربائية توضع على فروة الرأس لقراءة الإشارات دون أي تدخل جراحي. أما التقنيات الجراحية فتتطلب عمليات جراحية وتحمل مخاطر أكبر، لكنها تستخدم فقط في الحالات الطبية الضرورية.",
      tags: ["أمان", "صحة"]
    },
    {
      id: 3,
      category: 'technical',
      question: "ما هي أنواع إشارات الدماغ المستخدمة في BCI؟",
      answer: "أهم أنواع الإشارات المستخدمة هي: EEG (تخطيط كهربية الدماغ) وهو الأكثر شيوعاً، fMRI (التصوير بالرنين المغناطيسي الوظيفي)، fNIRS (التحليل الطيفي بالأشعة تحت الحمراء)، وECoG (تخطيط كهربية القشرة الدماغية). كل نوع له مزاياه وعيوبه من حيث الدقة والتكلفة والسلامة.",
      tags: ["تقني", "إشارات", "EEG"]
    },
    {
      id: 4,
      category: 'getting-started',
      question: "كيف يمكنني البدء في تعلم BCI؟",
      answer: "ابدأ بتعلم الأساسيات النظرية لعلوم الأعصاب ومعالجة الإشارات. تعلم لغة البرمجة Python ومكتباتها العلمية. احصل على جهاز EEG بسيط مثل NeuroSky أو OpenBCI. اتبع الدروس التعليمية وجرب المشاريع البسيطة. انضم للمجتمعات العلمية والمنتديات المتخصصة.",
      tags: ["بداية", "تعلم", "نصائح"]
    },
    {
      id: 5,
      category: 'technical',
      question: "ما هي أفضل لغات البرمجة لتطوير تطبيقات BCI؟",
      answer: "Python هي الأكثر شيوعاً بسبب مكتباتها العلمية القوية مثل NumPy وSciPy وMNE. MATLAB شائع في البحث الأكاديمي. C++ للتطبيقات التي تتطلب أداء عالي. JavaScript لتطبيقات الويب. R للتحليل الإحصائي المتقدم.",
      tags: ["برمجة", "Python", "MATLAB"]
    },
    {
      id: 6,
      category: 'hardware',
      question: "ما هي أفضل أجهزة EEG للمبتدئين؟",
      answer: "للمبتدئين: NeuroSky MindWave (بسيط ورخيص)، Emotiv EPOC+ (متوسط التكلفة وجودة جيدة). للمتقدمين: OpenBCI Cyton (مفتوح المصدر ومرن)، g.tec g.USBamp (احترافي وعالي الدقة). اختر حسب ميزانيتك ومستوى خبرتك.",
      tags: ["أجهزة", "مبتدئين", "NeuroSky"]
    },
    {
      id: 7,
      category: 'applications',
      question: "ما هي التطبيقات العملية لتقنية BCI؟",
      answer: "التطبيقات الطبية: مساعدة المصابين بالشلل، الأطراف الاصطناعية الذكية، علاج الاكتئاب. التطبيقات الترفيهية: ألعاب متحكم بها بالدماغ، الواقع الافتراضي. التطبيقات الصناعية: التحكم في الروبوتات، مراقبة حالة العمال، أنظمة الأمان المتقدمة.",
      tags: ["تطبيقات", "طبي", "ألعاب"]
    },
    {
      id: 8,
      category: 'getting-started',
      question: "كم تكلفة البدء في مجال BCI؟",
      answer: "للهواة: 100-500 دولار (جهاز بسيط + كمبيوتر). للمطورين: 500-3000 دولار (جهاز متوسط + برامج). للباحثين: 5000-20000 دولار (أجهزة احترافية + برامج متخصصة). للتطبيقات الطبية: 10000+ دولار (أجهزة طبية معتمدة).",
      tags: ["تكلفة", "ميزانية", "استثمار"]
    },
    {
      id: 9,
      category: 'technical',
      question: "ما هي التحديات الرئيسية في تطوير BCI؟",
      answer: "الضوضاء في الإشارات، التباين بين الأشخاص، الحاجة لتدريب طويل، محدودية عرض النطاق الترددي، التأخير في المعالجة، التعب الذهني، صعوبة الحصول على إشارات عالية الجودة، والحاجة لخوارزميات معقدة للتصنيف.",
      tags: ["تحديات", "تقني", "مشاكل"]
    },
    {
      id: 10,
      category: 'career',
      question: "ما هي الفرص الوظيفية في مجال BCI؟",
      answer: "مطور تطبيقات BCI، باحث في علوم الأعصاب الحاسوبية، مهندس إشارات طبية، مطور ألعاب تفاعلية، مستشار تقني في الشركات الطبية، أكاديمي متخصص، مطور أجهزة طبية، ومتخصص في الذكاء الاصطناعي الطبي.",
      tags: ["وظائف", "مهنة", "فرص"]
    }
  ]

  const glossary = [
    {
      term: "EEG",
      definition: "تخطيط كهربية الدماغ - تقنية لقياس النشاط الكهربائي للدماغ من خلال أقطاب موضوعة على فروة الرأس",
      category: "تقني"
    },
    {
      term: "fMRI",
      definition: "التصوير بالرنين المغناطيسي الوظيفي - تقنية تصوير تقيس النشاط الدماغي من خلال تدفق الدم",
      category: "تقني"
    },
    {
      term: "P300",
      definition: "إشارة دماغية تحدث بعد 300 مللي ثانية من حدث مفاجئ أو مهم، تستخدم في واجهات BCI",
      category: "إشارات"
    },
    {
      term: "Motor Imagery",
      definition: "تخيل الحركة - عملية تخيل حركة جسدية دون تنفيذها فعلياً، تستخدم للتحكم في أنظمة BCI",
      category: "تقنيات"
    },
    {
      term: "Feature Extraction",
      definition: "استخلاص الميزات - عملية استخراج المعلومات المهمة من الإشارات الخام لاستخدامها في التصنيف",
      category: "معالجة"
    },
    {
      term: "Neurofeedback",
      definition: "التغذية الراجعة العصبية - تقنية تسمح للشخص برؤية نشاط دماغه في الوقت الفعلي لتعلم التحكم فيه",
      category: "تقنيات"
    },
    {
      term: "Invasive BCI",
      definition: "واجهة دماغ-حاسوب جراحية - تتطلب زرع أقطاب داخل الدماغ، توفر دقة عالية لكن مع مخاطر جراحية",
      category: "أنواع"
    },
    {
      term: "Non-invasive BCI",
      definition: "واجهة دماغ-حاسوب غير جراحية - تستخدم أقطاب خارجية على فروة الرأس، آمنة لكن أقل دقة",
      category: "أنواع"
    },
    {
      term: "Signal Processing",
      definition: "معالجة الإشارات - تقنيات رياضية لتنظيف وتحليل الإشارات الكهربائية من الدماغ",
      category: "معالجة"
    },
    {
      term: "Machine Learning",
      definition: "تعلم الآلة - خوارزميات تتعلم من البيانات لتصنيف الإشارات الدماغية وترجمتها لأوامر",
      category: "ذكاء اصطناعي"
    },
    {
      term: "Electrode",
      definition: "قطب كهربائي - جهاز صغير يوضع على الرأس أو في الدماغ لقياس النشاط الكهربائي",
      category: "أجهزة"
    },
    {
      term: "Artifact",
      definition: "تشويش - إشارات غير مرغوب فيها تتداخل مع إشارات الدماغ مثل حركة العين أو العضلات",
      category: "مشاكل"
    }
  ]

  const categories = [
    { id: 'all', label: 'جميع الأسئلة' },
    { id: 'basics', label: 'الأساسيات' },
    { id: 'technical', label: 'تقني' },
    { id: 'getting-started', label: 'البداية' },
    { id: 'hardware', label: 'الأجهزة' },
    { id: 'applications', label: 'التطبيقات' },
    { id: 'career', label: 'المهنة' }
  ]

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesSearch
  })

  const filteredGlossary = glossary.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="gradient-text">الأسئلة الشائعة</span> والمصطلحات
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          إجابات شاملة على أكثر الأسئلة شيوعاً حول واجهات الدماغ والحاسوب ومعجم للمصطلحات التقنية
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="ابحث في الأسئلة والمصطلحات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="faq">الأسئلة الشائعة</TabsTrigger>
          <TabsTrigger value="glossary">معجم المصطلحات</TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq">
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <Card key={faq.id} className="card-hover">
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-right flex-1 ml-4">
                      {faq.question}
                    </CardTitle>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="flex flex-wrap gap-1">
                        {faq.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {openFAQ === faq.id ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                {openFAQ === faq.id && (
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {faq.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">لم يتم العثور على أسئلة تطابق بحثك</p>
            </div>
          )}
        </TabsContent>

        {/* Glossary Tab */}
        <TabsContent value="glossary">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGlossary.map((item, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-primary">
                      {item.term}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.definition}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredGlossary.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">لم يتم العثور على مصطلحات تطابق بحثك</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="mt-16">
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">{faqs.length}</div>
                <div className="text-sm text-muted-foreground">سؤال شائع</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">{glossary.length}</div>
                <div className="text-sm text-muted-foreground">مصطلح تقني</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">7</div>
                <div className="text-sm text-muted-foreground">فئة رئيسية</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">محتوى عربي</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact for More Questions */}
      <div className="mt-16 text-center">
        <Card className="bg-muted/50">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">لم تجد إجابة لسؤالك؟</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              نحن هنا لمساعدتك! أرسل لنا سؤالك وسنقوم بإضافته لقائمة الأسئلة الشائعة
            </p>
            <Button>
              <HelpCircle className="ml-2 h-5 w-5" />
              اطرح سؤالاً جديداً
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default FAQ

