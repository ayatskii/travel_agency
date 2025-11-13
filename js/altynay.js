class DOMFeatures {
    constructor() {
        this.currentTheme = 'light';
        this.themeToggleInitialized = false;
        this.init();
        this.initGlobalTheme();
    }
    init() {
        this.initRatingSystem();
        this.initThemeToggle();
        this.initReadMore();
        this.initSmoothScroll();
        this.initClock();
    }
    initGlobalTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);

        document.addEventListener('click', (e) => {
            if (e.target.id === 'themeToggle' || e.target.closest('#themeToggle')) {
                e.preventDefault();
                e.stopPropagation();
                this.toggleTheme();
            }
        });
    }
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

        if (window.jQuery) {
            $(star).prevAll('.star').addBack().addClass('pulse-animation');
            setTimeout(() => {
                $(star).prevAll('.star').addBack().removeClass('pulse-animation');
            }, 600);
        }
    }
    updateStarDisplay(stars, ratingValue) {
        stars.forEach((star, index) => {
            const isActive = index < ratingValue;
            star.classList.toggle('active', isActive);
            star.style.color = isActive ? '#ffc107' : '#ccc';
            star.style.textShadow = isActive ? '0 0 10px rgba(255, 193, 7, 0.5)' : 'none';
        });
    }
    saveRating(service, rating) {
        const ratings = JSON.parse(localStorage.getItem('serviceRatings') || '{}');
        ratings[service] = { rating, timestamp: new Date().toISOString() };
        localStorage.setItem('serviceRatings', JSON.stringify(ratings));
    }
    loadSavedRatings() {
        const ratings = JSON.parse(localStorage.getItem('serviceRatings') || '{}');
        Object.entries(ratings).forEach(([service, data]) => {
            const ratingContainer = document.querySelector(`[data-service="${service}"]`);
            if (ratingContainer) {
                const stars = ratingContainer.querySelectorAll('.star');
                this.updateStarDisplay(stars, data.rating);
            }
        });
    }
    updateOverallRating() {
        const ratings = JSON.parse(localStorage.getItem('serviceRatings') || '{}');
        const ratingValues = Object.values(ratings).map(r => r.rating);

        if (ratingValues.length === 0) return;

        const average = ratingValues.reduce((a, b) => a + b) / ratingValues.length;
        const staticStars = document.querySelector('.stars-static');

        if (!staticStars) return;

        const stars = staticStars.querySelectorAll('.static-star');
        stars.forEach((star, index) => {
            star.style.color = index < Math.round(average) ? '#ffc107' : '#ccc';
        });

        const ratingScore = document.querySelector('.rating-score');
        const ratingCount = document.querySelector('.rating-count');

        if (ratingScore) ratingScore.textContent = `${average.toFixed(1)}/5`;
        if (ratingCount) ratingCount.textContent = `Based on ${ratingValues.length} reviews`;
    }
    showRatingMessage(rating) {
        const messages = [
            "Thanks for your rating! We'll work harder. 👏",
            "Thank you! We appreciate your feedback. 👍",
            "Good! We're glad you liked it. 😊",
            "Great! Thank you for the positive rating! 🌟",
            "Excellent! Thanks for the perfect rating! 🎉"
        ];
        if (window.showToast) {
            showToast(messages[rating - 1], 'success');
        }
    }
    initThemeToggle() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        if (this.themeToggleInitialized) return;
        this.themeToggleInitialized = true;
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.playThemeTransition();

        setTimeout(() => {
            this.themeToggleInitialized = false;
        }, 500);
    }
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);

        document.querySelectorAll('#themeToggle').forEach(btn => {
            if (btn) {
                btn.textContent = theme === 'light' ? '🌙' : '☀️';
                btn.title = `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`;
            }
        });
        document.body.style.display = 'none';
        document.body.offsetHeight;
        document.body.style.display = '';
    }
    playThemeTransition() {
        document.body.style.transition = 'all 0.5s ease';
        document.body.style.opacity = '0.8';

        setTimeout(() => {
            document.body.style.opacity = '1';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 350);
        }, 150);
    }
    initReadMore() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('read-more-btn')) {
                this.toggleReadMore(e.target);
            }
        });
        this.initializeReadMoreSections();
    }
    initializeReadMoreSections() {
        document.querySelectorAll('.read-more-section').forEach(section => {
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

        isExpanded ? this.collapseReadMore(content, button) : this.expandReadMore(content, button);
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
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    }
    initClock() {
        const el = document.getElementById("clock");
        if (!el) return;

        const updateClock = () => {
            const now = new Date();
            const opts = {
                year: "numeric", month: "long", day: "numeric",
                hour: "2-digit", minute: "2-digit", second: "2-digit",
                timeZone: "Asia/Almaty"
            };
            el.textContent = now.toLocaleString("en-US", opts);
        };
        updateClock();
        setInterval(updateClock, 1000);
    }
    playRatingSound() {
        this.playSound([800, 1000, 600], 0.3);
    }
    playExpandSound() {
        this.playSound([400, 600], 0.2);
    }
    playSound(frequencies, gainValue) {
        try {
            const audioContext = new (window.AudioContext || window.AudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.type = 'sine';
            frequencies.forEach((freq, i) => {
                oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.1);
            });

            gainNode.gain.setValueAtTime(gainValue, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('Audio not supported');
        }
    }
}
function initJQueryFeatures() {
    if (!window.jQuery) {
        console.log("jQuery not loaded, skipping jQuery features");
        return;
    }

    console.log("jQuery is ready!");

    window.showToast = function(message, type = 'info', duration = 3000) {
        $('.bluewave-toast').remove();

        const toast = $('<div class="bluewave-toast"></div>')
            .addClass(type)
            .html(`
                <div class="d-flex align-items-center">
                    <span class="me-2">${getToastIcon(type)}</span>
                    <span>${message}</span>
                </div>
            `);
        $('body').append(toast);

        setTimeout(() => toast.addClass('show'), 100);
        setTimeout(() => {
            toast.removeClass('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    };

    function getToastIcon(type) {
        const icons = { success: '✅', error: '❌', warning: '⚠️', info: '💙' };
        return icons[type] || '💙';
    }

    function animateCounter() {
        $('.counter').each(function() {
            const $this = $(this);
            const target = $this.data('target');
            const suffix = $this.data('suffix') || '';
            const duration = 2000;
            const startTime = Date.now();
            const startValue = 0;

            function updateCounter() {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(easeOut * (target - startValue) + startValue);

                $this.text(currentValue + suffix);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    function checkCounterAnimation() {
        const achievementsSection = $('.about-achievements');
        if (achievementsSection.length === 0) return;

        const scrollPos = $(window).scrollTop();
        const sectionOffset = achievementsSection.offset().top;
        const windowHeight = $(window).height();

        if (scrollPos > sectionOffset - windowHeight + 100) {
            animateCounter();
            $(window).off('scroll', checkCounterAnimation);
        }
    }

    $(window).on('scroll', checkCounterAnimation);
    checkCounterAnimation();
}

document.addEventListener('DOMContentLoaded', () => {
    const domFeatures = new DOMFeatures();
    window.domFeatures = domFeatures;
    initJQueryFeatures();

    setTimeout(() => {
        domFeatures.updateOverallRating();
    }, 100);
});