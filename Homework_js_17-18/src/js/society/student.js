// Студент
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
