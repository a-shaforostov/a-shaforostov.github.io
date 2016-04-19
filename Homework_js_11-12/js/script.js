(function($) {
    $(function () {

        // Сгенерировать данные для шаблона
        var data = {items: []};
        var item;
        for (var i = 1; i <= 10; i++) {
            item = {};
            item.filename = ('0' + i).slice(-2) + '.jpg';
            item.caption = 'Элемент ' + i;
            data.items.push(item);
        }
        data.items[9].caption = 'Жора';

        // Преобразовать шаблон в HTML
        var listTemplate = $('#my-carousel-template').html();
        var listHTML = tmpl(listTemplate, data);
        $('.carousel-left').after(listHTML);

        // Сформировать карусель
        $('.my-carousel').myCarousel({focusedElement: 4});

    });
})(jQuery);
