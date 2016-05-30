(function ($) {
	'use strict';
	$(function () {

		var $grid = $('.grid');
		if ($grid.masonry) {
			$grid.masonry({
				itemSelector: '.grid-item', 
				columnWidth: 300
			});
		}
		
		var isPicturesReceived = false;
		
		function getPictures (request) {
			var q = request ? '&q='+encodeURIComponent(request) : '';
			$.ajax({

				url: "https://pixabay.com/api/?key=2654122-2e7cfe65e4216a71a55f9c97a&image_type=photo"+q+"&callback=?",
				dataType: "jsonp",
				success: function (data) {
					
					if (data) {
						
						for (var i = 0; i < 7; i++) {
							var $img = $('.grid__item--'+(i+1)+' .grid__item-img');
							if (data.hits[i]) {
								$img[0].src = data.hits[i].webformatURL;
								$img.parent().find('.grid__caption').html(data.hits[i].tags);
							} else {
								$img[0].src = '';
								$img.parent().find('.grid__caption').html('Empty');
							}
						}
						
						var $gridItem = $('.grid__item');
						if ($gridItem.imagefill) {
							$gridItem.imagefill();
						} else {
							$gridItem.find('.grid__item-img').css({"width": "100%"});
						}
						
						isPicturesReceived = true;
					}
				}
			});

		}

		// Сервис работает ненадежно
		// Повторяем попытку загрузить пока не загрузится
		// Проблемы загрузки можно увидеть в консоли
		function refreshGrid(request) {
			
			getPictures(request);
			
			if (!isPicturesReceived) {
				
				var tryInterval = setInterval( 
					function () {
						if (isPicturesReceived) {
							clearInterval(tryInterval);
						} else {
							getPictures(request);
						}
					}, 2000);
			}
			
		}
		
		refreshGrid();
		
		$('.request-area .round-button').on('click', function (e) {
			var r = $('.request-area input').val();
			refreshGrid(r);
//			e.stopImmediatePropagation();
//			e.preventDefault();
		});

	});
})(jQuery);