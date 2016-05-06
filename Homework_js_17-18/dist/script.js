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
;// Человек
function Human(prop) {
    var properties = prop || {};

    this.name = properties.name || 'John Doe';
    this.age = properties.age || 0;
    this.gender = properties.gender;
    this.tall = properties.tall;
    this.weight = properties.weight;
}
;// Студент
function Student(prop) {
    var properties = prop || {};

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
;// Работник
function Worker(prop) {
    var properties = prop || {};

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
