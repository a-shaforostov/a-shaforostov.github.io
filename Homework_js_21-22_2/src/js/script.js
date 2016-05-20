(function($) {
    "use strict";

    $(function() {
        // --------- код для выполнения после загрузки страницы ------------
        // Загрузить данные из localStorage
        const quizData = JSON.parse( localStorage.getItem('my-quiz-data') );

        initQuiz();

        // Обработчик закрытия модального окна
        // Функция не записана по стрелке, потому что внутри используется this,
        // который в стрелочные функции не передается
        $('.modal-window').on('click', function(e)  {
            if(e.target.id === 'btnOk') {
                $(this).css('display', 'none');
                initQuiz();
            }
        });
        // ---------- код для выполнения после загрузки страницы -----------

        // Инициализация теста.
        function initQuiz() {
            // Преобразовать шаблон в HTML и поместить его в DOM
            const listTemplate = $('#my-quiz').html();
            const listHTML = tmpl(listTemplate, quizData);
            $('.quiz').html(listHTML);
            // Обработчики событий теста
            $('#btnCheckResult').on('click', checkResultEvent);
            $('#btnRestartQuiz').on('click', initQuiz);
        }

        function checkResultEvent() {
            let total = quizData.questions.length;
            let correct = 0;

            for(let curQuestionInd = 0; curQuestionInd < total; curQuestionInd++) {
                const $questionCheckBoxes = $('#quiz-q'+(curQuestionInd+1)+' input[type="checkbox"]');
                const curQuestion = quizData.questions[curQuestionInd];
                let wrongAnswer = false;

                for(let curOptionInd = 0; curOptionInd < curQuestion.correctAnswers.length; curOptionInd++) {
                    // Если если хотя бы один пункт не правильтый - ответ не правильный
                    if($questionCheckBoxes[curOptionInd].checked !== curQuestion.correctAnswers[curOptionInd]) {
                        wrongAnswer = true;
                        break;
                    }
                }
                correct += !wrongAnswer; // Учесть правильный ответ
            }

            // Показать результат
            $('#correct-count').html(correct);
            $('#total-count').html(total);
            $('.modal-window').css('display', 'block');
        }
    });
})(jQuery);
