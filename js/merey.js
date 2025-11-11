(function () {
  const $search = $('#faqSearch');
  if (!$search.length) return;

  $('.accordion-item').each(function () {
    const $q = $(this).find('.accordion-header-text');
    const $a = $(this).find('.accordion-content');
    $q.attr('data-original', $q.text());
    $a.attr('data-original', $a.text());
  });

  $search.on('input', function () {
    const term = $(this).val().trim();
    $('.accordion-item').each(function () {
      const $q = $(this).find('.accordion-header-text');
      const $a = $(this).find('.accordion-content');


      $q.html($q.attr('data-original'));
      $a.html($a.attr('data-original'));

      if (!term) return;

      const esc = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(esc, 'gi');

      $q.html($q.text().replace(re, m => `<mark class="hl">${m}</mark>`));
      $a.html($a.text().replace(re, m => `<mark class="hl">${m}</mark>`));
    });
  });
})();

$(function () {
  
  $('.accordion-content').css('max-height', 0);

  $('.accordion').on('click', '.accordion-header', function () {
    const $item    = $(this).closest('.accordion-item');
    const $content = $item.children('.accordion-content');

    
    $item.siblings('.accordion-item')
      .removeClass('active')
      .children('.accordion-header').removeClass('active').end()
      .children('.accordion-content').css('max-height', 0);


    if ($item.hasClass('active')) {
      $item.removeClass('active');
      $(this).removeClass('active');
      $content.css('max-height', 0);
    } else {
      $item.addClass('active');
      $(this).addClass('active');
      $content.css('max-height', $content.prop('scrollHeight') + 'px');
    }
  });
});



(function () {
  const $bar = $('#scroll-progress');
  if (!$bar.length) return;

  function update() {
    const h = $(document).height() - $(window).height();
    const p = h > 0 ? (100 * $(window).scrollTop() / h) : 0;
    $bar.css('width', p + '%');
  }
  $(window).on('scroll resize', update);
  update();
})();

document.addEventListener("DOMContentLoaded", () => {
  const imgs = document.querySelectorAll("img.lazy");
  if (!imgs.length) return;


  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const img = entry.target;
      const src = img.getAttribute("data-src");
      if (!src || img.getAttribute("src")) {
        io.unobserve(img);
        return;
      }

      setTimeout(() => {
        img.setAttribute("src", src);
        img.removeAttribute("data-src");
        img.classList.remove("lazy");
        io.unobserve(img); 
      }, 1000);
    });
  }, {
    root: null,
    rootMargin: "200px 0px", 
    threshold: 0            
  });

  imgs.forEach(img => io.observe(img));


  if (!("IntersectionObserver" in window)) {
    const loadVisible = () => {
      imgs.forEach((img) => {
        if (!img.dataset.src) return;
        const r = img.getBoundingClientRect();
        if (r.top < window.innerHeight + 200 && r.bottom > -200) {
          setTimeout(() => {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            img.classList.remove("lazy");
          }, 1000);
        }
      });
    };
    ["scroll","resize","orientationchange"].forEach(ev =>
      window.addEventListener(ev, loadVisible)
    );
    loadVisible();
  }
});

