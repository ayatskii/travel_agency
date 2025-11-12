// SIMPLE DELICATE CAROUSEL WITH PETALS
class EpicCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.cosmic-slide');
        this.thumbs = document.querySelectorAll('.cosmic-thumb');
        this.prevBtn = document.querySelector('.prev-cosmic');
        this.nextBtn = document.querySelector('.next-cosmic');
        this.progressBar = document.querySelector('.indicator-progress');
        this.currentSlide = document.querySelector('.current-slide');
        this.totalSlides = document.querySelector('.total-slides');
        
        this.currentIndex = 0;
        this.autoPlayDelay = 5000;
        
        this.init();
    }
    
    init() {
        console.log('🚀 Starting carousel...');
        
        // Устанавливаем общее количество слайдов
        this.totalSlides.textContent = this.formatNumber(this.slides.length);
        this.updateIndicator();
        
        // СОЗДАЕМ ЛЕПЕСТКИ ПЕРВЫМ ДЕЛОМ
        this.createPetals();
        
        // Инициализируем слайды
        this.updateSlidePositions();
        
        // Навигация
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Миниатюры
        this.thumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', () => this.goTo(index));
        });
        
        // Автоплей
        this.startAutoPlay();
        
        console.log('🌸 Carousel initialized with petals!');
    }
    
    createPetals() {
        const carousel = document.querySelector('.epic-carousel');
        console.log('🎀 Creating petals in:', carousel);
        
        // Очищаем старые лепестки
        const oldPetals = carousel.querySelectorAll('.petal');
        oldPetals.forEach(petal => petal.remove());
        
        // Создаем новые лепестки
        for (let i = 0; i < 12; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            
            // Случайные свойства
            petal.style.left = Math.random() * 100 + '%';
            petal.style.animationDelay = Math.random() * 15 + 's';
            petal.style.animationDuration = (8 + Math.random() * 7) + 's';
            
            // Разные цвета
            const colors = ['#ffb6c1', '#ffdab9', '#b0e0e6', '#d8bfd8', '#98fb98'];
            petal.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            carousel.appendChild(petal);
        }
        
        console.log('✅ Petals created!');
    }
    
    goTo(index) {
        this.currentIndex = index;
        if (this.currentIndex >= this.slides.length) this.currentIndex = 0;
        if (this.currentIndex < 0) this.currentIndex = this.slides.length - 1;
        
        this.updateSlidePositions();
        this.updateThumbs();
        this.updateIndicator();
        this.resetProgressBar();
    }
    
    next() {
        this.goTo(this.currentIndex + 1);
    }
    
    prev() {
        this.goTo(this.currentIndex - 1);
    }
    
    updateSlidePositions() {
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');
            
            if (index === this.currentIndex) {
                slide.classList.add('active');
            } else if (index === (this.currentIndex - 1 + this.slides.length) % this.slides.length) {
                slide.classList.add('prev');
            } else if (index === (this.currentIndex + 1) % this.slides.length) {
                slide.classList.add('next');
            }
        });
    }
    
    updateThumbs() {
        this.thumbs.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    updateIndicator() {
        this.currentSlide.textContent = this.formatNumber(this.currentIndex + 1);
    }
    
    startAutoPlay() {
        setInterval(() => this.next(), this.autoPlayDelay);
    }
    
    resetProgressBar() {
        if (this.progressBar) {
            this.progressBar.style.width = '0%';
        }
    }
    
    formatNumber(num) {
        return num.toString().padStart(2, '0');
    }
}

// ЗАПУСКАЕМ СРАЗУ
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM loaded, starting carousel...');
    new EpicCarousel();
});