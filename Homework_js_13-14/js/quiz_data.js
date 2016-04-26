// Самовызываемая анонимная функция делает недоступной переменную с данными за ее пределами
// Данные можно будет получить только через локально хранилище
(function() {
    "use strict";
    var quizData = {
        caption: "Тест по геометрии",
        questions: [
            {
                question: "Какие фигуры не имеют углов?",
                answers: ["Круг", "Квадрат", "Прямоугольник", "Эллипс", "Треугольник"],
                correctAnswers: [true, false, false, true, false]
            },
            {
                question: "Какие фигуры не имеют площади?",
                answers: ["Круг", "Линия", "Луч", "Окружность", "Овал"],
                correctAnswers: [false, true, true, true, false]
            },
            {
                question: "Какая площадь квадрата со стороной 10см?",
                answers: ["100 см2", "1000 см2", "0.01 м2", "1 м2"],
                correctAnswers: [true, false, true, false]
            },
            {
                question: "Какие бывают линии в треугольнике?",
                answers: ["Высота", "Медиана", "Касательная", "Биссектриса", "Диагональ"],
                correctAnswers: [true, true, false, true, false]
            },
            {
                question: "Сколько можно получить углов, если разделить треугольник прямой линией?",
                answers: ["4", "5", "6", "7"],
                correctAnswers: [false, false, true, true]
            }
        ]
    };

    localStorage.setItem('my-quiz-data', JSON.stringify(quizData));

})();
