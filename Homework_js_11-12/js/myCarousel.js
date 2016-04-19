// jQuery плагин
(function($) {

$(function() {
    var v1 = 10;
    $.fn.myCarousel = function(options) {
        // Трансформация элемента и превращение его в карусель
        this.addClass('clearfix');
        var $carouselList = this.find('ul').wrap('<div class="carousel-hider"></div>').attr('class', 'carousel-list clearfix');
        $carouselList.children('li').addClass('carousel-element');

        // Параметры карусели
        var defaults = {
            focusedElement: 2
        };
        var settings = $.extend({}, defaults, options);

        // Инициализация модели
        var $elements = this.find('.carousel-element');
        // var $carouselList = this.find('.carousel-list');
        var $leftButton = this.find('.carousel-left');
        var $rightButton = this.find('.carousel-right');
        var focusedElement = settings.focusedElement;
        if(focusedElement < 0) focusedElement = 0;
        if(focusedElement > $elements.length-1) focusedElement = $elements.length-1;

        // Инициализация вида
        $carouselList.css({left: 220-110*focusedElement+'px'});
        $($elements[focusedElement]).toggleClass('focused-element');
        if(focusedElement === 0) $leftButton.addClass('disabled-button');
        if(focusedElement === $elements.length-1) $rightButton.addClass('disabled-button');

        // Кнопка влево
        this.find('.carousel-left').on('click.myCarousel', function(e) {
            if(focusedElement === 0) return;
            $carouselList.finish();

            $($elements[focusedElement]).toggleClass('focused-element');
            $carouselList.animate({left: '+=110px'}, 600);
            $($elements[--focusedElement]).toggleClass('focused-element');

            $rightButton.removeClass('disabled-button');
            if(focusedElement === 0) $(this).addClass('disabled-button');
        });

        // Кнопка вправо
        this.find('.carousel-right').on('click.myCarousel', function(e) {
            if(focusedElement === $elements.length-1) return;
            $(this).removeClass('disabled-button');

            $carouselList.finish();
            $($elements[focusedElement]).toggleClass('focused-element');
            $carouselList.animate({left: '-=110px'}, 600);
            $($elements[++focusedElement]).toggleClass('focused-element');

            $leftButton.removeClass('disabled-button');
            if(focusedElement === $elements.length-1) $(this).addClass('disabled-button');
        });

        return this;
    };
});

})(jQuery);
