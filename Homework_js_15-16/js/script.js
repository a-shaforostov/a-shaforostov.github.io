(function($) {
    "use strict";

    $(function(){

        // По отправке формы заменить стандартный обработчик на загрузку данных через AJAX запрос
        $('.search-form form').on('submit', function(event) {

            $.ajax({

                url: "https://www.googleapis.com/customsearch/v1?q="+encodeURIComponent(this.elements[0].value)+"&key=AIzaSyDQq5I1_jJG2eKE78NEUM8GCBRwgXRW0F4&cx=000283222127530457480:fcqttmqm5o0&callback=?",
                dataType: "jsonp",
                success: function (data) {
                    if (data === null) {
                        $('#results').html("Ошибка");
                    } else {
                        // Преобразовать шаблон в HTML и поместить его в DOM
                        var template = $('#search-response').html();
                        var html = tmpl(template, data);
                        $('#results').html(html);
                    }
                }
            });

            event.preventDefault();

        });

        // Классы

        // Человек
        function Human(properties) {
            var properties = properties || {};

            this.name = properties.name || 'John Doe';
            this.age = properties.age || 0;
            this.gender = properties.gender;
            this.tall = properties.tall;
            this.weight = properties.weight;
        }

        // Работник
        function Worker(properties) {
            var properties = properties || {};

            // Вызов конструктора предка для инициализации свойств
            Human.apply(this, arguments);

            this.job = properties.job || 'unemployed';
            this.profit = properties.profit || 0;
        }

        Worker.prototype = Object.create(Human.prototype);
        Worker.prototype.constructor = Worker;
        Worker.prototype.work = function() {
            console.log("Leave me alone. I'm working hard.\nI'm " + this.age + " years old");
        };

        // Студент
        function Student(properties) {
            var properties = properties || {};

            // Вызов конструктора предка для инициализации свойств
            Human.apply(this, arguments);

            this.school = properties.school;
            this.grants = properties.grants || 0;
        }

        Student.prototype = Object.create(Human.prototype);
        Student.prototype.constructor = Student;
        Student.prototype.watchTV = function() {
            console.log("My name is " + this.name + ". I'm watching TV. Join to me.");
        };

        // Создание объектов
        var human = new Human();

        var worker = new Worker({
            name: 'Adam Smith',
            age: 45,
            tall: 178,
            weight: 85,
            job: 'Google, Inc.',
            profit: 5000
        });
        worker.work();

        var student = new Student({
            name: 'Mike Rowland',
            age: 20,
            school: 'MIT',
            grants: 500
        });
        student.watchTV();

        // Создать второго студента тогоже класса, что и первый
        var student2 = new student.constructor({
            name: 'Jim Hawkins',
            age: 19,
            school: 'Harvard University'
        });

        console.dir(human);
        console.dir(worker);
        console.dir(student);
        console.dir(student2);

    });

})(jQuery);
