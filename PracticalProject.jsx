import React, { useState } from 'react'
import { Code, Download, Play, CheckCircle, Circle, ExternalLink, Github, Youtube, FileText, Wrench, Zap, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const PracticalProject = () => {
  const [completedSteps, setCompletedSteps] = useState([])

  const projectInfo = {
    title: "تحكم في مؤشر الفأرة بإشارات الدماغ",
    description: "مشروع عملي شامل لبناء نظام BCI بسيط يمكنه تحريك مؤشر الفأرة باستخدام إشارات EEG",
    difficulty: "متوسط",
    duration: "2-4 أسابيع",
    skills: ["Python", "معالجة الإشارات", "OpenBCI", "Machine Learning"],
    requirements: {
      hardware: ["جهاز EEG (OpenBCI أو NeuroSky)", "كمبيوتر", "أقطاب كهربائية"],
      software: ["Python 3.8+", "NumPy", "SciPy", "Scikit-learn", "PyQt5", "OpenBCI GUI"],
      knowledge: ["أساسيات Python", "مفاهيم معالجة الإشارات", "أساسيات Machine Learning"]
    }
  }

  const phases = [
    {
      id: 1,
      title: "الإعداد والتحضير",
      description: "تجهيز البيئة والأدوات المطلوبة",
      duration: "2-3 أيام",
      steps: [
        {
          id: "1.1",
          title: "تثبيت Python والمكتبات المطلوبة",
          description: "تثبيت Python وجميع المكتبات اللازمة للمشروع",
          code: `pip install numpy scipy scikit-learn pyqt5 matplotlib pandas
pip install mne pylsl
pip install openbci-python`,
          completed: false
        },
        {
          id: "1.2",
          title: "إعداد جهاز EEG",
          description: "توصيل وتكوين جهاز EEG للحصول على البيانات",
          code: `# تكوين OpenBCI
from openbci import OpenBCICyton
board = OpenBCICyton(port='/dev/ttyUSB0')  # Linux
# board = OpenBCICyton(port='COM3')  # Windows`,
          completed: false
        },
        {
          id: "1.3",
          title: "اختبار الاتصال",
          description: "التأكد من عمل الجهاز وجودة الإشارات",
          code: `# اختبار بسيط للاتصال
board.start_stream()
print("تم بدء تدفق البيانات...")
board.stop_stream()`,
          completed: false
        }
      ]
    },
    {
      id: 2,
      title: "جمع وتحليل البيانات",
      description: "جمع إشارات EEG وتحليلها لفهم الأنماط",
      duration: "5-7 أيام",
      steps: [
        {
          id: "2.1",
          title: "جمع بيانات التدريب",
          description: "تسجيل إشارات الدماغ أثناء تخيل حركات مختلفة",
          code: `import numpy as np
import time

def collect_training_data(board, duration=60):
    """جمع بيانات التدريب لمدة محددة"""
    data = []
    board.start_stream(callback=lambda sample: data.append(sample))
    time.sleep(duration)
    board.stop_stream()
    return np.array(data)`,
          completed: false
        },
        {
          id: "2.2",
          title: "معالجة الإشارات",
          description: "تنظيف البيانات وإزالة الضوضاء",
          code: `from scipy import signal
from scipy.signal import butter, filtfilt

def preprocess_eeg(data, fs=250):
    """معالجة أولية لإشارات EEG"""
    # مرشح تمرير نطاق (8-30 Hz)
    nyquist = fs / 2
    low = 8 / nyquist
    high = 30 / nyquist
    b, a = butter(4, [low, high], btype='band')
    
    filtered_data = filtfilt(b, a, data, axis=0)
    return filtered_data`,
          completed: false
        },
        {
          id: "2.3",
          title: "استخلاص الميزات",
          description: "استخراج الميزات المهمة من الإشارات",
          code: `def extract_features(data, fs=250):
    """استخراج ميزات من إشارات EEG"""
    # حساب قوة الطيف في نطاقات مختلفة
    freqs, psd = signal.welch(data, fs, nperseg=fs*2)
    
    # نطاقات الترددات
    alpha_band = (8, 13)
    beta_band = (13, 30)
    
    # حساب القوة في كل نطاق
    alpha_power = np.mean(psd[(freqs >= alpha_band[0]) & (freqs <= alpha_band[1])])
    beta_power = np.mean(psd[(freqs >= beta_band[0]) & (freqs <= beta_band[1])])
    
    return [alpha_power, beta_power]`,
          completed: false
        }
      ]
    },
    {
      id: 3,
      title: "تدريب النموذج",
      description: "بناء وتدريب نموذج التعلم الآلي",
      duration: "3-5 أيام",
      steps: [
        {
          id: "3.1",
          title: "إعداد بيانات التدريب",
          description: "تنظيم البيانات وتقسيمها للتدريب والاختبار",
          code: `from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# تحضير البيانات
X = features_data  # الميزات المستخرجة
y = labels_data    # التصنيفات (يسار، يمين، توقف)

# تقسيم البيانات
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# تطبيع البيانات
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)`,
          completed: false
        },
        {
          id: "3.2",
          title: "تدريب المصنف",
          description: "استخدام خوارزمية التعلم الآلي لتصنيف الإشارات",
          code: `from sklearn.svm import SVM
from sklearn.metrics import accuracy_score

# إنشاء وتدريب النموذج
classifier = SVM(kernel='rbf', C=1.0)
classifier.fit(X_train_scaled, y_train)

# اختبار النموذج
y_pred = classifier.predict(X_test_scaled)
accuracy = accuracy_score(y_test, y_pred)
print(f"دقة النموذج: {accuracy:.2f}")`,
          completed: false
        },
        {
          id: "3.3",
          title: "تحسين الأداء",
          description: "ضبط معاملات النموذج لتحسين الدقة",
          code: `from sklearn.model_selection import GridSearchCV

# البحث عن أفضل معاملات
param_grid = {
    'C': [0.1, 1, 10, 100],
    'gamma': ['scale', 'auto', 0.001, 0.01, 0.1, 1]
}

grid_search = GridSearchCV(SVM(), param_grid, cv=5)
grid_search.fit(X_train_scaled, y_train)

best_classifier = grid_search.best_estimator_
print(f"أفضل معاملات: {grid_search.best_params_}")`,
          completed: false
        }
      ]
    },
    {
      id: 4,
      title: "التطبيق التفاعلي",
      description: "بناء واجهة للتحكم في المؤشر في الوقت الفعلي",
      duration: "5-7 أيام",
      steps: [
        {
          id: "4.1",
          title: "إنشاء واجهة المستخدم",
          description: "بناء واجهة بسيطة لعرض حالة النظام",
          code: `import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QWidget, QLabel, QPushButton
from PyQt5.QtCore import QTimer

class BCIControlApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("BCI Mouse Control")
        self.setGeometry(100, 100, 400, 300)
        
        # إعداد الواجهة
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)
        
        self.status_label = QLabel("جاهز للبدء")
        self.start_button = QPushButton("بدء التحكم")
        self.stop_button = QPushButton("إيقاف التحكم")
        
        layout.addWidget(self.status_label)
        layout.addWidget(self.start_button)
        layout.addWidget(self.stop_button)`,
          completed: false
        },
        {
          id: "4.2",
          title: "التحكم في المؤشر",
          description: "ربط تنبؤات النموذج بحركة المؤشر",
          code: `import pyautogui
import threading

class MouseController:
    def __init__(self, classifier, scaler):
        self.classifier = classifier
        self.scaler = scaler
        self.is_running = False
        
    def control_mouse(self, prediction):
        """تحريك المؤشر بناءً على التنبؤ"""
        if prediction == 'left':
            pyautogui.moveRel(-50, 0)
        elif prediction == 'right':
            pyautogui.moveRel(50, 0)
        elif prediction == 'up':
            pyautogui.moveRel(0, -50)
        elif prediction == 'down':
            pyautogui.moveRel(0, 50)`,
          completed: false
        },
        {
          id: "4.3",
          title: "التشغيل في الوقت الفعلي",
          description: "دمج جميع المكونات للعمل في الوقت الفعلي",
          code: `def real_time_control():
    """التحكم في الوقت الفعلي"""
    board = OpenBCICyton()
    controller = MouseController(classifier, scaler)
    
    def process_sample(sample):
        # معالجة العينة
        processed = preprocess_eeg(sample)
        features = extract_features(processed)
        features_scaled = scaler.transform([features])
        
        # التنبؤ
        prediction = classifier.predict(features_scaled)[0]
        
        # تحريك المؤشر
        controller.control_mouse(prediction)
    
    board.start_stream(callback=process_sample)`,
          completed: false
        }
      ]
    }
  ]

  const resources = [
    {
      title: "كود المشروع الكامل",
      description: "الكود المصدري الكامل للمشروع على GitHub",
      type: "github",
      url: "https://github.com/example/bci-mouse-control",
      icon: Github
    },
    {
      title: "شرح فيديو للمشروع",
      description: "فيديو تفصيلي يشرح كل خطوة في المشروع",
      type: "video",
      url: "https://youtube.com/watch?v=example",
      icon: Youtube
    },
    {
      title: "دليل التثبيت المفصل",
      description: "دليل شامل لتثبيت جميع المتطلبات",
      type: "documentation",
      url: "/docs/installation-guide.pdf",
      icon: FileText
    },
    {
      title: "قائمة الأجهزة المطلوبة",
      description: "قائمة مفصلة بجميع الأجهزة والمكونات",
      type: "hardware",
      url: "/docs/hardware-list.pdf",
      icon: Wrench
    }
  ]

  const toggleStepCompletion = (stepId) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    )
  }

  const getCompletionPercentage = () => {
    const totalSteps = phases.reduce((total, phase) => total + phase.steps.length, 0)
    return Math.round((completedSteps.length / totalSteps) * 100)
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <Target className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="gradient-text">المشروع العملي</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          تطبيق حقيقي لتعلم BCI من خلال بناء نظام للتحكم في مؤشر الفأرة بإشارات الدماغ
        </p>
      </div>

      {/* Project Overview */}
      <div className="mb-16">
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-2xl">{projectInfo.title}</CardTitle>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Badge className="bg-orange-100 text-orange-800">{projectInfo.difficulty}</Badge>
                <Badge variant="outline">{projectInfo.duration}</Badge>
              </div>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {projectInfo.description}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Wrench className="h-4 w-4 ml-2" />
                  الأجهزة المطلوبة
                </h4>
                <ul className="space-y-1 text-sm">
                  {projectInfo.requirements.hardware.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Circle className="h-2 w-2 text-primary ml-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Code className="h-4 w-4 ml-2" />
                  البرامج المطلوبة
                </h4>
                <ul className="space-y-1 text-sm">
                  {projectInfo.requirements.software.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Circle className="h-2 w-2 text-primary ml-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Zap className="h-4 w-4 ml-2" />
                  المعرفة المطلوبة
                </h4>
                <ul className="space-y-1 text-sm">
                  {projectInfo.requirements.knowledge.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Circle className="h-2 w-2 text-primary ml-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-sm font-medium">المهارات المكتسبة:</span>
              {projectInfo.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">{skill}</Badge>
              ))}
            </div>
            
            {/* Progress */}
            <div className="bg-background/50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">تقدم المشروع</span>
                <span className="text-primary font-bold">{getCompletionPercentage()}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="progress-bar h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getCompletionPercentage()}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Phases */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-8 text-center">مراحل المشروع</h3>
        
        <Tabs defaultValue="1" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {phases.map((phase) => (
              <TabsTrigger key={phase.id} value={phase.id.toString()}>
                المرحلة {phase.id}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {phases.map((phase) => (
            <TabsContent key={phase.id} value={phase.id.toString()}>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <CardTitle className="text-xl">{phase.title}</CardTitle>
                      <p className="text-muted-foreground mt-2">{phase.description}</p>
                    </div>
                    <Badge variant="outline">{phase.duration}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {phase.steps.map((step) => (
                      <div key={step.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start space-x-3 space-x-reverse">
                            <button
                              onClick={() => toggleStepCompletion(step.id)}
                              className="mt-1"
                            >
                              {completedSteps.includes(step.id) ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <Circle className="h-5 w-5 text-muted-foreground" />
                              )}
                            </button>
                            <div>
                              <h4 className="font-semibold">{step.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {step.code && (
                          <div className="mt-4">
                            <div className="bg-muted/50 rounded-lg p-4 overflow-x-auto">
                              <pre className="text-sm">
                                <code>{step.code}</code>
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Resources */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-8 text-center">مصادر المشروع</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <Card key={index} className="card-hover">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2">{resource.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {resource.description}
                  </p>
                  <Button asChild size="sm" className="w-full">
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="ml-2 h-4 w-4" />
                      فتح
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">جاهز لبدء المشروع؟</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              ابدأ رحلتك في عالم BCI من خلال هذا المشروع العملي الشامل
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="hero-gradient text-white">
                <Download className="ml-2 h-5 w-5" />
                تحميل ملفات المشروع
              </Button>
              <Button variant="outline" size="lg">
                <Play className="ml-2 h-5 w-5" />
                مشاهدة الفيديو التوضيحي
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PracticalProject

