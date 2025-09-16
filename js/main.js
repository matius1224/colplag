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

    function showSlide(index) {
        const offset = -index * 100 + "%";
        $(".slides").css("transform", "translateX(" + offset + ")");
    }

    $(".next").click(function () {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);

    });

    $(".prev").click(function () {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    });

    setInterval(function () {
        $(".next").click();
    }, 15000);

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
