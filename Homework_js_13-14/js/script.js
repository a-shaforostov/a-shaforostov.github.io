(function($) {
    "use strict";
    $(function() {
        // --------- код для выполнения после загрузки страницы ------------
        // Загрузить данные из localStorage
        var quizData = JSON.parse(localStorage.getItem('my-quiz-data'));

        initQuiz();

        // Обработчик закрытия модального окна
        $('.modal-window').on('click', function(e) {
            if(e.target.id === 'btnOk') {
                $(this).css('display', 'none');
                initQuiz();
            }
        });
        // ---------- код для выполнения после загрузки страницы -----------

        // Инициализация теста.
        function initQuiz() {
            // Преобразовать шаблон в HTML и поместить его в DOM
            var listTemplate = $('#my-quiz').html();
            var listHTML = tmpl(listTemplate, quizData);
            $('.quiz').html(listHTML);
            // Обработчики событий теста
            $('#btnCheckResult').on('click', checkResultEvent);
            $('#btnRestartQuiz').on('click', initQuiz);
        }

        function checkResultEvent() {
            var total = quizData.questions.length;
            var correct = 0;
            
            for(var curQuestionInd = 0; curQuestionInd < total; curQuestionInd++) {
                var $questionCheckBoxes = $('#quiz-q'+(curQuestionInd+1)+' input[type="checkbox"]');
                var curQuestion = quizData.questions[curQuestionInd];
                var wrongAnswer = false;

                for(var curOptionInd = 0; curOptionInd < curQuestion.correctAnswers.length; curOptionInd++) {
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
