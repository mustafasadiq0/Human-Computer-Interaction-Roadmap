// الاختبار التفاعلي لتحديد المسار المناسب في BCI

class BCIPathQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.questions = [
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
        ];
        
        this.paths = {
            hobby: {
                name: "المسار الاستكشافي (الهاوي)",
                description: "مناسب للمهتمين بالتعلم الشخصي والاستكشاف",
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
        };
    }

    init() {
        this.createQuizHTML();
        this.showQuestion(0);
    }

    createQuizHTML() {
        const quizContainer = document.getElementById('bci-quiz');
        if (!quizContainer) {
            console.error('Quiz container not found');
            return;
        }

        quizContainer.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-header">
                    <h2>اختبار تحديد المسار المناسب في BCI</h2>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progress-fill"></div>
                    </div>
                    <p class="progress-text">السؤال <span id="current-q">1</span> من <span id="total-q">${this.questions.length}</span></p>
                </div>
                
                <div class="quiz-content">
                    <div class="question-container" id="question-container">
                        <!-- Questions will be inserted here -->
                    </div>
                    
                    <div class="quiz-navigation">
                        <button id="prev-btn" class="nav-btn" onclick="bciQuiz.previousQuestion()" disabled>السابق</button>
                        <button id="next-btn" class="nav-btn" onclick="bciQuiz.nextQuestion()" disabled>التالي</button>
                        <button id="finish-btn" class="nav-btn finish-btn" onclick="bciQuiz.finishQuiz()" style="display: none;">إنهاء الاختبار</button>
                    </div>
                </div>
                
                <div class="quiz-results" id="quiz-results" style="display: none;">
                    <!-- Results will be shown here -->
                </div>
            </div>
        `;
    }

    showQuestion(index) {
        if (index < 0 || index >= this.questions.length) return;

        this.currentQuestion = index;
        const question = this.questions[index];
        const container = document.getElementById('question-container');
        
        container.innerHTML = `
            <div class="question">
                <h3>${question.question}</h3>
                <div class="options">
                    ${question.options.map((option, i) => `
                        <label class="option-label">
                            <input type="radio" name="q${question.id}" value="${option.value}" 
                                   onchange="bciQuiz.selectAnswer(${index}, '${option.value}', ${JSON.stringify(option.weight).replace(/"/g, '&quot;')})">
                            <span class="option-text">${option.text}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;

        // Update progress
        const progress = ((index + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = progress + '%';
        document.getElementById('current-q').textContent = index + 1;
        document.getElementById('total-q').textContent = this.questions.length;

        // Update navigation buttons
        document.getElementById('prev-btn').disabled = index === 0;
        document.getElementById('next-btn').style.display = index === this.questions.length - 1 ? 'none' : 'inline-block';
        document.getElementById('finish-btn').style.display = index === this.questions.length - 1 ? 'inline-block' : 'none';

        // Restore previous answer if exists
        if (this.answers[index]) {
            const radio = document.querySelector(`input[value="${this.answers[index].value}"]`);
            if (radio) radio.checked = true;
            this.updateNavigationState();
        }
    }

    selectAnswer(questionIndex, value, weight) {
        this.answers[questionIndex] = { value, weight };
        this.updateNavigationState();
    }

    updateNavigationState() {
        const hasAnswer = this.answers[this.currentQuestion];
        const nextBtn = document.getElementById('next-btn');
        const finishBtn = document.getElementById('finish-btn');
        
        if (nextBtn) nextBtn.disabled = !hasAnswer;
        if (finishBtn) finishBtn.disabled = !hasAnswer;
    }

    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.showQuestion(this.currentQuestion + 1);
        }
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.showQuestion(this.currentQuestion - 1);
        }
    }

    finishQuiz() {
        if (this.answers.length !== this.questions.length) {
            alert('يرجى الإجابة على جميع الأسئلة');
            return;
        }

        const results = this.calculateResults();
        this.showResults(results);
    }

    calculateResults() {
        const scores = {
            hobby: 0,
            medical: 0,
            academic: 0,
            developer: 0,
            industrial: 0
        };

        // Calculate weighted scores
        this.answers.forEach(answer => {
            Object.keys(answer.weight).forEach(path => {
                scores[path] += answer.weight[path];
            });
        });

        // Find the highest scoring path
        const maxScore = Math.max(...Object.values(scores));
        const recommendedPath = Object.keys(scores).find(path => scores[path] === maxScore);

        // Calculate percentages
        const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
        const percentages = {};
        Object.keys(scores).forEach(path => {
            percentages[path] = totalScore > 0 ? Math.round((scores[path] / totalScore) * 100) : 0;
        });

        return {
            scores,
            percentages,
            recommendedPath,
            pathInfo: this.paths[recommendedPath]
        };
    }

    showResults(results) {
        document.querySelector('.quiz-content').style.display = 'none';
        const resultsContainer = document.getElementById('quiz-results');
        resultsContainer.style.display = 'block';

        resultsContainer.innerHTML = `
            <div class="results-container">
                <h2>نتائج الاختبار</h2>
                
                <div class="recommended-path">
                    <h3>المسار المُوصى به لك:</h3>
                    <div class="path-card recommended">
                        <h4>${results.pathInfo.name}</h4>
                        <p>${results.pathInfo.description}</p>
                        
                        <div class="path-details">
                            <div class="detail-item">
                                <strong>الإطار الزمني:</strong> ${results.pathInfo.timeframe}
                            </div>
                            <div class="detail-item">
                                <strong>الميزانية المتوقعة:</strong> ${results.pathInfo.budget}
                            </div>
                        </div>
                        
                        <div class="recommendations">
                            <h5>التوصيات:</h5>
                            <ul>
                                ${results.pathInfo.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="required-skills">
                            <h5>المهارات المطلوبة:</h5>
                            <div class="skills-tags">
                                ${results.pathInfo.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="all-scores">
                    <h3>توزيع النتائج على جميع المسارات:</h3>
                    <div class="scores-chart">
                        ${Object.keys(results.percentages).map(path => `
                            <div class="score-bar">
                                <div class="score-label">${this.paths[path].name}</div>
                                <div class="score-progress">
                                    <div class="score-fill" style="width: ${results.percentages[path]}%"></div>
                                    <span class="score-percentage">${results.percentages[path]}%</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="next-steps">
                    <h3>الخطوات التالية:</h3>
                    <div class="next-steps-content">
                        <p>بناءً على نتائج الاختبار، ننصحك بـ:</p>
                        <ol>
                            <li>استكشاف المحتوى التعليمي الخاص بمسارك المُوصى به</li>
                            <li>مراجعة قائمة الأدوات والمصادر المناسبة</li>
                            <li>البدء بالمشروع العملي المقترح</li>
                            <li>الانضمام للمجتمعات ذات الصلة</li>
                        </ol>
                    </div>
                </div>
                
                <div class="quiz-actions">
                    <button onclick="bciQuiz.restartQuiz()" class="action-btn">إعادة الاختبار</button>
                    <button onclick="bciQuiz.downloadResults()" class="action-btn">تحميل النتائج</button>
                    <button onclick="bciQuiz.shareResults()" class="action-btn">مشاركة النتائج</button>
                </div>
            </div>
        `;

        // Animate score bars
        setTimeout(() => {
            document.querySelectorAll('.score-fill').forEach(bar => {
                bar.style.transition = 'width 1s ease-in-out';
            });
        }, 100);
    }

    restartQuiz() {
        this.currentQuestion = 0;
        this.answers = [];
        document.querySelector('.quiz-content').style.display = 'block';
        document.getElementById('quiz-results').style.display = 'none';
        this.showQuestion(0);
    }

    downloadResults() {
        const results = this.calculateResults();
        const content = this.generateResultsText(results);
        
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'نتائج_اختبار_BCI.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    shareResults() {
        const results = this.calculateResults();
        const text = `أكملت اختبار تحديد المسار في BCI! المسار المُوصى به لي هو: ${results.pathInfo.name}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'نتائج اختبار BCI',
                text: text,
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            navigator.clipboard.writeText(text + '\n' + window.location.href)
                .then(() => alert('تم نسخ النتائج إلى الحافظة!'))
                .catch(() => alert('لا يمكن مشاركة النتائج تلقائياً. يرجى نسخ الرابط يدوياً.'));
        }
    }

    generateResultsText(results) {
        return `
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
    `- ${this.paths[path].name}: ${results.percentages[path]}%`
).join('\n')}

تاريخ الاختبار: ${new Date().toLocaleDateString('ar-SA')}
        `.trim();
    }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.bciQuiz = new BCIPathQuiz();
});

// CSS styles for the quiz
const quizStyles = `
<style>
.quiz-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    direction: rtl;
}

.quiz-header {
    text-align: center;
    margin-bottom: 30px;
}

.quiz-header h2 {
    color: #2c3e50;
    margin-bottom: 20px;
}

.progress-bar {
    width: 100%;
    height: 10px;
    background-color: #ecf0f1;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 10px;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3498db, #2ecc71);
    transition: width 0.3s ease;
    width: 0%;
}

.progress-text {
    color: #7f8c8d;
    font-size: 14px;
}

.question {
    margin-bottom: 30px;
}

.question h3 {
    color: #2c3e50;
    margin-bottom: 20px;
    font-size: 18px;
    line-height: 1.6;
}

.options {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.option-label {
    display: flex;
    align-items: center;
    padding: 15px;
    border: 2px solid #ecf0f1;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: white;
}

.option-label:hover {
    border-color: #3498db;
    background-color: #f8f9fa;
}

.option-label input[type="radio"] {
    margin-left: 12px;
    transform: scale(1.2);
}

.option-label input[type="radio"]:checked + .option-text {
    color: #2c3e50;
    font-weight: 600;
}

.option-label:has(input:checked) {
    border-color: #3498db;
    background-color: #e3f2fd;
}

.option-text {
    flex: 1;
    line-height: 1.5;
}

.quiz-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    gap: 15px;
}

.nav-btn {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.3s ease;
    min-width: 100px;
}

.nav-btn:not(.finish-btn) {
    background-color: #3498db;
    color: white;
}

.nav-btn:not(.finish-btn):hover:not(:disabled) {
    background-color: #2980b9;
}

.nav-btn:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
}

.finish-btn {
    background-color: #27ae60;
    color: white;
}

.finish-btn:hover:not(:disabled) {
    background-color: #229954;
}

.results-container {
    padding: 20px 0;
}

.results-container h2 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 30px;
}

.recommended-path {
    margin-bottom: 40px;
}

.recommended-path h3 {
    color: #27ae60;
    margin-bottom: 20px;
    text-align: center;
}

.path-card {
    border: 2px solid #27ae60;
    border-radius: 12px;
    padding: 25px;
    background: linear-gradient(135deg, #f8fff8 0%, #e8f5e8 100%);
}

.path-card h4 {
    color: #27ae60;
    margin-bottom: 10px;
    font-size: 20px;
}

.path-card p {
    color: #2c3e50;
    margin-bottom: 20px;
    line-height: 1.6;
}

.path-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-bottom: 20px;
}

.detail-item {
    padding: 10px;
    background: white;
    border-radius: 6px;
    border-right: 4px solid #27ae60;
}

.recommendations {
    margin-bottom: 20px;
}

.recommendations h5 {
    color: #2c3e50;
    margin-bottom: 10px;
}

.recommendations ul {
    list-style: none;
    padding: 0;
}

.recommendations li {
    padding: 8px 0;
    border-bottom: 1px solid #ecf0f1;
    position: relative;
    padding-right: 20px;
}

.recommendations li:before {
    content: "✓";
    color: #27ae60;
    font-weight: bold;
    position: absolute;
    right: 0;
}

.required-skills h5 {
    color: #2c3e50;
    margin-bottom: 10px;
}

.skills-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.skill-tag {
    background-color: #3498db;
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
}

.all-scores {
    margin-bottom: 30px;
}

.all-scores h3 {
    color: #2c3e50;
    margin-bottom: 20px;
    text-align: center;
}

.scores-chart {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.score-bar {
    display: flex;
    align-items: center;
    gap: 15px;
}

.score-label {
    min-width: 200px;
    font-weight: 600;
    color: #2c3e50;
}

.score-progress {
    flex: 1;
    height: 30px;
    background-color: #ecf0f1;
    border-radius: 15px;
    position: relative;
    overflow: hidden;
}

.score-fill {
    height: 100%;
    background: linear-gradient(90deg, #3498db, #2ecc71);
    border-radius: 15px;
    transition: width 1s ease-in-out;
}

.score-percentage {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-weight: 600;
    color: #2c3e50;
    font-size: 14px;
}

.next-steps {
    margin-bottom: 30px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border-right: 4px solid #3498db;
}

.next-steps h3 {
    color: #2c3e50;
    margin-bottom: 15px;
}

.next-steps-content p {
    margin-bottom: 15px;
    line-height: 1.6;
}

.next-steps-content ol {
    padding-right: 20px;
}

.next-steps-content li {
    margin-bottom: 8px;
    line-height: 1.5;
}

.quiz-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
}

.action-btn {
    padding: 12px 20px;
    border: 2px solid #3498db;
    border-radius: 6px;
    background-color: white;
    color: #3498db;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s ease;
}

.action-btn:hover {
    background-color: #3498db;
    color: white;
}

@media (max-width: 768px) {
    .quiz-container {
        padding: 15px;
    }
    
    .path-details {
        grid-template-columns: 1fr;
    }
    
    .score-bar {
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
    }
    
    .score-label {
        min-width: auto;
        text-align: center;
    }
    
    .quiz-actions {
        flex-direction: column;
    }
    
    .action-btn {
        width: 100%;
    }
}
</style>
`;

// Add styles to document head
document.head.insertAdjacentHTML('beforeend', quizStyles);

