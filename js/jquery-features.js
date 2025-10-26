$(document).ready(function(){
    console.log("jQuery is ready for Altynay!");

    // Animated Number Counter
    function animateCounter() {
        $('.counter').each(function() {
            const $this = $(this);
            const target = $this.data('target');
            const suffix = $this.data('suffix') || '';
            const duration = 2000; // 2 seconds

            $({ count: 0 }).animate({ count: target }, {
                duration: duration,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.count) + suffix);
                }
            });
        });
    }
    function checkCounterAnimation() {
        const achievementsSection = $('.about-achievements');
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
    // Toast Notification System
    function showToast(message, type = 'info', duration = 3000) {
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
    }
    function getToastIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: '💙'
        };
        return icons[type] || '💙';
    }
    function enhanceRatingSystem() {
        $(document).on('click', '.star', function() {
            const $star = $(this);
            const rating = $star.data('rating');
            const service = $star.closest('.rating-stars').data('service');

            const messages = [
                "Thanks for your rating! We'll work harder. 👏",
                "Thank you! We appreciate your feedback. 👍",
                "Good! We're glad you liked it. 😊",
                "Great! Thank you for the positive rating! 🌟",
                "Excellent! Thanks for the perfect rating! 🎉"
            ];
            showToast(messages[rating - 1], 'success');
            $star.prevAll('.star').addBack().addClass('pulse-animation');
            setTimeout(() => {
                $star.prevAll('.star').addBack().removeClass('pulse-animation');
            }, 600);
        });
    }
    enhanceRatingSystem();
});