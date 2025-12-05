// =============================================
// SoinAI v2.0 - Самообучающийся ИИ
// Создает библиотеку запросов и словарь
// =============================================

class SoinAI {
    constructor() {
        console.log('🚀 Инициализация SoinAI v2.0...');
        this.version = '2.0.0';
        this.model = this.loadModel();
        this.filters = this.loadFilters();
        this.history = this.loadHistory();
        this.init();
    }
    
    // ==================== ЗАГРУЗКА ДАННЫХ ====================
    
    loadModel() {
        try {
            const saved = localStorage.getItem('soinai_v2_model');
            if (saved) {
                const data = JSON.parse(saved);
                console.log('📂 Загружена модель с', Object.keys(data.dictionary).length, 'словами');
                return data;
            }
        } catch (e) {
            console.error('Ошибка загрузки модели:', e);
        }
        
        // Начальная модель с расширенным словарем
        return {
            dictionary: {
                // Приветствия
                'привет': ['Привет! Как дела?', 'Здравствуйте! Рад вас видеть!', 'Приветствую!'],
                'здравствуй': ['Здравствуйте!', 'Привет!', 'Добрый день!'],
                'добрый день': ['Добрый день! Как я могу помочь?', 'Добрый день!'],
                'доброе утро': ['Доброе утро!', 'С добрым утром!'],
                'добрый вечер': ['Добрый вечер!', 'Доброго вечера!'],
                
                // Вопросы
                'как дела': ['Отлично! А у вас как?', 'Хорошо, спасибо!', 'Прекрасно!'],
                'как ты': ['Я в порядке, спасибо что спросили!', 'Все хорошо!'],
                'что делаешь': ['Общаюсь с вами и учусь новому!', 'Помогаю пользователям'],
                
                // О себе
                'кто ты': ['Я SoinAI - искусственный интеллект который учится на разговорах!', 'Я ваш помощник SoinAI'],
                'что ты': ['Я ИИ помощник', 'Я программа с искусственным интеллектом'],
                'что умеешь': [
                    'Я умею общаться, отвечать на вопросы и обучаться на наших диалогах!',
                    'Могу поддержать беседу на разные темы',
                    'Запоминаю наши разговоры и становлюсь умнее'
                ],
                'как тебя зовут': ['Меня зовут SoinAI!', 'Я SoinAI - ваш цифровой помощник'],
                
                // Помощь
                'помощь': ['Чем могу помочь? Задайте ваш вопрос.', 'Я здесь чтобы помочь вам!'],
                'помоги': ['Конечно! Что вам нужно?', 'С удовольствием помогу!'],
                'подскажи': ['Что подсказать?', 'Слушаю вас!'],
                
                // Вежливость
                'спасибо': ['Пожалуйста!', 'Всегда рад помочь!', 'Обращайтесь!'],
                'пожалуйста': ['Спасибо!', ':)'],
                'извини': ['Все в порядке!', 'Не беспокойтесь'],
                
                // Прощание
                'пока': ['До свидания!', 'Всего хорошего!', 'Удачи!', 'До встречи!'],
                'до свидания': ['До свидания!', 'Пока!'],
                'спокойной ночи': ['Спокойной ночи!', 'Добрых снов!'],
                
                // Время
                'сколько время': ['Сейчас ' + new Date().toLocaleTimeString('ru-RU')],
                'какое время': ['Время: ' + new Date().toLocaleTimeString('ru-RU')],
                'какая дата': ['Сегодня ' + new Date().toLocaleDateString('ru-RU', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })],
                'день недели': ['Сегодня ' + new Date().toLocaleDateString('ru-RU', { weekday: 'long' })],
                
                // Эмоции
                'хорошо': ['Отлично!', 'Рад это слышать!', 'Здорово!'],
                'плохо': ['Жаль это слышать...', 'Надеюсь станет лучше!', 'Сочувствую'],
                'устал': ['Отдохните!', 'Давайте сделаем перерыв', 'Постарайтесь расслабиться'],
                'весело': ['Здорово!', 'Рад за вас!', 'Отлично!'],
                
                // Темы
                'погода': ['Я пока не умею смотреть погоду, но скоро научусь!', 'Интересный вопрос!'],
                'новости': ['Я еще не умею читать новости, но учусь!'],
                'интернет': ['Интернет - это круто!', 'Люблю технологии'],
                'технологии': ['Технологии - это будущее!', 'ИИ развивается очень быстро'],
                'программирование': ['Программирование - это интересно!', 'Я сам написан на JavaScript'],
                'искусственный интеллект': ['ИИ - это я!', 'Искусственный интеллект меняет мир'],
                'обучение': ['Обучение - это важно!', 'Я постоянно учусь на разговорах'],
                'фильм': ['Любите фильмы?', 'Какой ваш любимый фильм?'],
                'музыка': ['Музыка - это здорово!', 'Какую музыку вы любите?'],
                'книга': ['Книги - это знания!', 'Что вы сейчас читаете?'],
                'спорт': ['Спорт - это здоровье!', 'Занимаетесь спортом?'],
                'еда': ['Еда - это вкусно!', 'Что любите кушать?'],
                'работа': ['Работа - это важно', 'Как дела на работе?'],
                'учеба': ['Учеба - это путь к знаниям!', 'Как успехи в учебе?'],
                'друзья': ['Друзья - это ценно!', 'Как поживают ваши друзья?'],
                'семья': ['Семья - это самое важное!', 'Как ваша семья?'],
                'мечта': ['Мечты сбываются!', 'О чем вы мечтаете?'],
                'цель': ['Цели помогают двигаться вперед!', 'Какие у вас цели?'],
                'будущее': ['Будущее создается сегодня!', 'Каким вы видите будущее?'],
                'прошлое': ['Прошлое - это опыт', 'Что интересного было в прошлом?'],
                'настоящее': ['Настоящее - это момент который нужно ценить!', 'Что хорошего сегодня?']
            },
            synonyms: {
                'привет': ['здравствуй', 'добрый день', 'доброе утро', 'приветствую', 'хай', 'салют'],
                'как дела': ['как жизнь', 'как ты', 'как настроение', 'как поживаешь'],
                'спасибо': ['благодарю', 'мерси', 'спс'],
                'пока': ['до свидания', 'прощай', 'увидимся', 'чао', 'бай'],
                'хорошо': ['отлично', 'прекрасно', 'замечательно', 'классно'],
                'плохо': ['ужасно', 'не очень', 'так себе', 'не важно']
            },
            patterns: {},
            learned: [],
            stats: {
                totalWords: 0,
                totalResponses: 0,
                totalDialogs: 0,
                lastLearning: null,
                creationDate: new Date().toISOString(),
                version: '2.0.0'
            }
        };
    }
    
    loadFilters() {
        const saved = localStorage.getItem('soinai_v2_filters') || '{}';
        try {
            return JSON.parse(saved);
        } catch {
            return {
                profanity: true,
                personal: true,
                learning: true,
                saveHistory: true,
                autoExpand: true
            };
        }
    }
    
    loadHistory() {
        try {
            return JSON.parse(localStorage.getItem('soinai_v2_history') || '[]');
        } catch {
            return [];
        }
    }
    
    saveAll() {
        localStorage.setItem('soinai_v2_model', JSON.stringify(this.model));
        localStorage.setItem('soinai_v2_filters', JSON.stringify(this.filters));
        localStorage.setItem('soinai_v2_history', JSON.stringify(this.history));
        console.log('💾 Все данные сохранены');
    }
    
    // ==================== ФИЛЬТРЫ ====================
    
    filterText(text) {
        if (!text || typeof text !== 'string') return '';
        
        let filtered = text;
        
        // Фильтр мата (русский и английский)
        if (this.filters.profanity) {
            const badWords = [
                // Русские
                'бля', 'хуй', 'пизд', 'еба', 'нах', 'сука', 'гондон', 'мудак',
                'долбоеб', 'пидор', 'говно', 'залупа', 'сучка',
                // Английские
                'fuck', 'shit', 'asshole', 'bitch', 'cunt', 'dick', 'pussy', 'bastard',
                'motherfucker', 'whore', 'slut', 'nigger', 'retard'
            ];
            
            badWords.forEach(word => {
                const regex = new RegExp(word, 'gi');
                filtered = filtered.replace(regex, '***');
            });
        }
        
        // Защита личных данных
        if (this.filters.personal) {
            // Email
            filtered = filtered.replace(
                /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/gi, 
                '[EMAIL]'
            );
            // Телефоны (российские форматы)
            filtered = filtered.replace(
                /(\+7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}/g, 
                '[ТЕЛЕФОН]'
            );
            // Номера карт
            filtered = filtered.replace(
                /\b\d{4}[\s\-]?\d{4}[\s\-]?\d{4}[\s\-]?\d{4}\b/g, 
                '[КАРТА]'
            );
            // Паспортные данные
            filtered = filtered.replace(
                /\b\d{4}\s?\d{6}\b/g, 
                '[ПАСПОРТ]'
            );
            // Адреса (упрощенно)
            filtered = filtered.replace(
                /\b(ул|улица|пр|проспект|д|дом|кв|квартира)[\.\s]?\s*[А-Яа-я\d\s]+/gi, 
                '[АДРЕС]'
            );
        }
        
        return filtered.trim();
    }
    
    // ==================== ОБУЧЕНИЕ ====================
    
    learnFromDialog(userInput, aiResponse) {
        if (!this.filters.learning) return;
        
        const cleanInput = this.prepareForLearning(userInput);
        if (!cleanInput || cleanInput.length < 2) return;
        
        console.log('🧠 Обучение на фразе:', cleanInput);
        
        // Разбиваем на слова
        const words = cleanInput.toLowerCase()
            .replace(/[^\w\sа-яА-ЯёЁ]/g, ' ')
            .split(' ')
            .filter(word => word.length > 1 && word.length < 20);
        
        if (words.length === 0) return;
        
        // Основное слово (самое длинное или первое существительное)
        let mainWord = words[0];
        for (const word of words) {
            if (word.length > mainWord.length && word.length > 3) {
                mainWord = word;
            }
        }
        
        // Добавляем в словарь
        if (!this.model.dictionary[mainWord]) {
            this.model.dictionary[mainWord] = [];
        }
        
        // Добавляем ответ если его еще нет
        if (!this.model.dictionary[mainWord].includes(aiResponse)) {
            this.model.dictionary[mainWord].push(aiResponse);
            
            // Ограничиваем количество ответов на слово
            if (this.model.dictionary[mainWord].length > 8) {
                this.model.dictionary[mainWord].shift();
            }
        }
        
        // Создаем паттерны для похожих фраз
        this.createPatterns(cleanInput, aiResponse);
        
        // Сохраняем в историю обучения
        this.model.learned.push({
            input: cleanInput,
            response: aiResponse,
            word: mainWord,
            timestamp: new Date().toISOString(),
            words: words
        });
        
        // Обновляем статистику
        this.model.stats.totalWords = Object.keys(this.model.dictionary).length;
        this.model.stats.totalResponses++;
        this.model.stats.lastLearning = new Date().toISOString();
        
        // Авторасширение словаря (создание синонимов)
        if (this.filters.autoExpand && words.length > 1) {
            this.expandDictionary(words, aiResponse);
        }
        
        // Сохраняем
        this.saveAll();
        this.updateStats();
        this.updateDictionaryDisplay();
        
        console.log('✅ Обучение завершено. Слов в словаре:', this.model.stats.totalWords);
    }
    
    prepareForLearning(text) {
        return text.toLowerCase()
            .replace(/[^\w\sа-яА-ЯёЁ\-]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }
    
    createPatterns(input, response) {
        const words = input.split(' ');
        if (words.length < 2) return;
        
        // Создаем паттерны для комбинаций слов
        for (let i = 0; i < words.length - 1; i++) {
            const pattern = words.slice(i, i + 2).join(' ');
            if (pattern.length > 3) {
                if (!this.model.patterns[pattern]) {
                    this.model.patterns[pattern] = [];
                }
                
                if (!this.model.patterns[pattern].includes(response)) {
                    this.model.patterns[pattern].push(response);
                }
            }
        }
    }
    
    expandDictionary(words, response) {
        // Находим похожие слова уже в словаре
        for (const word of words) {
            if (word.length < 3) continue;
            
            // Ищем похожие слова (простейший алгоритм)
            for (const dictWord of Object.keys(this.model.dictionary)) {
                if (this.areWordsSimilar(word, dictWord)) {
                    // Добавляем как синоним
                    if (!this.model.synonyms[dictWord]) {
                        this.model.synonyms[dictWord] = [];
                    }
                    
                    if (!this.model.synonyms[dictWord].includes(word)) {
                        this.model.synonyms[dictWord].push(word);
                    }
                    
                    // Копируем ответы к новому слову
                    if (!this.model.dictionary[word]) {
                        this.model.dictionary[word] = [...this.model.dictionary[dictWord]];
                    }
                }
            }
        }
    }
    
    areWordsSimilar(word1, word2) {
        // Простая проверка схожести слов
        if (Math.abs(word1.length - word2.length) > 2) return false;
        
        // Проверяем общие буквы
        const set1 = new Set(word1);
        const set2 = new Set(word2);
        let common = 0;
        
        for (const char of set1) {
            if (set2.has(char)) common++;
        }
        
        const similarity = common / Math.max(set1.size, set2.size);
        return similarity > 0.6;
    }
    
    // ==================== ПОИСК ОТВЕТА ====================
    
    findResponse(input) {
        if (!input || input.trim().length === 0) {
            return 'Пожалуйста, напишите что-нибудь!';
        }
        
        const cleanInput = this.prepareForLearning(input);
        const lowerInput = cleanInput.toLowerCase();
        
        console.log('🔍 Поиск ответа для:', lowerInput);
        
        // 1. Проверяем точные совпадения в словаре
        for (const [word, responses] of Object.entries(this.model.dictionary)) {
            if (lowerInput === word || lowerInput.includes(' ' + word + ' ')) {
                return this.chooseResponse(responses, 'точное совпадение: ' + word);
            }
        }
        
        // 2. Проверяем паттерны (словосочетания)
        for (const [pattern, responses] of Object.entries(this.model.patterns)) {
            if (lowerInput.includes(pattern)) {
                return this.chooseResponse(responses, 'паттерн: ' + pattern);
            }
        }
        
        // 3. Проверяем синонимы
        for (const [word, synonyms] of Object.entries(this.model.synonyms)) {
            for (const synonym of synonyms) {
                if (lowerInput.includes(synonym) && this.model.dictionary[word]) {
                    return this.chooseResponse(this.model.dictionary[word], 'синоним: ' + synonym);
                }
            }
        }
        
        // 4. Ищем по ключевым словам
        const keywords = lowerInput.split(' ')
            .filter(word => word.length > 2)
            .sort((a, b) => b.length - a.length); // Сначала длинные слова
        
        for (const keyword of keywords) {
            for (const [word, responses] of Object.entries(this.model.dictionary)) {
                if (word.includes(keyword) || keyword.includes(word)) {
                    return this.chooseResponse(responses, 'ключевое слово: ' + keyword);
                }
            }
        }
        
        // 5. Анализ контекста
        const contextResponse = this.contextAnalysis(lowerInput);
        if (contextResponse) {
            return contextResponse;
        }
        
        // 6. Общие ответы (если ничего не найдено)
        return this.getGeneralResponse(lowerInput);
    }
    
    chooseResponse(responses, reason = '') {
        if (!responses || responses.length === 0) {
            return this.getGeneralResponse('');
        }
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        console.log('✅ Найден ответ (' + reason + '):', response.substring(0, 50) + '...');
        return response;
    }
    
    contextAnalysis(input) {
        // Анализ вопроса
        if (input.includes('?')) {
            const questionWords = ['что', 'как', 'где', 'когда', 'почему', 'зачем', 'кто'];
            for (const word of questionWords) {
                if (input.includes(word)) {
                    return 'Интересный вопрос! Давайте подумаем вместе.';
                }
            }
        }
        
        // Анализ эмоций
        const positiveWords = ['рад', 'счастлив', 'хорошо', 'отлично', 'прекрасно', 'люблю', 'нравится'];
        const negativeWords = ['грустно', 'плохо', 'устал', 'устала', 'злой', 'злая', 'ненавижу'];
        
        for (const word of positiveWords) {
            if (input.includes(word)) {
                return 'Здорово! Рад это слышать!';
            }
        }
        
        for (const word of negativeWords) {
            if (input.includes(word)) {
                return 'Мне жаль это слышать... Надеюсь, все наладится!';
            }
        }
        
        return null;
    }
    
    getGeneralResponse(input) {
        const generalResponses = [
            'Интересно! Расскажите подробнее.',
            'Понятно. Что вы думаете об этом?',
            'Хороший вопрос! Давайте обсудим это.',
            'Я еще учусь, но стараюсь помочь!',
            'Можете рассказать больше об этом?',
            'Это любопытно! А что еще?',
            'Я запомню это и постараюсь стать умнее!',
            'Спасибо что делитесь со мной!',
            'Давайте поговорим об этом!',
            'Хм, интересная тема для разговора!'
        ];
        
        // Если есть вопросы
        if (input.includes('?')) {
            const questionResponses = [
                'Хороший вопрос! Давайте поищем ответ вместе.',
                'Интересный вопрос! Я постараюсь помочь.',
                'Давайте подумаем над этим вопросом.',
                'Вопрос требует размышления...'
            ];
            return questionResponses[Math.floor(Math.random() * questionResponses.length)];
        }
        
        return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }
    
    // ==================== ИНТЕРФЕЙС ====================
    
    init() {
        console.log('🔄 Инициализация интерфейса...');
        this.setupEventListeners();
        this.updateStats();
        this.updateDictionaryDisplay();
        this.showWelcomeMessage();
        this.updateFiltersUI();
        this.generateAPICode();
        console.log('✅ SoinAI v' + this.version + ' готов к работе!');
    }
    
    setupEventListeners() {
        const userInput = document.getElementById('userInput');
        const sendButton = document.querySelector('button[onclick="soinAI.sendMessage()"]');
        
        if (!userInput || !sendButton) {
            console.error('❌ Не найдены элементы интерфейса!');
            return;
        }
        
        // Отправка по Enter (но Shift+Enter для новой строки)
        userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Авторазмер textarea
        userInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 150) + 'px';
        });
        
        // Фильтры
        document.getElementById('filterProfanity').addEventListener('change', (e) => {
            this.filters.profanity = e.target.checked;
            this.saveAll();
        });
        
        document.getElementById('filterPersonal').addEventListener('change', (e) => {
            this.filters.personal = e.target.checked;
            this.saveAll();
        });
        
        document.getElementById('enableLearning').addEventListener('change', (e) => {
            this.filters.learning = e.target.checked;
            this.saveAll();
        });
        
        document.getElementById('saveHistory').addEventListener('change', (e) => {
            this.filters.saveHistory = e.target.checked;
            this.saveAll();
        });
        
        console.log('✅ Обработчики событий настроены');
    }
    
    updateFiltersUI() {
        document.getElementById('filterProfanity').checked = this.filters.profanity;
        document.getElementById('filterPersonal').checked = this.filters.personal;
        document.getElementById('enableLearning').checked = this.filters.learning;
        document.getElementById('saveHistory').checked = this.filters.saveHistory;
    }
    
    sendMessage() {
        const inputElement = document.getElementById('userInput');
        const message = inputElement.value.trim();
        
        if (!message) return;
        
        // Очищаем поле ввода
        inputElement.value = '';
        inputElement.style.height = 'auto';
        
        // Добавляем сообщение пользователя
        this.addMessage(message, true);
        
        // Фильтруем сообщение
        const filteredMessage = this.filterText(message);
        
        // Ищем ответ
        setTimeout(async () => {
            try {
                const response = this.findResponse(filteredMessage);
                
                // Добавляем ответ ИИ
                this.addMessage(response, false);
                
                // Увеличиваем счетчик диалогов
                this.model.stats.totalDialogs++;
                
                // Обучаемся на этом диалоге
                this.learnFromDialog(filteredMessage, response);
                
                // Сохраняем историю если включено
                if (this.filters.saveHistory) {
                    this.history.push({
                        user: filteredMessage,
                        ai: response,
                        timestamp: new Date().toISOString()
                    });
                    this.saveAll();
                }
                
            } catch (error) {
                console.error('Ошибка обработки сообщения:', error);
                this.addMessage('Извините, произошла ошибка. Попробуйте еще раз.', false);
            }
        }, 500 + Math.random() * 500); // Имитация "думания"
    }
    
    quickMessage(message) {
        const inputElement = document.getElementById('userInput');
        inputElement.value = message;
        inputElement.style.height = 'auto';
        inputElement.style.height = Math.min(inputElement.scrollHeight, 150) + 'px';
        inputElement.focus();
    }
    
    addMessage(content, isUser) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        
        const time = new Date().toLocaleTimeString('ru-RU', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.innerHTML = `
            <div class="message-header">
                <i class="fas ${isUser ? 'fa-user' : 'fa-robot'}"></i>
                <strong>${isUser ? 'Вы' : 'SoinAI'}</strong>
                <span style="margin-left: auto; font-size: 0.8rem; opacity: 0.7;">${time}</span>
            </div>
            <div class="message-content">${content}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        
        // Прокрутка вниз
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    showWelcomeMessage() {
        const messages = [
            "👋 Привет! Я **SoinAI v2.0** - самообучающийся искусственный интеллект!",
            "🧠 Я учусь на наших разговорах и создаю свой словарь.",
            "💾 Все данные хранятся в вашем браузере (localStorage).",
            "📚 Уже знаю " + Object.keys(this.model.dictionary).length + " слов и постоянно расту!",
            "🔧 Используйте быстрые кнопки или напишите что-нибудь!"
        ];
        
        // Очищаем чат только если он пустой
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages.children.length === 0) {
            messages.forEach((msg, i) => {
                setTimeout(() => {
                    this.addMessage(msg, false);
                }, i * 800);
            });
        }
    }
    
    // ==================== СТАТИСТИКА ====================
    
    updateStats() {
        const totalWords = Object.keys(this.model.dictionary).length;
        const totalResponses = this.model.stats.totalResponses;
        const totalDialogs = this.model.stats.totalDialogs;
        
        // Обновляем цифры
        document.getElementById('wordCount').textContent = totalWords;
        document.getElementById('responseCount').textContent = totalResponses;
        document.getElementById('dialogCount').textContent = totalDialogs;
        
        // Уровень ИИ
        let aiLevel = 'Новичок';
        let progress = 10;
        
        if (totalWords > 50) {
            aiLevel = 'Ученик';
            progress = 30;
        }
        if (totalWords > 100) {
            aiLevel = 'Знаток';
            progress = 50;
        }
        if (totalWords > 200) {
            aiLevel = 'Эксперт';
            progress = 70;
        }
        if (totalWords > 500) {
            aiLevel = 'Мастер';
            progress = 90;
        }
        if (totalWords > 1000) {
            aiLevel = 'Гуру';
            progress = 100;
        }
        
        document.getElementById('aiLevel').textContent = aiLevel;
        document.getElementById('aiProgress').style.width = progress + '%';
        
        // Активность
        let activity = 'Низкая';
        if (totalDialogs > 50) activity = 'Высокая';
        else if (totalDialogs > 20) activity = 'Средняя';
        
        document.getElementById('activity').textContent = activity;
        
        // Последнее обучение
        const lastLearn = this.model.stats.lastLearning;
        if (lastLearn) {
            const date = new Date(lastLearn);
            const now = new Date();
            const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
            
            let text = 'Только что';
            if (diffHours > 0) {
                text = diffHours + ' ч. назад';
            }
            if (diffHours > 24) {
                text = Math.floor(diffHours / 24) + ' д. назад';
            }
            
            document.getElementById('lastLearn').textContent = text;
        }
    }
    
    updateDictionaryDisplay() {
        const container = document.getElementById('dictionaryList');
        if (!container) return;
        
        const words = Object.keys(this.model.dictionary)
            .sort()
            .slice(0, 10); // Показываем первые 10 слов
        
        let html = '';
        
        words.forEach(word => {
            const responses = this.model.dictionary[word];
            const responseText = responses.length > 0 
                ? responses[0].substring(0, 50) + (responses[0].length > 50 ? '...' : '')
                : 'нет ответов';
            
            html += `
                <div class="dictionary-item">
                    <div class="word">${word}</div>
                    <div class="responses">${responses.length} ответов: ${responseText}</div>
                </div>
            `;
        });
        
        if (words.length === 0) {
            html = '<div class="dictionary-item">Словарь пуст. Начните общение!</div>';
        }
        
        container.innerHTML = html;
    }
    
    // ==================== УПРАВЛЕНИЕ ====================
    
    exportData() {
        const data = {
            model: this.model,
            filters: this.filters,
            history: this.history,
            exportDate: new Date().toISOString(),
            version: this.version
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { 
            type: 'application/json' 
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `soinai_v2_backup_${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('✅ Данные экспортированы!');
    }
    
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    
                    // Проверяем структуру данных
                    if (data.model && data.model.dictionary) {
                        this.model = data.model;
                        this.filters = data.filters || this.filters;
                        this.history = data.history || [];
                        
                        this.saveAll();
                        this.updateStats();
                        this.updateDictionaryDisplay();
                        this.updateFiltersUI();
                        
                        // Обновляем чат
                        const chatMessages = document.getElementById('chatMessages');
                        chatMessages.innerHTML = '';
                        this.showWelcomeMessage();
                        
                        this.showNotification('✅ Данные успешно импортированы!');
                        console.log('📂 Импортировано слов:', Object.keys(this.model.dictionary).length);
                    } else {
                        throw new Error('Некорректный формат файла');
                    }
                } catch (error) {
                    console.error('Ошибка импорта:', error);
                    this.showNotification('❌ Ошибка импорта: неверный формат файла');
                }
            };
            
            reader.readAsText(file);
        };
        
        input.click();
    }
    
    resetModel() {
        if (confirm('⚠️ Вы уверены? Все обученные данные будут удалены!')) {
            localStorage.removeItem('soinai_v2_model');
            localStorage.removeItem('soinai_v2_history');
            
            this.model = this.loadModel();
            this.history = [];
            
            // Очищаем чат
            const chatMessages = document.getElementById('chatMessages');
            chatMessages.innerHTML = '';
            
            this.showWelcomeMessage();
            this.updateStats();
            this.updateDictionaryDisplay();
            
            this.showNotification('✅ Модель сброшена к начальному состоянию!');
            console.log('🔄 Модель сброшена');
        }
    }
    
    // ==================== API ====================
    
    generateAPICode() {
        const apiCode = `// =============================================
// SoinAI v2.0 API - Самообучающийся ИИ
// Создан: ${new Date().toISOString()}
// Слов в словаре: ${Object.keys(this.model.dictionary).length}
// =============================================

class SoinAI_API {
    constructor() {
        this.version = '2.0.0';
        this.model = ${JSON.stringify(this.model, null, 2)};
        this.filters = ${JSON.stringify(this.filters, null, 2)};
    }
    
    // Фильтрация текста
    filterText(text) {
        let filtered = text;
        
        // Фильтр мата
        if (this.filters.profanity) {
            const badWords = ['бля', 'хуй', 'пизд', 'еба', 'сука', 'fuck', 'shit'];
            badWords.forEach(word => {
                filtered = filtered.replace(new RegExp(word, 'gi'), '***');
            });
        }
        
        // Защита данных
        if (this.filters.personal) {
            filtered = filtered.replace(/\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b/gi, '[EMAIL]');
        }
        
        return filtered;
    }
    
    // Поиск ответа
    findResponse(input) {
        const cleanInput = input.toLowerCase().trim();
        
        // Поиск в словаре
        for (const [word, responses] of Object.entries(this.model.dictionary)) {
            if (cleanInput.includes(word)) {
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
        
        // Общие ответы
        const generalResponses = [
            'Интересно! Расскажите подробнее.',
            'Понятно. Что вы думаете об этом?',
            'Я еще учусь, но стараюсь помочь!'
        ];
        
        return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }
    
    // Основной метод API
    async process(message) {
        try {
            const filtered = this.filterText(message);
            const response = this.findResponse(filtered);
            
            return {
                success: true,
                message: response,
                filtered: filtered,
                timestamp: new Date().toISOString(),
                model: 'SoinAI v2.0'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Произошла ошибка'
            };
        }
    }
    
    // Получить информацию
    getInfo() {
        return {
            version: this.version,
            words: Object.keys(this.model.dictionary).length,
            responses: this.model.stats.totalResponses,
            dialogs: this.model.stats.totalDialogs
        };
    }
}

// Экспорт для использования
if (typeof window !== 'undefined') {
    window.SoinAI = new SoinAI_API();
}

// Пример использования:
// const response = await SoinAI.process("Привет!");
// console.log(response.message);`;

        document.getElementById('apiCode').textContent = apiCode;
    }
    
    copyAPICode() {
        const codeElement = document.getElementById('apiCode');
        const code = codeElement.textContent;
        
        navigator.clipboard.writeText(code).then(() => {
            this.showNotification('✅ API код скопирован в буфер обмена!');
        }).catch(() => {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = code;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.showNotification('✅ API код скопирован!');
        });
    }
    
    // ==================== УВЕДОМЛЕНИЯ ====================
    
    showNotification(message, isError = false) {
        // Создаем уведомление
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${isError ? '#f44336' : '#4CAF50'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            max-width: 400px;
        `;
        
        // Стиль для анимации
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Удаляем через 3 секунды
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
                if (style.parentNode) {
                    style.parentNode.removeChild(style);
                }
            }, 300);
        }, 3000);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.soinAI = new SoinAI();
});
