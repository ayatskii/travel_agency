// DOM Manipulation and Styling for Altynay - Complete Version
class DOMFeatures {
    constructor() {
        this.currentTheme = 'light';
        this.init();
        this.initGlobalTheme();
    }

    init() {
        this.initRatingSystem();
        this.initThemeToggle();
        this.initReadMore();
        this.initServiceFilter();
        this.initSmoothScroll();
    }

    initGlobalTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);

        document.addEventListener('click', (e) => {
            if (e.target.id === 'themeToggle' || e.target.closest('#themeToggle')) {
                this.toggleTheme();
            }
        });
    }

    // 1. СИСТЕМА РЕЙТИНГА ЗВЕЗДАМИ
    initRatingSystem() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('star')) {
                this.handleStarClick(e.target);
            }
        });

        this.loadSavedRatings();
    }

    handleStarClick(star) {
        const ratingContainer = star.closest('.rating-stars');
        if (!ratingContainer) return;

        const stars = ratingContainer.querySelectorAll('.star');
        const ratingValue = parseInt(star.dataset.rating);
        const service = ratingContainer.dataset.service;

        this.updateStarDisplay(stars, ratingValue);
        this.saveRating(service, ratingValue);
        this.showRatingMessage(ratingValue);
        this.playRatingSound();
        this.updateOverallRating();
    }

    updateStarDisplay(stars, ratingValue) {
        stars.forEach((star, index) => {
            if (index < ratingValue) {
                star.classList.add('active');
                star.style.color = '#ffc107';
                star.style.textShadow = '0 0 10px rgba(255, 193, 7, 0.5)';
            } else {
                star.classList.remove('active');
                star.style.color = '#ccc';
                star.style.textShadow = 'none';
            }
        });
    }

    saveRating(service, rating) {
        const ratings = JSON.parse(localStorage.getItem('serviceRatings') || '{}');
        ratings[service] = {
            rating: rating,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('serviceRatings', JSON.stringify(ratings));
    }

    loadSavedRatings() {
        const ratings = JSON.parse(localStorage.getItem('serviceRatings') || '{}');

        Object.keys(ratings).forEach(service => {
            const ratingContainer = document.querySelector(`[data-service="${service}"]`);
            if (ratingContainer) {
                const stars = ratingContainer.querySelectorAll('.star');
                const ratingValue = ratings[service].rating;
                this.updateStarDisplay(stars, ratingValue);
            }
        });
    }

    updateOverallRating() {
        const ratings = JSON.parse(localStorage.getItem('serviceRatings') || '{}');
        const ratingValues = Object.values(ratings).map(r => r.rating);

        if (ratingValues.length > 0) {
            const average = ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length;
            const staticStars = document.querySelector('.stars-static');

            if (staticStars) {
                const stars = staticStars.querySelectorAll('.static-star');
                stars.forEach((star, index) => {
                    if (index < Math.round(average)) {
                        star.style.color = '#ffc107';
                    } else {
                        star.style.color = '#ccc';
                    }
                });

                const ratingScore = document.querySelector('.rating-score');
                if (ratingScore) {
                    ratingScore.textContent = `${average.toFixed(1)}/5`;
                }

                const ratingCount = document.querySelector('.rating-count');
                if (ratingCount) {
                    ratingCount.textContent = `Based on ${ratingValues.length} reviews`;
                }
            }
        }
    }

    showRatingMessage(rating) {
        const messages = [
            "Thanks for your rating! We'll work harder.",
            "Thank you! We appreciate your feedback.",
            "Good! We're glad you liked it.",
            "Great! Thank you for the positive rating!",
            "Excellent! Thanks for the perfect rating!"
        ];
        if (window.showToast) {
            showToast(messages[rating - 1], 'success');
        }
    }

    // 2. ПЕРЕКЛЮЧЕНИЕ ТЕМЫ "ДЕНЬ/НОЧЬ"
    initThemeToggle() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.playThemeTransition();
    }

    // В файле js/altynay-dom.js обновите метод setTheme:
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);

        // Принудительно применяем тему ко всем элементам
        document.body.setAttribute('data-theme', theme);

        const toggleBtns = document.querySelectorAll('#themeToggle');
        toggleBtns.forEach(btn => {
            if (btn) {
                btn.textContent = theme === 'light' ? '🌙' : '☀️';
                btn.title = `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`;
            }
        });

        // Принудительно перерисовываем страницу
        document.body.style.display = 'none';
        document.body.offsetHeight; // Trigger reflow
        document.body.style.display = '';
    }

    playThemeTransition() {
        document.body.style.transition = 'all 0.5s ease';
        document.body.style.opacity = '0.8';

        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 150);

        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    }

    // 3. КНОПКА "READ MORE"
    initReadMore() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('read-more-btn')) {
                this.toggleReadMore(e.target);
            }
        });

        this.initializeReadMoreSections();
    }

    initializeReadMoreSections() {
        const readMoreSections = document.querySelectorAll('.read-more-section');
        readMoreSections.forEach(section => {
            const content = section.querySelector('.more-content');
            const button = section.querySelector('.read-more-btn');

            if (content && button) {
                content.style.display = 'none';
                button.textContent = 'Read More';
            }
        });
    }

    toggleReadMore(button) {
        const content = button.previousElementSibling;
        const isExpanded = content.style.display === 'block';

        if (isExpanded) {
            this.collapseReadMore(content, button);
        } else {
            this.expandReadMore(content, button);
        }
    }

    expandReadMore(content, button) {
        content.style.display = 'block';
        button.textContent = 'Read Less';
        button.classList.add('expanded');

        this.animateReadMore(content, true);
        this.playExpandSound();
    }

    collapseReadMore(content, button) {
        this.animateReadMore(content, false);

        setTimeout(() => {
            content.style.display = 'none';
            button.textContent = 'Read More';
            button.classList.remove('expanded');
        }, 300);
    }

    animateReadMore(element, expanding) {
        element.style.opacity = expanding ? '0' : '1';
        element.style.transform = expanding ? 'translateY(-10px)' : 'translateY(0)';
        element.style.maxHeight = expanding ? '0' : '1000px';
        element.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            element.style.transition = 'all 0.3s ease';
            element.style.opacity = expanding ? '1' : '0';
            element.style.transform = 'translateY(0)';
            element.style.maxHeight = expanding ? '1000px' : '0';
        });
    }

    // 4. ФИЛЬТРАЦИЯ СЕРВИСОВ
    initServiceFilter() {
        document.addEventListener('click', (e) => {
            if (e.target.dataset.filter) {
                this.filterServices(e.target.dataset.filter);
                this.updateActiveFilter(e.target);
            }
        });
    }

    filterServices(filter) {
        const serviceItems = document.querySelectorAll('.service-item');
        const servicesContainer = document.querySelector('.services-container');

        // Add fade-out animation
        servicesContainer.style.opacity = '0.5';
        servicesContainer.style.transition = 'opacity 0.3s ease';

        setTimeout(() => {
            serviceItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });

            servicesContainer.style.opacity = '1';
        }, 150);
    }

    updateActiveFilter(activeButton) {
        const filterButtons = document.querySelectorAll('[data-filter]');
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.classList.add('btn-outline-primary');
        });

        activeButton.classList.add('active');
        activeButton.classList.remove('btn-outline-primary');
    }

    // 5. ПЛАВНАЯ ПРОКРУТКА
    initSmoothScroll() {
        document.addEventListener('click', (e) => {
            if (e.target.hash && e.target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                this.smoothScrollTo(e.target.hash);
            }
        });
    }

    smoothScrollTo(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    playRatingSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.2);

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('Audio not supported');
        }
    }

    playExpandSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (error) {
            console.log('Audio not supported');
        }
    }

    // УТИЛИТЫ
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Дополнительные утилиты для работы с localStorage
class StorageManager {
    static setItem(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }

    static getItem(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    }

    static removeItem(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }
}

// Анимации и эффекты
class AnimationHelper {
    static fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';

        requestAnimationFrame(() => {
            element.style.transition = `opacity ${duration}ms ease`;
            element.style.opacity = '1';
        });
    }

    static fadeOut(element, duration = 300) {
        element.style.transition = `opacity ${duration}ms ease`;
        element.style.opacity = '0';

        setTimeout(() => {
            element.style.display = 'none';
        }, duration);
    }

    static slideDown(element, duration = 300) {
        element.style.maxHeight = '0';
        element.style.overflow = 'hidden';
        element.style.display = 'block';

        requestAnimationFrame(() => {
            element.style.transition = `max-height ${duration}ms ease`;
            element.style.maxHeight = `${element.scrollHeight}px`;
        });
    }

    static slideUp(element, duration = 300) {
        element.style.transition = `max-height ${duration}ms ease`;
        element.style.maxHeight = '0';

        setTimeout(() => {
            element.style.display = 'none';
        }, duration);
    }
}

// Инициализация когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    const domFeatures = new DOMFeatures();

    // Добавляем глобальные обработчики
    window.domFeatures = domFeatures;

    // Инициализируем общий рейтинг
    setTimeout(() => {
        domFeatures.updateOverallRating();
    }, 100);
});

// Обработчик для изменения темы в реальном времени
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DOMFeatures, StorageManager, AnimationHelper };
}

