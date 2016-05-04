function GoogleCallback(func, data){
    console.log(arguments);
    window[func](data);
}

(function($) {
    "use strict";

    $(function(){

        $('.search-form form').on('submit', function(e) {

            $.ajax({
                url: "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&key=ABQIAAAACKQaiZJrS0bhr9YARgDqUxQBCBLUIYB7IF2WaNrkYqF0tBovNBQFDtM_KNtb3xQxWff2mI5hipc3lg&q="+encodeURIComponent(this.elements[0].value)+"&hl=en&rsz=large&callback=GoogleCallback&context=?",
                dataType: "jsonp",
                success: function (data) {
                    if (data === null) {
                        $('#results').html("Ошибка");
                    } else {
                        // Преобразовать шаблон в HTML и поместить его в DOM
                        var template = $('#search-response').html();
                        var html = tmpl(template, data);
                        $('#results').html(html);
                        console.log(data);
                    }
                }
            });
            event.preventDefault();
        });


    });

})(jQuery);
