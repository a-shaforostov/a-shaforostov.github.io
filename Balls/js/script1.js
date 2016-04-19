var G = 9.81; // Ускорение свободного падения
var SCALE = 20; // Масштаб (количество пикселов в метре)
var KSOPR = 0.35; // Ускорение, которое создает сила сопротивления

// Конструктор класса мяча
// @el {element} элемент DOM которому суждено стать мячом
// @options {object} объект с параметрами (подробнее в примере)
// result {object} возвращает объект мяча
function Ball(el, options) {
    var defaults = {
        //       X  Y
        coords: [0, 0],
        speed:  [17, 0],
        accel:  [-KSOPR, G],
        kupr: 0.55 // Коэффициент упругости мяча
    };
    // Сформировать параметры как микс умолчаний и опций
    var coords = options && options.coords ? options.coords : defaults.coords;
    var speed = options && options.speed ? options.speed : defaults.speed;
    var accel = options && options.accel ? options.accel : defaults.accel;
    var kupr = options && options.kupr ? options.kupr : defaults.kupr;

    // Приватные свойства
    var timeStamp;
    var intervalId;
    var endAnimationEvent;
    var rot = 0; // Начальный угол поворота
    var rotSpeed = 1; // Начальная скорость вращения

    // Запуск анимации (public)
    // @interval {number} интервал таймера. Чем меньше, тем лучше
    // @onEndAnimation {function(ball){}} Callback функция, в которую передается название мяча, который остановился.
    this.start = function(interval, onEndAnimation) {
        endAnimationEvent = onEndAnimation;
        timeStamp = performance.now();
        intervalId = setInterval(updateState, interval);
    };

    // Остановка анимации (public)
    this.stop = function() {
       clearInterval(intervalId);
    };

    // Пересчитывает изменение состояния за интервал времени с момента предыдущего запуска и обновляет свойства объекта
    var updateState = function() {
        // Действия с таймером
        var now = performance.now();
        var delta = (now - timeStamp)/1000; // Время, прошедшее с прошлого вызова, в секундах
        timeStamp = now;

        // Получение размера поля, доступного для движения мяча
        var parentEl = el.parentElement;
        var fieldSize = {
            w: (parentEl.clientWidth - el.offsetWidth)/SCALE,
            h: (parentEl.clientHeight - el.offsetHeight)/SCALE
        };

        // Пересчет координаты
        coords[0] = coords[0] + speed[0]*delta + accel[0]*Math.pow(delta,2)/2;
        coords[1] = coords[1] + speed[1]*delta + accel[1]*Math.pow(delta,2)/2;
        // Пересчет скорости
        speed[0] = speed[0] + accel[0]*delta;
        speed[1] = speed[1] + accel[1]*delta;

        // Если мяч остановился, остановить анимацию и вызвать callback
        // Мяч остановился если длина вектора скорости меньше определенного порога
        if ( Math.sqrt( Math.pow(speed[0],2) + Math.pow(speed[1],2) ) < .5 ) {
            el.style.top = fieldSize.h*SCALE+'px'; // Прижать мяч к грунту
            clearInterval(intervalId);
            endAnimationEvent(el.id);
            return;
        };

        // Проверка координаты X на выход за пределы родителя
        if (coords[0] <= 0 || coords[0] >= fieldSize.w) {
            coords[0] <= 0 ? coords[0] = 0 : coords[0] = fieldSize.w; // Вернуть мяч в границы поля
            speed[0] *= -kupr; // Развернуть вектор скорости в обратную сторону и применить коэфф. упругости мяча
            accel[0] *= -1; // Развернуть вектор ускорения. Оно обусловлено силой сопротивления и всегда действует противоположно скорости
            rotSpeed *= 0.3; // При касании вертикальной стены приостановить вращение
        }
        // Проверка координаты Y на выход за пределы родителя
        if (coords[1] <= 0 || coords[1] >= fieldSize.h) {
            coords[1] <= 0 ? coords[1] = 0 : coords[1] = fieldSize.h; // Вернуть мяч в границы поля
            speed[1] *= -kupr; // Развернуть вектор скорости в обратную сторону и применить коэфф. упругости мяча
            rotSpeed = 3.14*2*speed[0]/SCALE; // При касании земли скорректировать скорость вращения в пикселах
        };

        // Отрисовать изменения координат мяча
        el.style.left = coords[0]*SCALE+'px';
        el.style.top = coords[1]*SCALE+'px';
        // Повернуть мяч на скорость вращения
        rot += rotSpeed;
        el.style.transform = 'rotate('+rot+'deg)';
    };

    return this;
};

// Callback для вызова после завершения анимации мяча
function finalCallback(ball) {
    var res = document.querySelector('.result');
    var div = document.createElement('div');
    div.innerHTML = 'Завершилась анимация мяча '+ball;
    res.appendChild(div);
};

window.onload = function() {

// Первый мяч с дефолтными настройками
    var b1 = new Ball(document.getElementById('b1'));
    b1.start(10, finalCallback);

// Второй мяч с кастомными настройками
    var b2 = new Ball(document.getElementById('b2'), {
        coords: [370 / SCALE, 200 / SCALE], // Начальные координаты (в пикселах родительского элемента). Доступна ширина/высота родителя минус ширина/высота мяча
        speed: [360 / SCALE, -360 / SCALE], // Скорость пикс/сек. X вправо Y вверх
        accel: [-KSOPR, G], // Ускорение по X противоположно скорости, ускорение по Y - вниз
        kupr: 0.7 // Коэффициент упругости при отскакивания от стены. 0.8 - фитбол, 0.55 - футбол, 0.1 - кирпич
    });
    b2.start(10, finalCallback);
};
