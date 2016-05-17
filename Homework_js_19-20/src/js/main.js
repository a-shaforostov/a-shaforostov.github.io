// Включение файлов для модуля rigger
//= parts/coin-slider.js
//= parts/lodash.js
//= parts/data.js

(function($) {
    "use strict";

    $(function(){
        $('#coin-slider').coinslider({width: 1160, height: 470, delay: 5000});

        alert('Результат выполнения второго задания в консоли.');

        console.log('В угловых скобках <> дополнительные задачи.');
        console.log('Исходный объект: ', data);
        console.log('1. Взять все skills, объединить в один массив, <регистронезависимо> отсортировать, удалить дубликаты');
        var skills =
            _(data)                                             // Оборачиваем данные в обертку для вызова методов по цепочке
            .map('skills')                                      // Получить массив значений свойства skills
            .flatten()                                          // Из массива массивов получаем одномерный массив
            .sortBy(function (i) { return i.toLowerCase(); })   // Регистронезависимая сортировка
            .sortedUniq()                                       // Удаление дубликатов, оптимизированное для сортированных массивов
            .value();                                           // Разворачиваем объект в простые данные
        console.log(skills);

        console.log('2. Отсортировать людей по количеству друзей <и именам> и сформировать массив их имен, <в скобках указать кол-во друзей>');
        var names =
            _(data)
            .sortBy(['friends.length', 'name'])                                     // Сортируем сначала по количеству друзей, затем по имени
            // .map('name')                                                         // Получить массив имен
            .map( function (i) { return i.name + ' (' + i.friends.length + ')'; } ) // Получить массив имен с количеством друзей
            .value();
        console.log(names);

        console.log('3. Массив всех друзей всех пользователей. Люди не должны повторяться');
        var friends =
            _(data)
            .map('friends') // Получить массив всех друзей
            .flatten()      // Преобразовать массив массивов в одномерный массив
            .map('name')    // Из каждого элемента, являющегося объектом, взять значение поля "имя"
            .uniq()         // Удалить дубликаты
            .value();
        console.log(friends);

        $('.accordeon__item-mark').on('click', function(e) {
            $('.accordeon__item--expanded')
                .toggleClass('accordeon__item--expanded', false)
                .find('.accordeon__item-mark')
                .html('+');
            $(this)
                .html('-')
                .closest('.accordeon__item')
                .toggleClass('accordeon__item--expanded', true);
            return false;
        });
    });

})(jQuery);
