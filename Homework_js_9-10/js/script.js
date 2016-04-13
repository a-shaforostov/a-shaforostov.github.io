(function($) {
    $(function() {
        // Main-menu
        $('.dropdown').hover(
            function() {
                $(this).children('.submenu')
                    .slideDown()
                    .animate({backgroundColor: "rgb(225, 75, 75)"}, {duration: 800, queue: false});
            },
            function() {
                $(this).children('.submenu')
                    .slideUp()
                    .animate({backgroundColor: "#000"}, {duration: 800, queue: false});
            }
        );

        // Carousel
        $('.jcarousel').jcarousel({
            // Configuration goes here
            center: true
        });

        $('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function() {
               $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-random')
            .on('click', function() {
                $('.jcarousel').jcarousel('scroll', Math.floor(Math.random() * (3 - 0 + 1) + 0));
                return false;
            });

            $('.jcarousel-control-next')
                .on('jcarouselcontrol:active', function() {
                    $(this).removeClass('inactive');
                })
                .on('jcarouselcontrol:inactive', function() {
                    $(this).addClass('inactive');
                })
                .jcarouselControl({
                    target: '+=1'
                });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .jcarouselPagination();

        var params = {
            changedEl: "#year",
            visRows: 6
        };
        cuSel(params);
    });

})(jQuery);
