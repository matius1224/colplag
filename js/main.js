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
});
