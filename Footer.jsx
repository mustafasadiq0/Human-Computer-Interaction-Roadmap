import React from 'react'
import { Brain, Mail, Globe, Youtube, Github, ExternalLink, Heart, ArrowUp } from 'lucide-react'
import { Button } from './ui/button'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quickLinks = [
    { label: 'ما هي BCI؟', href: '#about' },
    { label: 'اختبار المسار', href: '#quiz' },
    { label: 'المسارات التعليمية', href: '#paths' },
    { label: 'المصادر', href: '#resources' },
    { label: 'المشروع العملي', href: '#project' },
    { label: 'أسئلة شائعة', href: '#faq' }
  ]

  const resources = [
    { label: 'موقع د. مصطفى صادق', href: 'https://mustafasadiq0.wordpress.com', external: true },
    { label: 'قناة YouTube', href: 'https://youtube.com/mustafasadiq', external: true },
    { label: 'OpenBCI', href: 'https://openbci.com', external: true },
    { label: 'MNE-Python', href: 'https://mne.tools', external: true },
    { label: 'BCI2000', href: 'https://bci2000.org', external: true },
    { label: 'IEEE BCI Society', href: 'https://brain-computer-interfaces.org', external: true }
  ]

  const tools = [
    { label: 'NeuroSky', href: 'https://neurosky.com', external: true },
    { label: 'Emotiv', href: 'https://emotiv.com', external: true },
    { label: 'g.tec', href: 'https://gtec.at', external: true },
    { label: 'EEGLAB', href: 'https://eeglab.org', external: true },
    { label: 'FieldTrip', href: 'https://fieldtriptoolbox.org', external: true },
    { label: 'Brainstorm', href: 'https://neuroimage.usc.edu/brainstorm', external: true }
  ]

  const socialLinks = [
    { icon: Youtube, href: 'https://youtube.com/mustafasadiq', label: 'YouTube' },
    { icon: Globe, href: 'https://mustafasadiq0.wordpress.com', label: 'الموقع الشخصي' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Mail, href: 'mailto:info@bci-guide.com', label: 'البريد الإلكتروني' }
  ]

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <div className="relative">
                <Brain className="h-8 w-8 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping"></div>
              </div>
              <div>
                <h3 className="text-lg font-bold">واجهات الدماغ والحاسوب</h3>
                <p className="text-sm text-muted-foreground">ابدأ مسارك في عالم BCI</p>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              دليلك الشامل لتعلم تقنيات واجهات الدماغ والحاسوب باللغة العربية. 
              من الأساسيات إلى التطبيقات المتقدمة، نوفر لك كل ما تحتاجه لبدء رحلتك في هذا المجال المثير.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3 space-x-reverse">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-background rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">مصادر مفيدة</h4>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.href}
                    target={resource.external ? "_blank" : "_self"}
                    rel={resource.external ? "noopener noreferrer" : ""}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center"
                  >
                    {resource.label}
                    {resource.external && <ExternalLink className="h-3 w-3 mr-1" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold mb-4">أدوات وبرامج</h4>
            <ul className="space-y-2">
              {tools.map((tool, index) => (
                <li key={index}>
                  <a
                    href={tool.href}
                    target={tool.external ? "_blank" : "_self"}
                    rel={tool.external ? "noopener noreferrer" : ""}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center"
                  >
                    {tool.label}
                    {tool.external && <ExternalLink className="h-3 w-3 mr-1" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Featured Expert Section */}
        <div className="mt-12 pt-8 border-t">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-right mb-4 md:mb-0">
                <h4 className="font-semibold text-lg mb-2">المحتوى العربي المميز</h4>
                <p className="text-muted-foreground text-sm">
                  نفخر بتقديم محتوى عالي الجودة من د. مصطفى صادق، خبير الذكاء الاصطناعي والأمن السيبراني
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://mustafasadiq0.wordpress.com" target="_blank" rel="noopener noreferrer">
                    <Globe className="ml-2 h-4 w-4" />
                    زيارة الموقع
                  </a>
                </Button>
                <Button size="sm" asChild>
                  <a href="https://youtube.com/mustafasadiq" target="_blank" rel="noopener noreferrer">
                    <Youtube className="ml-2 h-4 w-4" />
                    قناة YouTube
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-right mb-4 md:mb-0">
            <p className="text-muted-foreground text-sm">
              © 2024 دليل واجهات الدماغ والحاسوب. جميع الحقوق محفوظة.
            </p>
            <p className="text-muted-foreground text-xs mt-1 flex items-center justify-center md:justify-start">
              صُنع بـ <Heart className="h-3 w-3 text-red-500 mx-1" /> للمجتمع العربي
            </p>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="text-xs text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">سياسة الخصوصية</a>
              <span className="mx-2">•</span>
              <a href="#" className="hover:text-primary transition-colors">شروط الاستخدام</a>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="flex items-center"
            >
              <ArrowUp className="h-4 w-4 ml-1" />
              العودة للأعلى
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 pt-8 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-background rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">50+</div>
              <div className="text-xs text-muted-foreground">مصدر تعليمي</div>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">5</div>
              <div className="text-xs text-muted-foreground">مسارات تعليمية</div>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">1</div>
              <div className="text-xs text-muted-foreground">مشروع عملي شامل</div>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">100%</div>
              <div className="text-xs text-muted-foreground">محتوى عربي</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

