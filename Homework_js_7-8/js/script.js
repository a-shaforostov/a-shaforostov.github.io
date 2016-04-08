$(function() {

    // ----- Закладки -----
    var $tabs = $('.tab');

    $tabs.on('click', function(e) {
        // Не обрабатывать нажатие на активной закладке
        if (this.classList.contains('active-tab')) return;

        // Получить активную вкладку и ее номер
        var $activeTab = $('.active-tab');
        var ti = $activeTab.attr('data-tab-index');

        // Сделать ее неактивной и спрятать текст
        $('.tab-body[data-tab-index="'+ti+'"]').slideToggle();
        $('.active-tab').removeClass('active-tab');

        // Сделать активной текущую вкладку
        $activeTab = $(this);
        $activeTab.addClass('active-tab');

        ti = $activeTab.attr('data-tab-index');
        $('.tab-body[data-tab-index="'+ti+'"]').slideToggle();

        e.preventDefault();
    });

    // ----- Подсказки -----
    var $form = $('.form');
    var $formFS = $form.find('.fieldset');

    $formFS.on('focusin mouseenter', 'input', function(e) {
        $('.hint').stop(true, true);
        var $hint = $(this.parentNode).find('.hint');
        $hint.fadeIn();
    });

    $formFS.on('focusout mouseleave', 'input', function(e) {
        // Если элемент в фокусе - не убирать подсказку
        if (this === document.activeElement) return;

        var $hint = $(this.parentNode).find('.hint');
        $hint.stop(true, true).fadeOut();
    });

    $form.on('click', '#show-help',function(e) {
        $('.hint').stop(true, true).fadeIn();
    });
});
