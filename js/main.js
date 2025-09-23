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

    let currentIndex = 0;
    const totalSlides = $(".slide").length;

    function animateSlideElements(index) {
        // Remove animation classes and hide all slides' elements
        $(".slide").each(function () {
            $(this).find(".slide-img").removeClass("animate-zoom-in");
            $(this).find(".slide-title").removeClass("animate-title-drop").css("opacity", 0);
            $(this).find(".slide-subtitle").removeClass("animate-subtitle-rise").css("opacity", 0);
        });

        // Add animation classes to the current slide's elements
        const $currentSlide = $(".slide").eq(index);

        // Imagen: mostrar y animar inmediatamente
        $currentSlide.find(".slide-img").addClass("animate-zoom-in");

        // Título: oculto, mostrar y animar después de 2s
        setTimeout(() => {
            $currentSlide.find(".slide-title")
                .css("opacity", 1)
                .addClass("animate-title-drop");
        }, 2000);

        // Subtítulo: oculto, mostrar y animar después de 4s
        setTimeout(() => {
            $currentSlide.find(".slide-subtitle")
                .css("opacity", 1)
                .addClass("animate-subtitle-rise");
        }, 4000);
    }

    function showSlide(index) {
        const offset = -index * 100 + "%";
        $(".slides").css("transform", "translateX(" + offset + ")");
        animateSlideElements(index);
    }

    // Next/Prev button handlers
    $(".next").click(function () {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    });

    $(".prev").click(function () {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    });

    // Auto-slide every 15s
    setInterval(function () {
        $(".next").click();
    }, 15000);

    // Initial animation for the first slide
    showSlide(currentIndex);

    // --- Equipo slider logic (unchanged) ---
    var $slider = $('#equipo-slider .flex');
    var $dots = $('#equipo-dots button');
    var slides = $slider.children().length;
    var current = 0;
    var interval = null;

    function updateSlider() {
        $slider.css('transform', 'translateX(-' + (current * 100) + '%)');
        $dots.each(function(idx) {
            $(this).toggleClass('bg-primary-600', idx === current);
            $(this).toggleClass('bg-primary-300', idx !== current);
        });
    }

    function goToSlide(idx) {
        current = idx;
        updateSlider();
        resetInterval();
    }

    $dots.each(function(idx) {
        $(this).on('click', function() {
            goToSlide(idx);
        });
    });

    function nextSlide() {
        current = (current + 1) % slides;
        updateSlider();
    }

    function resetInterval() {
        if (interval) clearInterval(interval);
        interval = setInterval(nextSlide, 10000);
    }

    // Init
    updateSlider();
    resetInterval();
});
