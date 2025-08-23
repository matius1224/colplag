$(function () {
    lucide.createIcons();
    var $navbar = $("#navbar");
    var $btnTop = $("#backToTop");

    function onScroll() {
        var sc = $(window).scrollTop();
        if (sc > 50) {
            $navbar.addClass("shadow-md bg-white/95 backdrop-blur-md");
            if ($btnTop.hasClass("hidden")) $btnTop.removeClass("hidden");
            $btnTop.stop(true, true).fadeIn(200);
        } else {
            $navbar.removeClass("shadow-md bg-white/95 backdrop-blur-md");
            $btnTop.stop(true, true).fadeOut(200, function () {
                $(this).addClass("hidden");
            });
        }
    }

    // Ejecuta en scroll y al cargar
    $(window).on("scroll", onScroll);
    onScroll();

    // Botón "ir arriba"
    $btnTop.on("click", function (e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 600, "swing");
    });

    // Scroll suave para los links internos del nav
    $('a[href^="#"]').on("click", function (e) {
        var target = $($(this).attr("href"));
        if (target.length) {
            e.preventDefault();
            var navH = $navbar.outerHeight() || 0;
            $("html, body").animate(
                { scrollTop: target.offset().top - navH },
                600,
                "swing"
            );
        }
    });

    // carrusel imagenes
    const $carousel = $(".relative.h-full > .absolute.inset-0.flex");
    const $slides = $carousel.children(".min-w-full.h-full.relative.flex-shrink-0");
    const totalSlides = $slides.length;
    let currentIndex = 0;

    // Mover al slide indicado
    function goToSlide(index) {
        if (index < 0) {
            index = totalSlides - 1; // vuelve al último
        }
        if (index >= totalSlides) {
            index = 0; // vuelve al primero
        }
        currentIndex = index;

        // desplazamos el carrusel
        const offset = -currentIndex * 100; // porcentaje
        $carousel.css("transform", `translateX(${offset}%)`);
    }

    // Botón izquierda
    $(".chevron_left").click(function () {
        goToSlide(currentIndex - 1);
    });

    // Botón derecha
    $(".chevron_right").click(function () {
        goToSlide(currentIndex + 1);
    });

    // Auto avance cada 5 segundos
    setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);

    // Inicia en la primera slide
    goToSlide(0);
});
