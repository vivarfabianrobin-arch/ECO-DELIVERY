$(document).ready(function() {
  
  // ============================================
  // 1 BANNER ANIMADO CON SLIDER
  // ============================================
  let currentSlide = 0;
  const slides = $('.banner-slide');
  const totalSlides = slides.length;
  
  // Función para mostrar slide
  function showSlide(index) {
    slides.removeClass('active').eq(index).addClass('active');
    $('.dot').removeClass('active').eq(index).addClass('active');
  }
  
  // Auto-play del banner (cambia cada 5 segundos)
  function autoPlay() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }
  
  let autoPlayInterval = setInterval(autoPlay, 5000);
  
  // Botón siguiente
  $('.banner-next').click(function() {
    clearInterval(autoPlayInterval);
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
    autoPlayInterval = setInterval(autoPlay, 5000);
  });
  
  // Botón anterior
  $('.banner-prev').click(function() {
    clearInterval(autoPlayInterval);
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
    autoPlayInterval = setInterval(autoPlay, 5000);
  });
  
  // Dots navegación
  $('.dot').click(function() {
    clearInterval(autoPlayInterval);
    currentSlide = $(this).data('slide');
    showSlide(currentSlide);
    autoPlayInterval = setInterval(autoPlay, 5000);
  });
  
  
  // ============================================
  // 2 CONTADOR ANIMADO DE ESTADÍSTICAS
  // ============================================
  let counterAnimated = false;
  
  function animateCounters() {
    if (counterAnimated) return;
    
    $('.counter').each(function() {
      const $this = $(this);
      const target = parseInt($this.closest('.stat-card').data('target'));
      const suffix = target > 50 ? '%' : '.1%';
      
      $({ counter: 0 }).animate({ counter: target }, {
        duration: 2000,
        easing: 'swing',
        step: function() {
          if (target > 50) {
            $this.text(Math.ceil(this.counter) + '%');
          } else {
            $this.text(this.counter.toFixed(1) + '%');
          }
        },
        complete: function() {
          if (target > 50) {
            $this.text(target + '%');
          } else {
            $this.text(target + '.1%');
          }
        }
      });
    });
    
    counterAnimated = true;
  }
  
  // Activar contador cuando se hace scroll a la sección
  $(window).scroll(function() {
    const statsOffset = $('.stats').offset().top;
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    
    if (scrollTop + windowHeight > statsOffset + 100) {
      animateCounters();
    }
  });
  
  
  // ============================================
  // 3 HOVER EFFECT EN CARDS DE VEHÍCULOS
  // ============================================
  $('.vehicle-card').hover(
    function() {
      // Mouse enter
      $(this).stop().animate({
        transform: 'scale(1.05)'
      }, 300).css({
        'box-shadow': '0 12px 24px rgba(46,125,50,0.4)',
        'transform': 'scale(1.05) translateY(-10px)'
      });
    },
    function() {
      // Mouse leave
      $(this).stop().css({
        'box-shadow': '0 4px 8px rgba(46,125,50,0.1)',
        'transform': 'scale(1) translateY(0)'
      });
    }
  );
  
  
  // ============================================
  // 4 TOGGLE INFO DE VEHÍCULOS (SLIDEDOWN/UP)
  // ============================================
  $('.btn-info').click(function(e) {
    e.preventDefault();
    const info = $(this).siblings('.vehicle-info');
    
    if (info.is(':visible')) {
      info.slideUp(400);
      $(this).text('Ver más').removeClass('active');
    } else {
      // Cerrar otros abiertos
      $('.vehicle-info').slideUp(400);
      $('.btn-info').text('Ver más').removeClass('active');
      
      // Abrir el actual
      info.slideDown(400);
      $(this).text('Ver menos').addClass('active');
    }
  });
  
  
  // ============================================
  // 5 ACORDEÓN EN INFORMACIÓN ECOLÓGICA
  // ============================================
  $('.eco-accordion-header').click(function() {
    const item = $(this).closest('.eco-accordion-item');
    const content = item.find('.eco-accordion-content');
    const icon = item.find('.eco-accordion-icon');
    
    if (content.is(':visible')) {
      // Cerrar
      content.slideUp(400);
      icon.text('+').css('transform', 'rotate(0deg)');
      item.removeClass('active');
    } else {
      // Cerrar todos los demás
      $('.eco-accordion-content').slideUp(400);
      $('.eco-accordion-icon').text('+').css('transform', 'rotate(0deg)');
      $('.eco-accordion-item').removeClass('active');
      
      // Abrir el actual
      content.slideDown(400);
      icon.text('−').css('transform', 'rotate(180deg)');
      item.addClass('active');
    }
  });
  
  
  // ============================================
  // 6 SMOOTH SCROLL PARA NAVEGACIÓN
  // ============================================
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    const target = $(this.getAttribute('href'));
    
    if (target.length) {
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 80
      }, 1000, 'swing');
    }
  });
  
  
  // ============================================
  // 7 BOTÓN SCROLL TO TOP
  // ============================================
  // Mostrar/ocultar botón según scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
      $('#scrollTop').fadeIn(400);
    } else {
      $('#scrollTop').fadeOut(400);
    }
  });
  
  // Click en botón scroll top
  $('#scrollTop').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 800, 'swing');
    return false;
  });
  
  
  // ============================================
  // 8 ANIMACIÓN FADE-IN AL HACER SCROLL
  // ============================================
  function checkFadeIn() {
    $('.vehicle-card, .benefit-card, .stat-card').each(function() {
      const elementTop = $(this).offset().top;
      const scrollTop = $(window).scrollTop();
      const windowHeight = $(window).height();
      
      if (scrollTop + windowHeight > elementTop + 50) {
        $(this).addClass('fade-in-visible');
      }
    });
  }
  
  // Ejecutar al cargar y al hacer scroll
  checkFadeIn();
  $(window).scroll(checkFadeIn);
  
  
  // ============================================
  // 9 HIGHLIGHT AL HACER CLICK EN BENEFICIOS
  // ============================================
  $('.benefit-card').click(function() {
    // Remover highlight de otros
    $('.benefit-card').removeClass('highlight');
    
    // Agregar highlight al actual
    $(this).addClass('highlight');
    
    // Pequeño efecto de bounce
    $(this).css('animation', 'none');
    setTimeout(() => {
      $(this).css('animation', '');
    }, 10);
  });
  
  
  // ============================================
  // 10 HEADER STICKY CON EFECTO
  // ============================================
  let lastScroll = 0;
  
  $(window).scroll(function() {
    const currentScroll = $(this).scrollTop();
    
    if (currentScroll > 100) {
      $('.header').addClass('scrolled');
      
      // Ocultar header al bajar, mostrar al subir
      if (currentScroll > lastScroll) {
        $('.header').css('top', '-100px');
      } else {
        $('.header').css('top', '0');
      }
    } else {
      $('.header').removeClass('scrolled');
      $('.header').css('top', '0');
    }
    
    lastScroll = currentScroll;
  });
  
});

// ============================================
// MENÚ HAMBURGUESA PARA MÓVILES
// ============================================

// Crear botón hamburguesa si no existe
if ($(window).width() <= 767 && !$('.menu-toggle').length) {
  $('.header-container').prepend(`
    <div class="menu-toggle">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `);
}

// Toggle menú
$(document).on('click', '.menu-toggle', function() {
  $(this).toggleClass('active');
  $('.nav').toggleClass('active');
  $('body').toggleClass('menu-open');
});

// Cerrar menú al hacer click en un enlace
$('.nav-list a').click(function() {
  if ($(window).width() <= 767) {
    $('.menu-toggle').removeClass('active');
    $('.nav').removeClass('active');
    $('body').removeClass('menu-open');
  }
});

// Cerrar menú al hacer click fuera
$(document).click(function(e) {
  if (!$(e.target).closest('.nav, .menu-toggle').length) {
    $('.menu-toggle').removeClass('active');
    $('.nav').removeClass('active');
    $('body').removeClass('menu-open');
  }
});

// ============================================
// PLAYER FLOTANTE DE MÚSICA
// ============================================

// Detectar cuando se reproduce cualquier audio
$('audio').on('play', function() {
  // Pausar otros audios
  $('audio').not(this).each(function() {
    this.pause();
  });
  
  // Mostrar player flotante
  $('#floatingPlayer').addClass('active');
});

// Ocultar player cuando todos los audios están pausados
$('audio').on('pause ended', function() {
  let anyPlaying = false;
  $('audio').each(function() {
    if (!this.paused) {
      anyPlaying = true;
      return false;
    }
  });
  
  if (!anyPlaying) {
    $('#floatingPlayer').removeClass('active');
  }
});

// Click en player flotante para scroll a sección de música
$('#floatingPlayer').click(function() {
  $('html, body').animate({
    scrollTop: $('.music-section').offset().top - 80
  }, 1000);
});

// ============================================
// EFECTO PARALLAX SUAVE
// ============================================

let lastScrollTop = 0;

$(window).scroll(function() {
  let scrollTop = $(this).scrollTop();
  let scrollDiff = scrollTop - lastScrollTop;
  
  // Parallax para secciones grandes
  $('.hero, .eco-info-section, .music-section').each(function() {
    let offset = $(this).offset().top;
    let windowHeight = $(window).height();
    
    if (scrollTop + windowHeight > offset && scrollTop < offset + $(this).outerHeight()) {
      let parallax = (scrollTop + windowHeight - offset) * 0.05;
      $(this).css('transform', `translateY(${parallax}px)`);
    }
  });
  
  lastScrollTop = scrollTop;
});

// ============================================
// ANIMACIONES DE ENTRADA AL SCROLL
// ============================================

function checkAnimation() {
  $('.vehicle-card, .benefit-card, .stat-card, .audio-card').each(function() {
    const elementTop = $(this).offset().top;
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    
    if (scrollTop + windowHeight > elementTop + 100) {
      $(this).addClass('fade-in-visible');
    }
  });
}

$(window).scroll(checkAnimation);
checkAnimation(); // Ejecutar al cargar

// ============================================
// FOCUS MEJORADO EN INPUTS
// ============================================

$('input, select, textarea').focus(function() {
  $(this).css({
    'border-color': '#2e7d32',
    'box-shadow': '0 0 0 3px rgba(46,125,50,0.1)',
    'transform': 'scale(1.02)'
  });
}).blur(function() {
  $(this).css({
    'border-color': '#c8e6c9',
    'box-shadow': 'none',
    'transform': 'scale(1)'
  });
});