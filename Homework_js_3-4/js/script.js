var pageFactory = {
    // Шаблон разметки
    BODY_INNER_WRAPPER:
    '<div class="row">\n'+
    '    <div class="col-lg-12">\n'+
    '        <h4>Тест по программированию</h4>\n'+
    '        <form action="#" class="test-form">\n'+
    '            <div class="form-group btn-gr">\n'+
    '                <input type="submit" value="Проверить мои результаты" class="btn btn-default">\n'+
    '            </div>\n'+
    '        </form>\n'+
    '    </div>\n'+
    '</div>\n',

    createContainer: function () {
        var Element = document.createElement('div');
        Element.innerHTML = this.BODY_INNER_WRAPPER;
        Element.classList.add('container');
        return Element;
    },

    createControlGroup: function (classes) {
        var Element = document.createElement('div');
        Element.classList.add(classes);
        return Element;
    },

    createControls: function (parentElement) {
        // Переменная для хранения созданного элемента
        var currentElement, label, checkBox, textNode;
        // Цикл для каждого вопроса
        for (var i = 1; i <= 3; i++) {
            // Создать заголовок вопроса
            currentElement = document.createElement('p');
            currentElement.innerHTML = 'Вопрос №'+i;
            // Добавить заголовок в группу контролов
            parentElement.appendChild(currentElement);
            // В цикле создать варианты ответов
            for (var j = 1; j <= 3; j++) {
                // Создать вариант ответа и добавить его в группу контролов
                currentElement = parentElement.appendChild(document.createElement('div'));
                currentElement.classList.add('radio');
                label = currentElement.appendChild(document.createElement('label'));
                checkBox = label.appendChild(document.createElement('input'))
                checkBox.setAttribute('type', 'checkbox');
                textNode = label.appendChild(document.createTextNode('Вариант ответа №'+j));
            }
        }
    },

    createContent: function (parentElement) {
        // Создать внешний элемент - контейнер и поместить в него шаблон разметки
        var containerElement = pageFactory.createContainer();
        // Создать группу контролов в которую будем добавлять контролы
        var formControls = pageFactory.createControlGroup('form-group');
        // Сформировать элементы управления в группе
        pageFactory.createControls(formControls);
        // В шаблоне разметки найти форму, в которую будем помещать элементы
        var formElement = containerElement.querySelector('.test-form');
        // Вставить группу контролов в форму перед группой с кнопкой
        formElement.insertBefore(formControls, formElement.firstChild);
        // Вставить всю сформированную структуру в parentElement как первый элемент
        parentElement.insertBefore(containerElement, parentElement.firstChild);
    }
}

pageFactory.createContent(document.body);

// На страницу можно поместить несколько разделов и каждый заполнить контентом
// Для этого вместо body в функцию нужно передать блок, в который нужно вставить контент
// pageFactory.createContent(document.querySelector('#test1'));
// pageFactory.createContent(document.querySelector('#test2'));
