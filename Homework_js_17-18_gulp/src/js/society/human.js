// Человек
function Human(prop) {
    var properties = prop || {};

    this.name = properties.name || 'John Doe';
    this.age = properties.age || 0;
    this.gender = properties.gender;
    this.tall = properties.tall;
    this.weight = properties.weight;
}
