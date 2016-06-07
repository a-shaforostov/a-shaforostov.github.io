//Класс слайдера
function Slider(element, frame) {
	this.frame = frame;
	this.imgs = element.querySelectorAll('.slider__scr');
	
	this.set(this.frame, 'block');
};	

Slider.prototype.set = function(frame, value) { // установка нужного фона слайдеру
	this.imgs[frame].style.display = value;
};

Slider.prototype.left = function() { // крутим на один кадр влево
	this.set(this.frame, 'none');
	this.frame--;
	if(this.frame < 0) this.frame = this.imgs.length-1;
	this.set(this.frame, 'block');
};

Slider.prototype.right = function() { // крутим на один кадр вправо
	this.set(this.frame, 'none');
	this.frame++;
	if(this.frame === this.imgs.length) this.frame = 0;
	this.set(this.frame, 'block');
};
//Класс слайдера


(function ($) {
	'use strict';
	
	$(function () {

		$('.grid').masonry({
			itemSelector: '.grid__item', 
			columnWidth: '.grid__sizer',
//			percentPosition: true,
			gutter: 1
		});
		
		var sliders = document.querySelectorAll('.slider');
		window.mySliders = [];
		for (var sl = 0; sl < sliders.length; sl++) {
			window.mySliders.push(new Slider(sliders[sl], sl));	
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
						
						// Масштабировать картинку плагином
						var $gridItem = $('.grid__item');
						var $gridItemImg = $gridItem.find('.grid__item-img');
						if ($gridItem.imagefill) {
							$gridItem.imagefill();
						} else {
							// Если плагин не доступен (ie8), то заполнить по ширине
							$gridItemImg.css({"width": "100%", "position": "relative"});

							for (var i = 0; i < $gridItem.length; i++) {
								// Если контейнер не заполнен, то заполнить по высоте
								if ($gridItem[i].offsetHeight > $gridItemImg[i].offsetHeight) {
									$($gridItemImg[i])
										.css({"height": "100%", "width": "", "position": "relative"});
								}
							}
							
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
//# sourceMappingURL=../maps/main.js.map
