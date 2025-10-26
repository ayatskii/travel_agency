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
});