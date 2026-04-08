# المشروع العملي: تحريك مؤشر الفأرة بإشارات الدماغ

## نظرة عامة على المشروع

هذا المشروع العملي مصمم لتعليم المبتدئين كيفية بناء نظام BCI بسيط للتحكم في مؤشر الفأرة باستخدام إشارات الدماغ. سنستخدم جهاز EEG بسيط وخوارزميات معالجة إشارات أساسية لتحقيق هذا الهدف.

### أهداف المشروع

1. **التعلم العملي:** فهم كيفية عمل أنظمة BCI من خلال التطبيق العملي
2. **اكتساب المهارات:** تعلم أساسيات معالجة إشارات EEG والبرمجة
3. **بناء الثقة:** إنجاز مشروع عملي يعمل بالفعل
4. **الإعداد للمشاريع المتقدمة:** وضع الأساس لمشاريع أكثر تعقيداً

### المتطلبات والأدوات

#### الأجهزة المطلوبة

**جهاز EEG:**
- NeuroSky MindWave Mobile 2 (الخيار الأفضل للمبتدئين)
- أو OpenBCI Ganglion (للمستخدمين المتقدمين)
- أو Emotiv Insight (خيار متوسط)

**الحاسوب:**
- نظام تشغيل Windows 10/11 أو macOS أو Linux
- ذاكرة وصول عشوائي 8 جيجابايت على الأقل
- معالج Intel i5 أو AMD Ryzen 5 أو أفضل
- منفذ USB متاح للاتصال

#### البرمجيات المطلوبة

**Python وحزمه:**
```bash
# تثبيت Python 3.8 أو أحدث
pip install numpy scipy matplotlib
pip install scikit-learn pandas
pip install pyserial bluetooth-python
pip install pygame  # للتحكم في المؤشر
```

**برمجيات إضافية:**
- NeuroSky Developer Tools (إذا كنت تستخدم MindWave)
- OpenBCI GUI (إذا كنت تستخدم OpenBCI)
- محرر نصوص مثل VS Code أو PyCharm

## المرحلة الأولى: الإعداد والتجهيز

### تثبيت الجهاز

#### إعداد NeuroSky MindWave Mobile 2

1. **فتح العبوة والتجميع:**
   - أخرج الجهاز من العبوة بحذر
   - تأكد من وجود جميع المكونات: الجهاز الرئيسي، قطب الأذن، قطب الجبهة
   - اشحن الجهاز باستخدام كابل USB المرفق

2. **تثبيت البرمجيات:**
   ```bash
   # تحميل وتثبيت NeuroSky Developer Tools
   # من الموقع الرسمي: http://developer.neurosky.com/
   
   # تثبيت مكتبة Python للتواصل مع الجهاز
   pip install NeuroPy
   ```

3. **اختبار الاتصال:**
   ```python
   from NeuroPy import NeuroPy
   import time
   
   # إنشاء كائن للاتصال مع الجهاز
   neuropy = NeuroPy("/dev/rfcomm0")  # Linux/Mac
   # أو neuropy = NeuroPy("COM3")  # Windows
   
   # بدء الاتصال
   neuropy.start()
   
   # اختبار لمدة 10 ثوان
   for i in range(100):
       if neuropy.attention > 0:
           print(f"مستوى التركيز: {neuropy.attention}")
       time.sleep(0.1)
   
   neuropy.stop()
   ```

### إعداد بيئة التطوير

#### إنشاء مجلد المشروع

```bash
mkdir bci_mouse_control
cd bci_mouse_control

# إنشاء الملفات الأساسية
touch main.py
touch signal_processing.py
touch mouse_control.py
touch config.py
```

#### هيكل المشروع

```
bci_mouse_control/
├── main.py                 # الملف الرئيسي
├── signal_processing.py    # معالجة الإشارات
├── mouse_control.py        # التحكم في المؤشر
├── config.py              # الإعدادات
├── data/                  # مجلد البيانات
│   ├── training/          # بيانات التدريب
│   └── models/            # النماذج المدربة
└── logs/                  # ملفات السجل
```

## المرحلة الثانية: جمع وتحليل البيانات

### فهم إشارات EEG

#### أنواع موجات الدماغ

**موجات ألفا (Alpha Waves) - 8-12 Hz:**
- تظهر عند الاسترخاء مع إغلاق العينين
- مؤشر على حالة هدوء ويقظة
- مفيدة لكشف حالة الاسترخاء

**موجات بيتا (Beta Waves) - 13-30 Hz:**
- تظهر أثناء التركيز والنشاط العقلي
- مرتبطة بالتفكير النشط وحل المشاكل
- مفيدة لكشف حالة التركيز

**موجات ثيتا (Theta Waves) - 4-7 Hz:**
- تظهر أثناء النوم الخفيف والتأمل العميق
- مرتبطة بالإبداع والذاكرة
- أقل استخداماً في التطبيقات البسيطة

### برمجة جمع البيانات

#### ملف signal_processing.py

```python
import numpy as np
from scipy import signal
from scipy.fft import fft, fftfreq
import matplotlib.pyplot as plt
from collections import deque
import time

class EEGProcessor:
    def __init__(self, sampling_rate=512):
        self.sampling_rate = sampling_rate
        self.buffer_size = sampling_rate * 2  # بيانات ثانيتين
        self.raw_buffer = deque(maxlen=self.buffer_size)
        self.filtered_buffer = deque(maxlen=self.buffer_size)
        
        # تصميم المرشحات
        self.setup_filters()
        
    def setup_filters(self):
        """إعداد المرشحات لتنظيف الإشارة"""
        # مرشح تمرير نطاق للترددات المفيدة (1-50 Hz)
        self.bandpass_filter = signal.butter(
            4, [1, 50], 
            btype='band', 
            fs=self.sampling_rate
        )
        
        # مرشح لإزالة تداخل التيار الكهربائي (50/60 Hz)
        self.notch_filter = signal.butter(
            4, [49, 51], 
            btype='bandstop', 
            fs=self.sampling_rate
        )
    
    def add_sample(self, sample):
        """إضافة عينة جديدة للمعالجة"""
        self.raw_buffer.append(sample)
        
        # تطبيق المرشحات إذا كان لدينا بيانات كافية
        if len(self.raw_buffer) >= 100:
            # تطبيق مرشح تمرير النطاق
            filtered = signal.filtfilt(
                *self.bandpass_filter, 
                list(self.raw_buffer)[-100:]
            )
            
            # تطبيق مرشح إزالة التداخل
            filtered = signal.filtfilt(
                *self.notch_filter, 
                filtered
            )
            
            self.filtered_buffer.extend(filtered)
    
    def extract_features(self):
        """استخلاص الميزات من الإشارة"""
        if len(self.filtered_buffer) < self.sampling_rate:
            return None
        
        # أخذ آخر ثانية من البيانات
        data = np.array(list(self.filtered_buffer)[-self.sampling_rate:])
        
        # حساب الطيف الترددي
        freqs = fftfreq(len(data), 1/self.sampling_rate)
        fft_vals = np.abs(fft(data))
        
        # استخلاص قوة النطاقات المختلفة
        features = {}
        
        # نطاق ألفا (8-12 Hz)
        alpha_mask = (freqs >= 8) & (freqs <= 12)
        features['alpha_power'] = np.mean(fft_vals[alpha_mask])
        
        # نطاق بيتا (13-30 Hz)
        beta_mask = (freqs >= 13) & (freqs <= 30)
        features['beta_power'] = np.mean(fft_vals[beta_mask])
        
        # نطاق ثيتا (4-7 Hz)
        theta_mask = (freqs >= 4) & (freqs <= 7)
        features['theta_power'] = np.mean(fft_vals[theta_mask])
        
        # نسبة بيتا/ألفا (مؤشر التركيز)
        if features['alpha_power'] > 0:
            features['focus_ratio'] = features['beta_power'] / features['alpha_power']
        else:
            features['focus_ratio'] = 0
        
        # نسبة ألفا/ثيتا (مؤشر الاسترخاء)
        if features['theta_power'] > 0:
            features['relaxation_ratio'] = features['alpha_power'] / features['theta_power']
        else:
            features['relaxation_ratio'] = 0
        
        return features
    
    def detect_mental_state(self, features):
        """كشف الحالة العقلية بناءً على الميزات"""
        if features is None:
            return "غير محدد"
        
        focus_threshold = 1.5
        relaxation_threshold = 2.0
        
        if features['focus_ratio'] > focus_threshold:
            return "تركيز"
        elif features['relaxation_ratio'] > relaxation_threshold:
            return "استرخاء"
        else:
            return "طبيعي"
```

### تجميع بيانات التدريب

#### ملف data_collection.py

```python
import json
import time
from datetime import datetime
from signal_processing import EEGProcessor
from NeuroPy import NeuroPy

class DataCollector:
    def __init__(self, device_port):
        self.neuropy = NeuroPy(device_port)
        self.processor = EEGProcessor()
        self.training_data = []
        
    def collect_training_session(self, state_label, duration=60):
        """جمع بيانات تدريب لحالة معينة"""
        print(f"بدء جمع بيانات لحالة: {state_label}")
        print(f"المدة: {duration} ثانية")
        print("اضغط Enter للبدء...")
        input()
        
        self.neuropy.start()
        start_time = time.time()
        
        while time.time() - start_time < duration:
            if self.neuropy.rawValue != 0:
                self.processor.add_sample(self.neuropy.rawValue)
                
                # استخلاص الميزات كل ثانية
                if int(time.time() - start_time) % 1 == 0:
                    features = self.processor.extract_features()
                    if features:
                        features['label'] = state_label
                        features['timestamp'] = datetime.now().isoformat()
                        self.training_data.append(features)
                        
                        remaining = duration - (time.time() - start_time)
                        print(f"الوقت المتبقي: {remaining:.1f} ثانية")
            
            time.sleep(0.01)
        
        self.neuropy.stop()
        print(f"انتهى جمع البيانات لحالة: {state_label}")
    
    def save_training_data(self, filename):
        """حفظ بيانات التدريب"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.training_data, f, ensure_ascii=False, indent=2)
        print(f"تم حفظ البيانات في: {filename}")

# مثال على الاستخدام
if __name__ == "__main__":
    collector = DataCollector("COM3")  # غير المنفذ حسب نظامك
    
    # جمع بيانات للحالات المختلفة
    collector.collect_training_session("تركيز", 60)
    collector.collect_training_session("استرخاء", 60)
    collector.collect_training_session("طبيعي", 60)
    
    # حفظ البيانات
    collector.save_training_data("data/training/training_data.json")
```

## المرحلة الثالثة: تدريب النموذج

### إعداد نموذج التعلم الآلي

#### ملف model_training.py

```python
import json
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler
import joblib

class BCIModelTrainer:
    def __init__(self):
        self.scaler = StandardScaler()
        self.model = None
        self.feature_names = [
            'alpha_power', 'beta_power', 'theta_power',
            'focus_ratio', 'relaxation_ratio'
        ]
    
    def load_training_data(self, filename):
        """تحميل بيانات التدريب"""
        with open(filename, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # تحويل البيانات إلى DataFrame
        df = pd.DataFrame(data)
        
        # استخلاص الميزات والتصنيفات
        X = df[self.feature_names].values
        y = df['label'].values
        
        return X, y
    
    def train_model(self, X, y, model_type='random_forest'):
        """تدريب النموذج"""
        # تقسيم البيانات
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        # تطبيع البيانات
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # اختيار النموذج
        if model_type == 'random_forest':
            self.model = RandomForestClassifier(
                n_estimators=100,
                random_state=42,
                max_depth=10
            )
        elif model_type == 'svm':
            self.model = SVC(
                kernel='rbf',
                C=1.0,
                gamma='scale',
                probability=True
            )
        
        # تدريب النموذج
        self.model.fit(X_train_scaled, y_train)
        
        # تقييم الأداء
        y_pred = self.model.predict(X_test_scaled)
        accuracy = accuracy_score(y_test, y_pred)
        
        print(f"دقة النموذج: {accuracy:.2%}")
        print("\nتقرير التصنيف:")
        print(classification_report(y_test, y_pred))
        
        return accuracy
    
    def save_model(self, model_path, scaler_path):
        """حفظ النموذج المدرب"""
        joblib.dump(self.model, model_path)
        joblib.dump(self.scaler, scaler_path)
        print(f"تم حفظ النموذج في: {model_path}")
        print(f"تم حفظ المطبع في: {scaler_path}")
    
    def load_model(self, model_path, scaler_path):
        """تحميل النموذج المدرب"""
        self.model = joblib.load(model_path)
        self.scaler = joblib.load(scaler_path)
        print("تم تحميل النموذج بنجاح")
    
    def predict(self, features):
        """التنبؤ بالحالة العقلية"""
        if self.model is None:
            return None
        
        # تحويل الميزات إلى مصفوفة
        feature_array = np.array([
            features['alpha_power'],
            features['beta_power'],
            features['theta_power'],
            features['focus_ratio'],
            features['relaxation_ratio']
        ]).reshape(1, -1)
        
        # تطبيع البيانات
        feature_scaled = self.scaler.transform(feature_array)
        
        # التنبؤ
        prediction = self.model.predict(feature_scaled)[0]
        probability = self.model.predict_proba(feature_scaled)[0]
        
        return {
            'prediction': prediction,
            'confidence': np.max(probability)
        }

# مثال على الاستخدام
if __name__ == "__main__":
    trainer = BCIModelTrainer()
    
    # تحميل البيانات
    X, y = trainer.load_training_data("data/training/training_data.json")
    
    # تدريب النموذج
    accuracy = trainer.train_model(X, y, model_type='random_forest')
    
    # حفظ النموذج
    trainer.save_model(
        "data/models/bci_model.pkl",
        "data/models/scaler.pkl"
    )
```

## المرحلة الرابعة: التحكم في المؤشر

### برمجة التحكم في المؤشر

#### ملف mouse_control.py

```python
import pygame
import time
import threading
from queue import Queue

class MouseController:
    def __init__(self, screen_width=1920, screen_height=1080):
        pygame.init()
        self.screen_width = screen_width
        self.screen_height = screen_height
        
        # إعدادات التحكم
        self.movement_speed = 10
        self.click_threshold = 0.8  # عتبة الثقة للنقر
        self.movement_threshold = 0.6  # عتبة الثقة للحركة
        
        # حالة المؤشر
        self.mouse_x = screen_width // 2
        self.mouse_y = screen_height // 2
        
        # قائمة انتظار الأوامر
        self.command_queue = Queue()
        
        # خيط التحكم
        self.control_thread = None
        self.running = False
    
    def start_control(self):
        """بدء خيط التحكم في المؤشر"""
        self.running = True
        self.control_thread = threading.Thread(target=self._control_loop)
        self.control_thread.start()
    
    def stop_control(self):
        """إيقاف التحكم في المؤشر"""
        self.running = False
        if self.control_thread:
            self.control_thread.join()
    
    def add_command(self, mental_state, confidence):
        """إضافة أمر جديد لقائمة الانتظار"""
        self.command_queue.put({
            'state': mental_state,
            'confidence': confidence,
            'timestamp': time.time()
        })
    
    def _control_loop(self):
        """حلقة التحكم الرئيسية"""
        while self.running:
            try:
                # الحصول على أمر من القائمة
                command = self.command_queue.get(timeout=0.1)
                
                # تنفيذ الأمر بناءً على الحالة العقلية
                self._execute_command(command)
                
            except:
                # لا توجد أوامر في القائمة
                continue
    
    def _execute_command(self, command):
        """تنفيذ أمر التحكم"""
        state = command['state']
        confidence = command['confidence']
        
        if confidence < self.movement_threshold:
            return  # الثقة منخفضة جداً
        
        if state == "تركيز":
            if confidence > self.click_threshold:
                self._click_mouse()
            else:
                self._move_mouse_up()
                
        elif state == "استرخاء":
            self._move_mouse_down()
            
        elif state == "طبيعي":
            # لا حركة أو توقف
            pass
    
    def _move_mouse_up(self):
        """تحريك المؤشر للأعلى"""
        self.mouse_y = max(0, self.mouse_y - self.movement_speed)
        pygame.mouse.set_pos(self.mouse_x, self.mouse_y)
        print(f"تحريك المؤشر للأعلى: ({self.mouse_x}, {self.mouse_y})")
    
    def _move_mouse_down(self):
        """تحريك المؤشر للأسفل"""
        self.mouse_y = min(self.screen_height, self.mouse_y + self.movement_speed)
        pygame.mouse.set_pos(self.mouse_x, self.mouse_y)
        print(f"تحريك المؤشر للأسفل: ({self.mouse_x}, {self.mouse_y})")
    
    def _click_mouse(self):
        """النقر بالمؤشر"""
        pygame.event.post(pygame.event.Event(pygame.MOUSEBUTTONDOWN, 
                                           button=1, pos=(self.mouse_x, self.mouse_y)))
        pygame.event.post(pygame.event.Event(pygame.MOUSEBUTTONUP, 
                                           button=1, pos=(self.mouse_x, self.mouse_y)))
        print(f"نقر في الموضع: ({self.mouse_x}, {self.mouse_y})")

class AdvancedMouseController(MouseController):
    """تحكم متقدم في المؤشر مع حركة ثنائية الأبعاد"""
    
    def __init__(self, screen_width=1920, screen_height=1080):
        super().__init__(screen_width, screen_height)
        
        # إعدادات إضافية للتحكم المتقدم
        self.calibration_data = {}
        self.movement_history = []
        self.smoothing_factor = 0.3
    
    def calibrate_user(self):
        """معايرة النظام للمستخدم"""
        print("بدء عملية المعايرة...")
        print("سيتم طلب منك التفكير في اتجاهات مختلفة")
        
        directions = ["أعلى", "أسفل", "يسار", "يمين"]
        
        for direction in directions:
            print(f"فكر في الاتجاه: {direction}")
            print("اضغط Enter عندما تكون جاهزاً...")
            input()
            
            # جمع بيانات المعايرة لمدة 10 ثوان
            calibration_samples = []
            start_time = time.time()
            
            while time.time() - start_time < 10:
                # هنا يجب جمع البيانات من جهاز EEG
                # وإضافتها إلى calibration_samples
                time.sleep(0.1)
            
            self.calibration_data[direction] = calibration_samples
            print(f"تم جمع بيانات الاتجاه: {direction}")
        
        print("انتهت عملية المعايرة")
    
    def _execute_advanced_command(self, features):
        """تنفيذ أوامر متقدمة بناءً على الميزات المستخلصة"""
        # تحليل الميزات لتحديد الاتجاه المطلوب
        direction = self._analyze_direction(features)
        
        if direction:
            self._move_mouse_direction(direction)
    
    def _analyze_direction(self, features):
        """تحليل الميزات لتحديد الاتجاه"""
        # خوارزمية بسيطة لتحديد الاتجاه
        # يمكن تطويرها باستخدام التعلم الآلي
        
        if features['beta_power'] > features['alpha_power'] * 1.5:
            if features['focus_ratio'] > 2.0:
                return "أعلى"
            else:
                return "أسفل"
        elif features['alpha_power'] > features['beta_power'] * 1.2:
            if features['relaxation_ratio'] > 1.5:
                return "يسار"
            else:
                return "يمين"
        
        return None
    
    def _move_mouse_direction(self, direction):
        """تحريك المؤشر في اتجاه محدد"""
        movement_map = {
            "أعلى": (0, -self.movement_speed),
            "أسفل": (0, self.movement_speed),
            "يسار": (-self.movement_speed, 0),
            "يمين": (self.movement_speed, 0)
        }
        
        if direction in movement_map:
            dx, dy = movement_map[direction]
            
            # تطبيق التنعيم
            if self.movement_history:
                last_dx, last_dy = self.movement_history[-1]
                dx = dx * (1 - self.smoothing_factor) + last_dx * self.smoothing_factor
                dy = dy * (1 - self.smoothing_factor) + last_dy * self.smoothing_factor
            
            # تحديث الموضع
            self.mouse_x = max(0, min(self.screen_width, self.mouse_x + dx))
            self.mouse_y = max(0, min(self.screen_height, self.mouse_y + dy))
            
            # تحديث المؤشر
            pygame.mouse.set_pos(int(self.mouse_x), int(self.mouse_y))
            
            # حفظ الحركة في التاريخ
            self.movement_history.append((dx, dy))
            if len(self.movement_history) > 10:
                self.movement_history.pop(0)
            
            print(f"تحريك المؤشر {direction}: ({int(self.mouse_x)}, {int(self.mouse_y)})")
```

## المرحلة الخامسة: التطبيق الرئيسي

### دمج جميع المكونات

#### ملف main.py

```python
import time
import threading
from signal_processing import EEGProcessor
from model_training import BCIModelTrainer
from mouse_control import MouseController
from NeuroPy import NeuroPy
import json

class BCIMouseControl:
    def __init__(self, device_port, model_path, scaler_path):
        # إعداد المكونات
        self.neuropy = NeuroPy(device_port)
        self.processor = EEGProcessor()
        self.trainer = BCIModelTrainer()
        self.mouse_controller = MouseController()
        
        # تحميل النموذج المدرب
        self.trainer.load_model(model_path, scaler_path)
        
        # إعدادات التحكم
        self.running = False
        self.prediction_interval = 0.5  # التنبؤ كل نصف ثانية
        self.last_prediction_time = 0
        
        # إحصائيات
        self.stats = {
            'total_predictions': 0,
            'successful_commands': 0,
            'start_time': None
        }
    
    def start_system(self):
        """بدء تشغيل النظام"""
        print("بدء تشغيل نظام التحكم في المؤشر بالدماغ...")
        
        try:
            # بدء الاتصال مع جهاز EEG
            self.neuropy.start()
            print("تم الاتصال مع جهاز EEG")
            
            # بدء التحكم في المؤشر
            self.mouse_controller.start_control()
            print("تم بدء التحكم في المؤشر")
            
            # بدء الحلقة الرئيسية
            self.running = True
            self.stats['start_time'] = time.time()
            self._main_loop()
            
        except Exception as e:
            print(f"خطأ في بدء النظام: {e}")
            self.stop_system()
    
    def stop_system(self):
        """إيقاف النظام"""
        print("إيقاف النظام...")
        
        self.running = False
        
        # إيقاف المكونات
        if hasattr(self, 'neuropy'):
            self.neuropy.stop()
        
        if hasattr(self, 'mouse_controller'):
            self.mouse_controller.stop_control()
        
        # طباعة الإحصائيات
        self._print_stats()
        
        print("تم إيقاف النظام")
    
    def _main_loop(self):
        """الحلقة الرئيسية للنظام"""
        print("النظام جاهز! اضغط Ctrl+C للإيقاف")
        
        try:
            while self.running:
                current_time = time.time()
                
                # إضافة عينات جديدة
                if self.neuropy.rawValue != 0:
                    self.processor.add_sample(self.neuropy.rawValue)
                
                # التنبؤ والتحكم
                if current_time - self.last_prediction_time >= self.prediction_interval:
                    self._process_prediction()
                    self.last_prediction_time = current_time
                
                time.sleep(0.01)  # تأخير قصير لتجنب استهلاك المعالج
                
        except KeyboardInterrupt:
            print("\nتم إيقاف النظام بواسطة المستخدم")
        except Exception as e:
            print(f"خطأ في الحلقة الرئيسية: {e}")
        finally:
            self.stop_system()
    
    def _process_prediction(self):
        """معالجة التنبؤ والتحكم"""
        # استخلاص الميزات
        features = self.processor.extract_features()
        
        if features is None:
            return
        
        # التنبؤ بالحالة العقلية
        prediction_result = self.trainer.predict(features)
        
        if prediction_result is None:
            return
        
        mental_state = prediction_result['prediction']
        confidence = prediction_result['confidence']
        
        # تحديث الإحصائيات
        self.stats['total_predictions'] += 1
        
        # إرسال أمر للتحكم في المؤشر
        if confidence > 0.6:  # عتبة الثقة الدنيا
            self.mouse_controller.add_command(mental_state, confidence)
            self.stats['successful_commands'] += 1
            
            print(f"الحالة: {mental_state}, الثقة: {confidence:.2%}")
        else:
            print(f"ثقة منخفضة: {confidence:.2%}")
    
    def _print_stats(self):
        """طباعة إحصائيات الأداء"""
        if self.stats['start_time']:
            runtime = time.time() - self.stats['start_time']
            success_rate = (self.stats['successful_commands'] / 
                          max(1, self.stats['total_predictions'])) * 100
            
            print("\n=== إحصائيات الأداء ===")
            print(f"مدة التشغيل: {runtime:.1f} ثانية")
            print(f"إجمالي التنبؤات: {self.stats['total_predictions']}")
            print(f"الأوامر الناجحة: {self.stats['successful_commands']}")
            print(f"معدل النجاح: {success_rate:.1f}%")

def main():
    """الدالة الرئيسية"""
    # إعدادات النظام
    config = {
        'device_port': 'COM3',  # غير هذا حسب نظامك
        'model_path': 'data/models/bci_model.pkl',
        'scaler_path': 'data/models/scaler.pkl'
    }
    
    # إنشاء وتشغيل النظام
    bci_system = BCIMouseControl(
        config['device_port'],
        config['model_path'],
        config['scaler_path']
    )
    
    bci_system.start_system()

if __name__ == "__main__":
    main()
```

## المرحلة السادسة: التحسين والتطوير

### تحسين الأداء

#### تقليل زمن الاستجابة

```python
class OptimizedEEGProcessor(EEGProcessor):
    def __init__(self, sampling_rate=512):
        super().__init__(sampling_rate)
        
        # تحسينات الأداء
        self.feature_cache = {}
        self.cache_timeout = 0.1  # ثانية واحدة
        self.last_cache_time = 0
    
    def extract_features_optimized(self):
        """استخلاص الميزات مع التخزين المؤقت"""
        current_time = time.time()
        
        # استخدام الكاش إذا كان حديثاً
        if (current_time - self.last_cache_time < self.cache_timeout and 
            self.feature_cache):
            return self.feature_cache
        
        # حساب الميزات الجديدة
        features = self.extract_features()
        
        if features:
            self.feature_cache = features
            self.last_cache_time = current_time
        
        return features
```

#### تحسين دقة التصنيف

```python
class EnsembleClassifier:
    def __init__(self):
        self.models = []
        self.weights = []
    
    def add_model(self, model, weight=1.0):
        """إضافة نموذج للمجموعة"""
        self.models.append(model)
        self.weights.append(weight)
    
    def predict(self, features):
        """التنبؤ باستخدام مجموعة النماذج"""
        predictions = []
        confidences = []
        
        for model, weight in zip(self.models, self.weights):
            pred = model.predict(features)
            predictions.append(pred['prediction'])
            confidences.append(pred['confidence'] * weight)
        
        # اختيار التنبؤ الأكثر ثقة
        best_idx = np.argmax(confidences)
        
        return {
            'prediction': predictions[best_idx],
            'confidence': confidences[best_idx] / sum(self.weights)
        }
```

### إضافة ميزات متقدمة

#### واجهة مستخدم رسومية

```python
import tkinter as tk
from tkinter import ttk
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

class BCIControlGUI:
    def __init__(self, bci_system):
        self.bci_system = bci_system
        self.root = tk.Tk()
        self.root.title("نظام التحكم في المؤشر بالدماغ")
        self.root.geometry("800x600")
        
        self.setup_ui()
        
    def setup_ui(self):
        """إعداد واجهة المستخدم"""
        # إطار التحكم
        control_frame = ttk.Frame(self.root)
        control_frame.pack(pady=10)
        
        # أزرار التحكم
        self.start_button = ttk.Button(
            control_frame, 
            text="بدء النظام", 
            command=self.start_system
        )
        self.start_button.pack(side=tk.LEFT, padx=5)
        
        self.stop_button = ttk.Button(
            control_frame, 
            text="إيقاف النظام", 
            command=self.stop_system,
            state=tk.DISABLED
        )
        self.stop_button.pack(side=tk.LEFT, padx=5)
        
        # عرض الحالة
        status_frame = ttk.Frame(self.root)
        status_frame.pack(pady=10, fill=tk.X)
        
        ttk.Label(status_frame, text="الحالة الحالية:").pack()
        self.status_label = ttk.Label(
            status_frame, 
            text="غير متصل", 
            font=("Arial", 14, "bold")
        )
        self.status_label.pack()
        
        # رسم بياني للإشارات
        self.setup_signal_plot()
        
        # إحصائيات
        self.setup_stats_display()
    
    def setup_signal_plot(self):
        """إعداد الرسم البياني للإشارات"""
        plot_frame = ttk.Frame(self.root)
        plot_frame.pack(pady=10, fill=tk.BOTH, expand=True)
        
        self.fig, (self.ax1, self.ax2) = plt.subplots(2, 1, figsize=(8, 4))
        
        # رسم الإشارة الخام
        self.ax1.set_title("الإشارة الخام")
        self.ax1.set_ylabel("الجهد (μV)")
        
        # رسم الطيف الترددي
        self.ax2.set_title("الطيف الترددي")
        self.ax2.set_xlabel("التردد (Hz)")
        self.ax2.set_ylabel("القوة")
        
        self.canvas = FigureCanvasTkAgg(self.fig, plot_frame)
        self.canvas.get_tk_widget().pack(fill=tk.BOTH, expand=True)
    
    def setup_stats_display(self):
        """إعداد عرض الإحصائيات"""
        stats_frame = ttk.LabelFrame(self.root, text="الإحصائيات")
        stats_frame.pack(pady=10, fill=tk.X)
        
        self.stats_labels = {}
        stats_items = [
            ("إجمالي التنبؤات", "total_predictions"),
            ("الأوامر الناجحة", "successful_commands"),
            ("معدل النجاح", "success_rate"),
            ("مدة التشغيل", "runtime")
        ]
        
        for i, (label, key) in enumerate(stats_items):
            row = i // 2
            col = i % 2
            
            ttk.Label(stats_frame, text=f"{label}:").grid(
                row=row, column=col*2, sticky=tk.W, padx=5, pady=2
            )
            
            self.stats_labels[key] = ttk.Label(stats_frame, text="0")
            self.stats_labels[key].grid(
                row=row, column=col*2+1, sticky=tk.W, padx=5, pady=2
            )
    
    def start_system(self):
        """بدء النظام"""
        self.start_button.config(state=tk.DISABLED)
        self.stop_button.config(state=tk.NORMAL)
        self.status_label.config(text="يعمل", foreground="green")
        
        # بدء النظام في خيط منفصل
        threading.Thread(target=self.bci_system.start_system, daemon=True).start()
        
        # بدء تحديث الواجهة
        self.update_ui()
    
    def stop_system(self):
        """إيقاف النظام"""
        self.bci_system.stop_system()
        self.start_button.config(state=tk.NORMAL)
        self.stop_button.config(state=tk.DISABLED)
        self.status_label.config(text="متوقف", foreground="red")
    
    def update_ui(self):
        """تحديث واجهة المستخدم"""
        if self.bci_system.running:
            # تحديث الإحصائيات
            self.update_stats()
            
            # تحديث الرسوم البيانية
            self.update_plots()
            
            # جدولة التحديث التالي
            self.root.after(1000, self.update_ui)
    
    def update_stats(self):
        """تحديث الإحصائيات"""
        stats = self.bci_system.stats
        
        self.stats_labels['total_predictions'].config(
            text=str(stats['total_predictions'])
        )
        self.stats_labels['successful_commands'].config(
            text=str(stats['successful_commands'])
        )
        
        if stats['total_predictions'] > 0:
            success_rate = (stats['successful_commands'] / 
                          stats['total_predictions']) * 100
            self.stats_labels['success_rate'].config(
                text=f"{success_rate:.1f}%"
            )
        
        if stats['start_time']:
            runtime = time.time() - stats['start_time']
            self.stats_labels['runtime'].config(
                text=f"{runtime:.1f}s"
            )
    
    def update_plots(self):
        """تحديث الرسوم البيانية"""
        # الحصول على البيانات الحديثة
        if len(self.bci_system.processor.raw_buffer) > 100:
            raw_data = list(self.bci_system.processor.raw_buffer)[-100:]
            
            # رسم الإشارة الخام
            self.ax1.clear()
            self.ax1.plot(raw_data)
            self.ax1.set_title("الإشارة الخام")
            self.ax1.set_ylabel("الجهد (μV)")
            
            # رسم الطيف الترددي
            features = self.bci_system.processor.extract_features()
            if features:
                self.ax2.clear()
                bands = ['theta', 'alpha', 'beta']
                powers = [features[f'{band}_power'] for band in bands]
                self.ax2.bar(bands, powers)
                self.ax2.set_title("قوة النطاقات الترددية")
                self.ax2.set_ylabel("القوة")
            
            self.canvas.draw()
    
    def run(self):
        """تشغيل الواجهة"""
        self.root.mainloop()

# تشغيل الواجهة الرسومية
if __name__ == "__main__":
    # إعداد النظام
    bci_system = BCIMouseControl(
        'COM3',
        'data/models/bci_model.pkl',
        'data/models/scaler.pkl'
    )
    
    # إنشاء وتشغيل الواجهة
    gui = BCIControlGUI(bci_system)
    gui.run()
```

## الخلاصة والخطوات التالية

### ما تعلمناه

من خلال هذا المشروع العملي، تعلمنا:

1. **أساسيات BCI:** كيفية عمل واجهات الدماغ والحاسوب
2. **معالجة الإشارات:** تقنيات تنظيف وتحليل إشارات EEG
3. **التعلم الآلي:** استخدام خوارزميات التصنيف لفهم الحالات العقلية
4. **البرمجة العملية:** تطوير تطبيق متكامل للتحكم في المؤشر
5. **التحسين:** تقنيات تحسين الأداء والدقة

### التطوير المستقبلي

يمكن تطوير هذا المشروع في عدة اتجاهات:

**1. تحسين الدقة:**
- استخدام خوارزميات تعلم آلي أكثر تطوراً
- إضافة المزيد من الميزات المستخلصة من الإشارات
- تطبيق تقنيات التعلم العميق

**2. إضافة وظائف جديدة:**
- التحكم في لوحة المفاتيح
- التحكم في تطبيقات محددة
- إنشاء ألعاب تعتمد على BCI

**3. تحسين واجهة المستخدم:**
- إضافة المزيد من الإعدادات القابلة للتخصيص
- تحسين الرسوم البيانية والتصورات
- إضافة نظام تدريب تفاعلي

**4. التوافق مع أجهزة أخرى:**
- دعم المزيد من أجهزة EEG
- التكامل مع أجهزة الواقع الافتراضي
- دعم أنظمة تشغيل متعددة

هذا المشروع يمثل نقطة انطلاق ممتازة لاستكشاف عالم واجهات الدماغ والحاسوب، ويمكن أن يكون الأساس لمشاريع أكثر تعقيداً وإثارة في المستقبل.

