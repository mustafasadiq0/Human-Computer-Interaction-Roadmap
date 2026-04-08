import React from 'react'
import { ArrowDown, Brain, Zap, Target, Users } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

const Hero = ({ scrollToSection }) => {
  const features = [
    {
      icon: Brain,
      title: "تعلم الأساسيات",
      description: "فهم عميق لتقنيات واجهات الدماغ والحاسوب"
    },
    {
      icon: Target,
      title: "حدد مسارك",
      description: "اختبار تفاعلي لتحديد المسار المناسب لك"
    },
    {
      icon: Zap,
      title: "مشروع عملي",
      description: "تطبيق حقيقي للتحكم في المؤشر بالدماغ"
    },
    {
      icon: Users,
      title: "مصادر عربية",
      description: "محتوى تعليمي شامل باللغة العربية"
    }
  ]

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 hero-gradient opacity-10"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl floating-element"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl floating-element" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Brain className="h-20 w-20 text-primary brain-animation" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">ابدأ من هنا...</span>
              <br />
              <span className="text-foreground">مسارك في عالم</span>
              <br />
              <span className="text-primary">واجهات الدماغ - الحاسوب</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              اكتشف عالم تقنيات BCI المثير واختر المسار المناسب لك - سواء كنت طالباً، باحثاً، أو مطوراً عربياً يريد دخول هذا المجال المتقدم
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 hero-gradient text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105"
              onClick={() => scrollToSection('quiz')}
            >
              <Target className="ml-2 h-5 w-5" />
              ابدأ اختبار تحديد المسار
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              onClick={() => scrollToSection('about')}
            >
              <Brain className="ml-2 h-5 w-5" />
              تعرف على BCI
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="card-hover bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection('about')}
              className="animate-bounce"
            >
              <ArrowDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">50+</div>
              <div className="text-sm text-muted-foreground">مصدر تعليمي</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">5</div>
              <div className="text-sm text-muted-foreground">مسارات تعليمية</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">1</div>
              <div className="text-sm text-muted-foreground">مشروع عملي شامل</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">محتوى عربي</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

