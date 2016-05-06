// Работник
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
