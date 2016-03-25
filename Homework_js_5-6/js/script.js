var btnStart = document.querySelector('.timer__button-start');
var btnSplit = document.querySelector('.timer__button-split');
var btnReset = document.querySelector('.timer__button-reset');
var display = document.querySelector('.timer__display');
var pitStops = document.querySelector('.timer__pit-stops');
var counterValue; // Общее время работы таймера для отображения в счетчике
var startTime; // Засечка времени начала отсчета интервала на момент нажатия Старт
var runInterval; // Длительность работы от нажатия Старт до нажатия на Сплит или Стоп. Стоп сбрасывает интервал, а Сплит - нет
var stageCounter; // Порядковый номер для Stop/Split
var intervalID; // Идентификатор таймера
var runMode = false; // Режим работы. true - работает, false - стоит.

btnStart.addEventListener('click',
    function () {
        if (runMode) {
            // Stop
            appendShot('Stop');
            btnStart.innerHTML = 'Start';
            stopTimer();
        } else {
            // Start
            btnStart.innerHTML = 'Stop';
            startTime = Date.now();
            counterValue += runInterval;
            startTimer();
        }
    }
);

btnSplit.addEventListener('click',
    function() {
        if (runMode) appendShot('Split');
    }
)

btnReset.addEventListener('click', btnResetHandler);

btnResetHandler();

/* Конец выполнения скрипта */

/* Объявление функций */

function btnResetHandler() {
    stopTimer();
    display.innerHTML = format(0);
    pitStops.innerHTML = '';
    stageCounter = 1;
    counterValue = runInterval = 0;
    btnStart.innerHTML = 'Start';
}

function timerHandler(e) {
    runInterval = Date.now() - startTime;
    display.innerHTML = format(counterValue + runInterval);
}

function startTimer() {
    intervalID = setInterval(timerHandler, 27);
    runMode = true;
}

function stopTimer() {
    clearInterval(intervalID);
    runMode = false;
}

function format(ms) {
    // Преобразовать интервал в строку без учета временной зоны. Затем найти фрагмент 00:00:00 и поместить его в d
    var d = new Date(ms).toUTCString().replace(/.*([0-9][0-9]:[0-9][0-9]:[0-9][0-9]).*/,'$1');
    // Выделить милисекунды и дополнить нулями слева до 3-х знаков
    var x = String(ms % 1000);
    while(x.length < 3) x='0'+x;
    // Присоединить милисекунды в span для форматирования
    d += '.<span>' + x + '</span>';
    return d;
}

function appendShot(label) {
    // Сгенерировать составные части строки - метки времени
    var txt = [stageCounter++, label, format(runInterval)];
    // Создать элемент
    var newElem;
    newElem = document.createElement('p');
    // Заполнить его текстом составленным из составных частей, разделенных пробелом
    newElem.innerHTML = txt.join(' ');
    // Вставить в DOM
    pitStops.appendChild(newElem);
}