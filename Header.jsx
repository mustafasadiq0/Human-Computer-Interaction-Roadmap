import React, { useState, useEffect } from 'react'
import { Brain, Menu, X, Home, Info, HelpCircle, BookOpen, Wrench, Users } from 'lucide-react'
import { Button } from './ui/button'

const Header = ({ scrollToSection, currentSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'about', label: 'ما هي BCI؟', icon: Info },
    { id: 'quiz', label: 'اختبار المسار', icon: HelpCircle },
    { id: 'paths', label: 'المسارات التعليمية', icon: BookOpen },
    { id: 'resources', label: 'المصادر', icon: Users },
    { id: 'project', label: 'المشروع العملي', icon: Wrench },
    { id: 'faq', label: 'أسئلة شائعة', icon: HelpCircle }
  ]

  const handleMenuClick = (sectionId) => {
    scrollToSection(sectionId)
    setIsMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="relative">
              <Brain className="h-8 w-8 text-primary brain-animation" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping"></div>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold gradient-text">
                واجهات الدماغ والحاسوب
              </h1>
              <p className="text-xs text-muted-foreground">
                ابدأ مسارك في عالم BCI
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 space-x-reverse">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentSection === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleMenuClick(item.id)}
                  className="flex items-center space-x-2 space-x-reverse text-sm"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-t shadow-lg">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Button
                      key={item.id}
                      variant={currentSection === item.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handleMenuClick(item.id)}
                      className="flex items-center justify-start space-x-3 space-x-reverse w-full text-right"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  )
                })}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

