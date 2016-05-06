// Включение файлов для модуля rigger
//= society/human.js
//= society/worker.js
//= society/student.js

(function($) {
    "use strict";

    $(function(){

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
