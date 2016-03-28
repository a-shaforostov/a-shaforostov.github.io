/*********************************************************************************************************************/
/* Обявление переменных                                                                                              */
/*********************************************************************************************************************/
var AVAILABLE_VALUES = ['red', 'blue', 'green', 'yellow', 'brown', 'pink']; // Список используемых значений цветов
var ATTEMPTS = 8; // Количество попыток. Оптимально - 8

var currentRow; // Номер текущей строки игрового поля, с которой взаимодействует Игрок
var currentRowData; // Цвета фишек, установленных в текущей строке
var currentRowResult; // Цвета фишек результата проверки текущей строки
var hiddenValues = []; // Массив загаданных значений
var stats = { // Данные статистики
    totalGames: 0,
    totalWins: 0,
    record: 0,
    _sum: 0,
    average: 0
}

var hiddenPanel = {}; // Элементы DOM панели с загаданными цветами
var currentRowEl = {}; // Элементы DOM текущей строки
var selectPinsEl = document.querySelector('.select-pins'); // Элемент DOM строки, из которой пользователь выбирает цвета
var roadEl; // Элемент DOM, в который будут помещаться строки игрового поля
var statsEl = {}; // Элементы DOM панели статистики
var scoresBtn = {}; // Элементы DOM кнопки Начать/Сдаться
var finalScreen = {}; // Элементы DOM финального экрана Выиграл/Проиграл

// Флаг, который показывает, игра в процессе или нет. При изменении состояния вносит изменения во внешний вид поля
// Замыкание с внутренней переменной и getter/setter в виде одной функции
// При вызове без параметров работает как getter
// При вызове с параметром работает как setter. Выполняется side-effect
var gamePlaying = (function () {
    var flag = false;
    return function(value) {
        if (typeof value === 'undefined') return flag;
        flag = value;
        if (value) { // Если раунд начинается - включить режим игры (показать нижние фишки)
            selectPinsEl.style.opacity = 1;
            selectPinsEl.style.cursor = 'pointer';
        } else { // Если раунд заканчивается - выключить режим игры (спрятать нижние фишки)
            selectPinsEl.style.opacity = 0;
            selectPinsEl.style.cursor = 'default';
        }
        return flag;
    }
})();

/*********************************************************************************************************************/
/* Инициализация игры и установка обработчиков событий                                                               */
/*********************************************************************************************************************/

initGame();

// Нажатие на фишке на панели выбора устанавливает фишку этого цвета в первую свободную ячейку
selectPinsEl.addEventListener('click',
    function(e) {
        // Обрабатывать только нажатие на фишку
        if (e.target.nodeName !== 'LI') return;
        // Установить цвет в памяти и в DOM
        var firstEmptyIndex = findFirstPlace();
        if (firstEmptyIndex !== -1 && gamePlaying()) {
            currentRowData[firstEmptyIndex] = e.target.dataset.color;
            currentRowEl.pins[firstEmptyIndex].className = 'pin '+ currentRowData[firstEmptyIndex] + '-pin';
        }
    }
)

// Элемент игрового поля обрабатывает нажатие на кнопке проверки. Нажатие на фишке в текущей строке убирает ее с поля
roadEl.addEventListener('click',
    function(e) {
        if (e.target === currentRowEl.applyButton) { // Если нажата кнопка Применить в текущей строке
            if (!checkRow() || !gamePlaying()) return; // Если заполнены не все ячейки или мы не в процессе игры

            if (currentRowResult[3] === 'black') { // Если угаданы все цвета - это победа
                closeRound(true);
            } else if (currentRow === ATTEMPTS) { // Если это была последняя попытка - это поражение
                closeRound(false);
            } else { // Игра продолжается - перейти на новую строку
                newRow();
            }
        }
        // Если нажата кнопка цвета в текущей строке и результат еще не подтвержден и игра в процессе
        // Удаляем цвет с поля
        if (e.target.classList.contains('pin') && currentRowEl.row.contains(e.target) && !currentRowEl.checked && gamePlaying()) {
            var col = e.target.dataset.col; // Определить колонку
            currentRowData[col-1] = 'empty'; // Очистить ячейку в данной позиции
            e.target.className = "pin empty-pin"; // Отобразить изменение на поле
        }

    }
)

// Обработка нажатия на кнопке запуска/прекращения игры
scoresBtn.panel.addEventListener('click',
    function (e) {
        if (gamePlaying()) { // В процессе игры (сдаться)
            closeRound(false);
            //createRows();
        } else { // Игра не начата (начать игру)
            initRound();
        }
    }
)

// Нажатие в любой точке экрана результата закрывает его
finalScreen.screen.addEventListener('click',
    function() {
        finalScreen.screen.setAttribute('hidden', '');
    }
)

/*********************************************************************************************************************/
/* Здесь выполнение программы заканчивается. Вся работа производится в событиях. Дальше идет объявление функций      */
/*********************************************************************************************************************/

/**
 * Инициализирует игру. Заполняет переменные элементами DOM. Запускается один раз в начале работы скрипта
 *
 * @param Параметры не использует
 * @return Ничего не возвращает
 */
function initGame() {
    // Сформировать ссылки на элементы страницы
    hiddenPanel.panel = document.querySelector('.hidden-area');
    hiddenPanel.items = hiddenPanel.panel.querySelectorAll('.hidden-pins > li');
    roadEl = document.querySelector('.road');
    scoresBtn.panel = document.querySelector('.scores__btn');
    scoresBtn.image = scoresBtn.panel.querySelector('.scores__game-control');
    scoresBtn.caption = scoresBtn.panel.querySelector('.scores__caption');
    finalScreen.screen = document.querySelector('.final-screen');
    finalScreen.dialog = finalScreen.screen.querySelector('.final-screen__dialog');
    finalScreen.image =  finalScreen.dialog.querySelector('i');
    finalScreen.pins = finalScreen.dialog.querySelectorAll('li');
    statsEl.totalGames = document.querySelector('.scores__attempts');
    statsEl.totalWins = document.querySelector('.scores__wins');
    statsEl.record = document.querySelector('.scores__record');
    statsEl.average = document.querySelector('.scores__average');
    // Выключить режим игры
    gamePlaying(false);
    // Создать строки игрового поля
    createRows();
}

/**
 * Запускает очередной раунд игры. Генерирует цвета, которые нужно угадать. Приводит в начальное состояние игровое поле
 *
 * @param Параметры не использует
 * @return Ничего не возвращает
 */
function initRound () {
    var rnd;
    for (var i = 0; i < 4; i++) {
        rnd = Math.floor(Math.random() * (5 - 0 + 1)) + 0; // rnd 0..5
        hiddenValues[i] = AVAILABLE_VALUES[rnd];
        hiddenPanel.items[i].className = 'pin ' + hiddenValues[i] + '-pin';
    }
    currentRow = 0;

    gamePlaying(true);
    scoresBtn.image.style.backgroundImage = 'url(img/White_flag.png)';
    scoresBtn.caption.innerHTML = 'Сдаюсь!!!';

    if(stats.totalGames !== 0) createRows();
    newRow();
}

/**
 * Переходит к следующей строке (попытке). Инициализирует переменные ссылками на DOM текущей строки
 *
 * @param Параметры не использует
 * @return Ничего не возвращает
 */
function newRow() {
    // Делаем текущую строку неактивной
    if(!!currentRowEl.rowNumber) {
        currentRowEl.rowNumber.style.color = 'yellow';
    }

    // Переходим к следующей строке
    currentRow++;

    // Заполняем элементы текущей строки, с которыми будем работать
    currentRowEl.row = document.querySelector('.row-'+currentRow);
    currentRowEl.pins = currentRowEl.row.querySelectorAll('.pins > li');
    currentRowEl.answers = currentRowEl.row.querySelectorAll('.answers > li');
    currentRowEl.applyButton = currentRowEl.row.querySelector('.check-button');
    currentRowEl.rowNumber = currentRowEl.row.querySelector('.numbers');
    currentRowEl.checked = false;

    // Инициализируем данные строки
    currentRowData = ['empty', 'empty', 'empty', 'empty'];
    currentRowResult = [];

    // Делаем новую строку активной
    currentRowEl.rowNumber.style.color = 'white';
}

/**
 * Проверяет предложенные цвета текущей строки на совпадение с загаданными. Результат выводит на панель результата.
 *
 * @param Параметры не использует
 * @return {boolean} Возвращает true если все заполнено корректно и результат проверен, иначе false.
 */
function checkRow() {
    // Если есть незаполненные ячейки, проверка результата не производится
    if (findFirstPlace() !== -1) return false;

    // Копируем массив загаданных значений. Он будет портиться во время проверки.
    var sample = hiddenValues.slice();
    // Проверить наличие полных совпадений
    for(var i = 0; i < 4; i++) {
        if (sample[i] === currentRowData[i]) {
            // Для каждого полного совпадения добавляем черный цвет
            currentRowResult.push('black');
            // Удаляем значения, сохраняя все индексы в массиве. Измененные значение больше не должны совпадать.
            // Поэтому присваиваем два заведомо различных значения
            sample[i] = '+';
            currentRowData[i] = '-';
        }
    }
    // Проверить наличие неполных совпадений (цвет есть, но в другой позиции)
    for(var i = 0; i < 4; i++) { // Обходим массив образцов
        for(var j = 0; j < 4; j++) { // Обходим проверяемый массив
            if (sample[i] === currentRowData[j]) {
                // Для каждого полного совпадения добавляем черный цвет
                currentRowResult.push('white');
                // Удаляем значения, сохраняя все индексы в массиве. Измененные значение больше не должны совпадать.
                // Поэтому присваиваем два заведомо различных значения
                sample[i] = '+';
                currentRowData[j] = '-';
            }
        }
    }
    // Здесь имеем массив результатов проверки вида ['black', 'white', 'white']
    // Отражаем результат в DOM. Выводим все цветные метки, затем все пустые.
    var i;
    for(i = 0; i < currentRowResult.length; i++) {
        currentRowEl.answers[i].className = 'answer answer-' + currentRowResult[i];
    }
    for(;i < 4; i++) {
        currentRowEl.answers[i].className = 'answer answer-empty';
    }
    // Прячем кнопку
    currentRowEl.applyButton.style.opacity = '0';

    return currentRowEl.checked = true;
}

/**
 * Формирует игровое поле
 *
 * @param Параметры не использует
 * @return Ничего не возвращает
 */
function createRows() {
    var rows = document.createDocumentFragment();
    for(var i = ATTEMPTS; i; i--) {
        var row = document.createElement('li');
        row.className = 'clearfix row-' + i;
        rows.appendChild(row);
        row.innerHTML =
            '   <div class="numbers">' + i + '</div>\
                    <ul class="pins">\
                        <li class="pin empty-pin" data-col="1"></li>\
                        <li class="pin empty-pin" data-col="2"></li>\
                        <li class="pin empty-pin" data-col="3"></li>\
                        <li class="pin empty-pin" data-col="4"></li>\
                    </ul>\
                <div class="clearfix answers-pane">\
                    <ul class="answers">\
                        <li class="answer answer-empty"></li>\
                        <li class="answer answer-empty"></li>\
                        <li class="answer answer-empty"></li>\
                        <li class="answer answer-empty"></li>\
                    </ul>\
                    <span class="check-button" data-row="' + i + '"></span>\
                </div>'
    }
    document.querySelector('.road').innerHTML = '';
    document.querySelector('.road').appendChild(rows);
}

/**
 * Ищет позицию первой свободной ячейки в текущей строке
 *
 * @param Параметры не использует
 * @return {number} Возвращает индекс первой свободной ячейки (0-3) или -1, если пустых ячеек нет.
 */
function findFirstPlace() {
    return currentRowData.indexOf('empty');
}

/**
 * Завершает раунд и переводит игру в "неигровой" режим. Выводит экран результата, пересчитывает и отображает статистику
 *
 * @param {boolean} res. true - закончить раунд победой, false - закончить раунд поражением
 * @return Ничего не возвращает.
 */
function closeRound(res) {
    gamePlaying(false); // Остановить раунд

    // Включить кнопку Начать
    scoresBtn.image.style.backgroundImage = 'url(img/ICheckFlag.png)';
    scoresBtn.caption.innerHTML = 'Начать раунд';

    // Показать окно окончания раунда с соответствующим результатом
    finalScreen.image.style.backgroundImage = res ? 'url(img/cup1.png)' : 'url(img/Lose.png)';
    for(var i = 0; i < 4; i++) {
        finalScreen.pins[i].className = 'pin ' + hiddenValues[i] + '-pin';
    }
    finalScreen.screen.removeAttribute('hidden');

    // Произвести расчеты статистики
    stats.totalGames++; // +1 игра
    stats.totalWins += res; // +1 победа (если победа)
    stats._sum += currentRow * res; // добавить результат к сумме в случае победы
    stats.average = (stats.totalWins === 0) ? 0 : +(stats._sum / stats.totalWins).toFixed(2); // расчет среднего показателя
    // В случае победы пересмотреть рекорд
    // Если проигрыш, то деление на 0 даст Infinity, а это заведомо больше, чем текущий рекорд.
    // Значит проигрыш не повлияет на рекорд
    // Если текущий рекорд == 0, то работаем с текущим результатом. Иначе с сохраненным рекордом
    stats.record = Math.min(!!stats.record ? stats.record : currentRow * res, currentRow / res);
    updateStats();
}

/**
 * Отображает в DOM рассчитанные результаты статистики
 *
 * @param Не использует параметры.
 * @return Ничего не возвращает.
 */
function updateStats() {
    statsEl.totalGames.innerHTML = stats.totalGames;
    statsEl.totalWins.innerHTML = stats.totalWins + ' <small><small>(' + (stats.totalWins * 100 / stats.totalGames).toFixed(0) + '%)</small></small>';
    statsEl.record.innerHTML = stats.record;
    statsEl.average.innerHTML = stats.average;
}