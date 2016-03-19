// Шаблон разметки
var BODY_INNER_WRAPPER =
'<div class="row">\n'+
'    <div class="col-lg-12">\n'+
'        <h4>Тест по программированию</h4>\n'+
'        <form action="#" id="test-form">\n'+
'            <div class="form-group btn-gr">\n'+
'                <input type="submit" value="Проверить мои результаты" class="btn btn-default">\n'+
'            </div>\n'+
'        </form>\n'+
'    </div>\n'+
'</div>\n';
// Создать внешний элемент - контейнер и поместить в него шаблон разметки
var containerElement = document.createElement('div');
containerElement.innerHTML = BODY_INNER_WRAPPER;
containerElement.classList.add('container');
// В шаблоне разметки найти форму, в которую будем помещать элементы
var formElement = containerElement.querySelector('#test-form');
// Создать группу контролов в которую будем добавлять контролы
var formControls = document.createElement('div');
formControls.classList.add('form-group');
// Переменная для хнарения созданного элемента
var currentElement;
// Цикл для каждого вопроса
for (var i = 1; i <= 3; i++) {
    // Создать заголовок вопроса
    currentElement = document.createElement('p');
    currentElement.innerHTML = 'Вопрос №'+i;
    // Добавить заголовок в группу контролов
    formControls.appendChild(currentElement);
    // В цикле создать варианты ответов
    for (var j = 1; j <= 3; j++) {
        // Создать вариант ответа и добавить его в группу контролов
        currentElement = document.createElement('input');
        currentElement.setAttribute('type', 'checkbox');
        formControls.appendChild(currentElement);
        // Создать и добавить текст варианта ответа
        formControls.appendChild(document.createTextNode('Вариант ответа №'+j));
        // Создать и добавить переход на новую строку
        formControls.appendChild(document.createElement('br'));
    }
}
// Вставить группу контролов в форму перед группой с кнопкой
formElement.insertBefore(formControls, formElement.firstChild);
// Вставить всю сформированную структуру в body
document.body.insertBefore(containerElement, document.body.firstChild);
