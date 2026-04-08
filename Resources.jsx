import React, { useState } from 'react'
import { ExternalLink, Youtube, BookOpen, Globe, Code, Users, Star, Clock, Download, Play } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const featuredExpert = {
    name: "د. مصطفى صادق",
    title: "خبير الذكاء الاصطناعي والأمن السيبراني",
    description: "متخصص في تقنيات الذكاء الاصطناعي وإشارات الدماغ والأمن السيبراني، يقدم محتوى تعليمي عالي الجودة باللغة العربية",
    website: "https://mustafasadiq0.wordpress.com",
    youtube: "https://youtube.com/mustafasadiq",
    image: "/api/placeholder/150/150",
    stats: {
      articles: "50+",
      videos: "100+",
      subscribers: "25K+"
    },
    specialties: ["الذكاء الاصطناعي", "إشارات الدماغ", "الأمن السيبراني", "تعلم الآلة"]
  }

  const resources = [
    // Arabic Resources - Dr. Mustafa Sadiq
    {
      id: 1,
      title: "مقدمة في واجهات الدماغ والحاسوب",
      description: "شرح شامل لأساسيات BCI وتطبيقاتها العملية",
      type: "article",
      language: "ar",
      author: "د. مصطفى صادق",
      url: "https://mustafasadiq0.wordpress.com/bci-introduction",
      difficulty: "مبتدئ",
      duration: "15 دقيقة",
      rating: 4.8,
      category: "basics",
      featured: true
    },
    {
      id: 2,
      title: "معالجة إشارات EEG باستخدام Python",
      description: "دورة عملية لتعلم معالجة إشارات الدماغ",
      type: "video",
      language: "ar",
      author: "د. مصطفى صادق",
      url: "https://youtube.com/mustafasadiq/eeg-python",
      difficulty: "متوسط",
      duration: "45 دقيقة",
      rating: 4.9,
      category: "programming",
      featured: true
    },
    {
      id: 3,
      title: "الذكاء الاصطناعي في التطبيقات الطبية",
      description: "كيفية استخدام AI في تحليل إشارات الدماغ",
      type: "article",
      language: "ar",
      author: "د. مصطفى صادق",
      url: "https://mustafasadiq0.wordpress.com/ai-medical",
      difficulty: "متقدم",
      duration: "20 دقيقة",
      rating: 4.7,
      category: "medical",
      featured: true
    },
    
    // Tools and Hardware
    {
      id: 4,
      title: "OpenBCI Documentation",
      description: "الدليل الرسمي لاستخدام أجهزة OpenBCI",
      type: "documentation",
      language: "en",
      author: "OpenBCI Team",
      url: "https://docs.openbci.com",
      difficulty: "متوسط",
      duration: "متغير",
      rating: 4.6,
      category: "tools"
    },
    {
      id: 5,
      title: "NeuroSky Developer Guide",
      description: "دليل المطورين لأجهزة NeuroSky",
      type: "documentation",
      language: "en",
      author: "NeuroSky",
      url: "https://developer.neurosky.com",
      difficulty: "مبتدئ",
      duration: "متغير",
      rating: 4.3,
      category: "tools"
    },
    {
      id: 6,
      title: "Emotiv EPOC+ SDK",
      description: "مجموعة أدوات تطوير Emotiv",
      type: "software",
      language: "en",
      author: "Emotiv",
      url: "https://www.emotiv.com/developer",
      difficulty: "متوسط",
      duration: "متغير",
      rating: 4.4,
      category: "tools"
    },

    // Programming Libraries
    {
      id: 7,
      title: "MNE-Python Tutorial",
      description: "مكتبة Python لمعالجة إشارات الدماغ",
      type: "tutorial",
      language: "en",
      author: "MNE Community",
      url: "https://mne.tools/stable/tutorials.html",
      difficulty: "متوسط",
      duration: "2-3 ساعات",
      rating: 4.8,
      category: "programming"
    },
    {
      id: 8,
      title: "EEGLAB Tutorials",
      description: "دروس MATLAB لتحليل إشارات EEG",
      type: "tutorial",
      language: "en",
      author: "SCCN",
      url: "https://eeglab.org/tutorials",
      difficulty: "متقدم",
      duration: "4-6 ساعات",
      rating: 4.7,
      category: "programming"
    },
    {
      id: 9,
      title: "BCI2000 Documentation",
      description: "منصة شاملة لتطوير تطبيقات BCI",
      type: "documentation",
      language: "en",
      author: "BCI2000 Team",
      url: "https://www.bci2000.org/mediawiki/index.php/User_Tutorial",
      difficulty: "متقدم",
      duration: "متغير",
      rating: 4.5,
      category: "tools"
    },

    // Academic Resources
    {
      id: 10,
      title: "BCI Research Papers Collection",
      description: "مجموعة من أهم الأوراق البحثية في BCI",
      type: "research",
      language: "en",
      author: "IEEE",
      url: "https://ieeexplore.ieee.org/xpl/topAccessedArticles.jsp?punumber=7333",
      difficulty: "خبير",
      duration: "متغير",
      rating: 4.9,
      category: "academic"
    },
    {
      id: 11,
      title: "Coursera BCI Specialization",
      description: "تخصص جامعي في واجهات الدماغ والحاسوب",
      type: "course",
      language: "en",
      author: "University of California",
      url: "https://www.coursera.org/specializations/computational-neuroscience",
      difficulty: "متقدم",
      duration: "3-6 أشهر",
      rating: 4.6,
      category: "academic"
    },

    // Community Resources
    {
      id: 12,
      title: "Reddit BCI Community",
      description: "مجتمع نشط لمناقشة تقنيات BCI",
      type: "community",
      language: "en",
      author: "Reddit Community",
      url: "https://www.reddit.com/r/BCI",
      difficulty: "متنوع",
      duration: "متغير",
      rating: 4.2,
      category: "community"
    }
  ]

  const categories = [
    { id: 'all', label: 'جميع المصادر', count: resources.length },
    { id: 'basics', label: 'الأساسيات', count: resources.filter(r => r.category === 'basics').length },
    { id: 'programming', label: 'البرمجة', count: resources.filter(r => r.category === 'programming').length },
    { id: 'tools', label: 'الأدوات', count: resources.filter(r => r.category === 'tools').length },
    { id: 'medical', label: 'طبي', count: resources.filter(r => r.category === 'medical').length },
    { id: 'academic', label: 'أكاديمي', count: resources.filter(r => r.category === 'academic').length },
    { id: 'community', label: 'مجتمعات', count: resources.filter(r => r.category === 'community').length }
  ]

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return Youtube
      case 'article': return BookOpen
      case 'documentation': return BookOpen
      case 'tutorial': return Play
      case 'course': return BookOpen
      case 'software': return Code
      case 'research': return BookOpen
      case 'community': return Users
      default: return Globe
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800'
      case 'article': return 'bg-blue-100 text-blue-800'
      case 'documentation': return 'bg-green-100 text-green-800'
      case 'tutorial': return 'bg-purple-100 text-purple-800'
      case 'course': return 'bg-orange-100 text-orange-800'
      case 'software': return 'bg-gray-100 text-gray-800'
      case 'research': return 'bg-indigo-100 text-indigo-800'
      case 'community': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'مبتدئ': return 'bg-green-100 text-green-800'
      case 'متوسط': return 'bg-yellow-100 text-yellow-800'
      case 'متقدم': return 'bg-orange-100 text-orange-800'
      case 'خبير': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(r => r.category === selectedCategory)

  const featuredResources = resources.filter(r => r.featured)

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="gradient-text">مصادر التعلم</span> والمراجع
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          مجموعة شاملة من المصادر التعليمية باللغتين العربية والإنجليزية لتعلم واجهات الدماغ والحاسوب
        </p>
      </div>

      {/* Featured Expert */}
      <div className="mb-16">
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center">
                  <Users className="h-16 w-16 text-primary" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-right">
                <h3 className="text-2xl font-bold mb-2">{featuredExpert.name}</h3>
                <p className="text-primary font-semibold mb-3">{featuredExpert.title}</p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {featuredExpert.description}
                </p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  {featuredExpert.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary">{specialty}</Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{featuredExpert.stats.articles}</div>
                    <div className="text-sm text-muted-foreground">مقال</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{featuredExpert.stats.videos}</div>
                    <div className="text-sm text-muted-foreground">فيديو</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{featuredExpert.stats.subscribers}</div>
                    <div className="text-sm text-muted-foreground">متابع</div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <Button asChild>
                    <a href={featuredExpert.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="ml-2 h-4 w-4" />
                      زيارة الموقع
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={featuredExpert.youtube} target="_blank" rel="noopener noreferrer">
                      <Youtube className="ml-2 h-4 w-4" />
                      قناة YouTube
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Resources */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-8 text-center">المصادر المميزة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type)
            return (
              <Card key={resource.id} className="card-hover border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getTypeColor(resource.type)}>
                      <TypeIcon className="h-3 w-3 ml-1" />
                      {resource.type === 'video' ? 'فيديو' : 
                       resource.type === 'article' ? 'مقال' : 
                       resource.type === 'tutorial' ? 'درس' : resource.type}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm ml-1">{resource.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{resource.author}</span>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 ml-1" />
                      {resource.duration}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={getDifficultyColor(resource.difficulty)}>
                      {resource.difficulty}
                    </Badge>
                    <Badge variant="outline">
                      {resource.language === 'ar' ? '🇸🇦 عربي' : '🇺🇸 إنجليزي'}
                    </Badge>
                  </div>
                  
                  <Button asChild className="w-full">
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="ml-2 h-4 w-4" />
                      فتح المصدر
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* All Resources */}
      <div>
        <h3 className="text-2xl font-bold mb-8 text-center">جميع المصادر</h3>
        
        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid grid-cols-3 lg:grid-cols-7 w-full">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                {category.label}
                <Badge variant="secondary" className="mr-2 text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type)
            return (
              <Card key={resource.id} className="card-hover">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getTypeColor(resource.type)}>
                      <TypeIcon className="h-3 w-3 ml-1" />
                      {resource.type === 'video' ? 'فيديو' : 
                       resource.type === 'article' ? 'مقال' : 
                       resource.type === 'documentation' ? 'توثيق' :
                       resource.type === 'tutorial' ? 'درس' :
                       resource.type === 'course' ? 'دورة' :
                       resource.type === 'software' ? 'برنامج' :
                       resource.type === 'research' ? 'بحث' :
                       resource.type === 'community' ? 'مجتمع' : resource.type}
                    </Badge>
                    {resource.rating && (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm ml-1">{resource.rating}</span>
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="truncate">{resource.author}</span>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 ml-1" />
                      {resource.duration}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={getDifficultyColor(resource.difficulty)}>
                      {resource.difficulty}
                    </Badge>
                    <Badge variant="outline">
                      {resource.language === 'ar' ? '🇸🇦 عربي' : '🇺🇸 إنجليزي'}
                    </Badge>
                  </div>
                  
                  <Button asChild className="w-full" size="sm">
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="ml-2 h-4 w-4" />
                      فتح المصدر
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <Card className="bg-muted/50">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">هل تريد إضافة مصدر جديد؟</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              إذا كان لديك مصدر تعليمي مفيد تريد مشاركته مع المجتمع، نحن نرحب بمساهماتك
            </p>
            <Button variant="outline">
              <Users className="ml-2 h-5 w-5" />
              اقتراح مصدر جديد
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Resources

