/*  Search Highlighting for FAQ  */
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


/*  Global Scroll Progress Bar  */
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

/*  Image Lazy Loading for gallery  */
(function () {
  const $imgs = $('img.lazy');
  if (!$imgs.length) return;

  function loadVisible() {
    const winTop = $(window).scrollTop();
    const winBot = winTop + $(window).height();

    $imgs.each(function () {
      const $img = $(this);
      if (!$img.hasClass('lazy')) return;

      const top = $img.offset().top;
      if (top < winBot + 100) { 
        const src = $img.attr('data-src');
        if (src) {
          $img.attr('src', src).removeClass('lazy');
        }
      }
    });
  }

  $(window).on('scroll resize', loadVisible);
  loadVisible(); 
})();

