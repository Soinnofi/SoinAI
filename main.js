// SoinAI v2.0 - Главный скрипт
class SoinAI {
    constructor() {
        console.log('🚀 SoinAI инициализирован');
        this.model = this.loadModel();
        this.filters = this.loadFilters();
        this.init();
    }
    
    loadModel() {
        try {
            const saved = localStorage.getItem('soinai_model');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.error('Ошибка загрузки модели:', e);
        }
        
        // Начальная модель
        return {
            dictionary: {
                'привет': ['Привет! Как дела?', 'Здравствуйте!', 'Приветствую!'],
                'как дела': ['Отлично! А у вас?', 'Хорошо, спасибо!', 'Нормально!'],
                'что ты': ['Я SoinAI - ИИ который учится на разговорах!', 'Я ваш помощник'],
                'помощь': ['Чем могу помочь?', 'Слушаю вас!'],
                'спасибо': ['Пожалуйста!', 'Всегда рад помочь!'],
                'пока': ['До свидания!', 'Удачи!', 'Пока!']
            },
            stats: {
                words: 0,
                responses: 0,
                dialogs: 0,
                created: new Date().toISOString()
            }
        };
    }
    
    loadFilters() {
        return {
            profanity: true,
            learning: true
        };
    }
    
    init() {
        console.log('🔄 Настройка интерфейса');
        this.setupEventListeners();
        this.updateStats();
        this.showWelcome();
    }
    
    setupEventListeners() {
        // Фильтры
        document.getElementById('filterProfanity').addEventListener('change', (e) => {
            this.filters.profanity = e.target.checked;
            this.saveModel();
        });
        
        document.getElementById('enableLearning').addEventListener('change', (e) => {
            this.filters.learning = e.target.checked;
            this.saveModel();
        });
        
        // Ввод сообщения по Enter
        document.getElementById('userInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Восстановление состояния фильтров
        document.getElementById('filterProfanity').checked = this.filters.profanity;
        document.getElementById('enableLearning').checked = this.filters.learning;
    }
    
    saveModel() {
        try {
            localStorage.setItem('soinai_model', JSON.stringify(this.model));
        } catch (e) {
            console.error('Ошибка сохранения:', e);
        }
    }
    
    filterText(text) {
        if (!this.filters.profanity) return text;
        
        const badWords = ['мат1', 'мат2', 'мат3'];
        let filtered = text;
        badWords.forEach(word => {
            filtered = filtered.replace(new RegExp(word, 'gi'), '***');
        });
        return filtered;
    }
    
    sendMessage() {
        const input = document.getElementById('userInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Очищаем поле
        input.value = '';
        
        // Добавляем сообщение пользователя
        this.addMessage(message, true);
        
        // Ответ ИИ
        setTimeout(() => {
            const response = this.getResponse(message);
            this.addMessage(response, false);
            
            // Обучение
            if (this.filters.learning) {
                this.learn(message, response);
            }
            
            // Обновляем статистику
            this.model.stats.dialogs++;
            this.updateStats();
            this.saveModel();
        }, 500);
    }
    
    quickMessage(message) {
        document.getElementById('userInput').value = message;
        this.sendMessage();
    }
    
    getResponse(input) {
        const cleanInput = input.toLowerCase();
        
        // Ищем в словаре
        for (const [word, responses] of Object.entries(this.model.dictionary)) {
            if (cleanInput.includes(word)) {
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
        
        // Ищем по словам
        const words = cleanInput.split(' ');
        for (const word of words) {
            if (word.length > 3 && this.model.dictionary[word]) {
                const responses = this.model.dictionary[word];
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
        
        // Общий ответ
        const general = [
            'Интересно! Расскажите больше.',
            'Понятно. Что вы об этом думаете?',
            'Хороший вопрос!',
            'Я еще учусь, но стараюсь помочь!'
        ];
        
        return general[Math.floor(Math.random() * general.length)];
    }
    
    learn(input, response) {
        const words = input.toLowerCase()
            .replace(/[^\w\sа-я]/gi, ' ')
            .split(' ')
            .filter(word => word.length > 2);
        
        if (words.length === 0) return;
        
        const mainWord = words[0];
        
        if (!this.model.dictionary[mainWord]) {
            this.model.dictionary[mainWord] = [];
        }
        
        // Добавляем ответ если его нет
        if (!this.model.dictionary[mainWord].includes(response)) {
            this.model.dictionary[mainWord].push(response);
            this.model.stats.words = Object.keys(this.model.dictionary).length;
            this.model.stats.responses++;
            
            this.showNotification(`✅ Выучено новое слово: "${mainWord}"`);
        }
    }
    
    addMessage(text, isUser) {
        const chat = document.getElementById('chatMessages');
        const message = document.createElement('div');
        message.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        message.textContent = text;
        chat.appendChild(message);
        chat.scrollTop = chat.scrollHeight;
    }
    
    showWelcome() {
        const messages = [
            "👋 Привет! Я SoinAI v2.0",
            "🧠 Я учусь на наших разговорах",
            "💾 Все данные хранятся в вашем браузере",
            "🚀 Начните общение!"
        ];
        
        const chat = document.getElementById('chatMessages');
        if (chat.children.length === 0) {
            messages.forEach((msg, i) => {
                setTimeout(() => {
                    this.addMessage(msg, false);
                }, i * 800);
            });
        }
    }
    
    updateStats() {
        document.getElementById('wordCount').textContent = this.model.stats.words || Object.keys(this.model.dictionary).length;
        document.getElementById('responseCount').textContent = this.model.stats.responses;
        document.getElementById('dialogCount').textContent = this.model.stats.dialogs;
    }
    
    exportData() {
        const data = {
            model: this.model,
            filters: this.filters,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `soinai_backup_${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('✅ Данные экспортированы!');
    }
    
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    this.model = data.model;
                    this.filters = data.filters;
                    this.saveModel();
                    this.updateStats();
                    this.showNotification('✅ Данные импортированы!');
                } catch (error) {
                    this.showNotification('❌ Ошибка импорта!');
                }
            };
            
            reader.readAsText(file);
        };
        
        input.click();
    }
    
    resetModel() {
        if (confirm('Сбросить все обучение?')) {
            localStorage.removeItem('soinai_model');
            this.model = this.loadModel();
            document.getElementById('chatMessages').innerHTML = '';
            this.showWelcome();
            this.updateStats();
            this.showNotification('🔄 Модель сброшена');
        }
    }
    
    generateAPICode() {
        const apiCode = `// SoinAI API v2.0
// Автономный ИИ для Chatbox
// Сгенерировано: ${new Date().toISOString()}

const SoinAI_API = {
    model: ${JSON.stringify(this.model, null, 2)},
    
    getResponse: function(input) {
        const cleanInput = input.toLowerCase();
        
        // Поиск в словаре
        for (const [word, responses] of Object.entries(this.model.dictionary)) {
            if (cleanInput.includes(word)) {
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
        
        return "Я еще учусь!";
    },
    
    chat: async function(message) {
        return {
            success: true,
            response: this.getResponse(message),
            timestamp: new Date().toISOString()
        };
    }
};

// Использование в браузере
if (typeof window !== 'undefined') {
    window.SoinAI = SoinAI_API;
}

// Пример:
// SoinAI.chat("Привет!").then(console.log);`;

        document.getElementById('apiCode').textContent = apiCode;
    }
    
    copyAPICode() {
        const code = document.getElementById('apiCode').textContent;
        navigator.clipboard.writeText(code).then(() => {
            this.showNotification('✅ API код скопирован!');
        });
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Запуск
document.addEventListener('DOMContentLoaded', () => {
    window.soinAI = new SoinAI();
});
