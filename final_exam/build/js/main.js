// Код, который запускается при загрузке скрипта
window.onload = documentReady;
// Код, который запускается при загрузке скрипта
// ---------------------------------------------


// Получение картинок с сервиса 

// Запросить картинки по запросу
function getPictures (request) {
	var docHead = document.getElementsByTagName('head')[0]; // For IE8-
	var q = request ? '&q='+encodeURIComponent(request) : '';
	var elem = document.getElementById('pixabayRequest');
	if (elem) { docHead.removeChild(elem); }
	elem = document.createElement("script");
	elem.id = 'pixabayRequest';
	elem.src = "https://pixabay.com/api/?key=2654122-2e7cfe65e4216a71a55f9c97a&image_type=photo"+q+"&callback=onData";
	docHead.appendChild(elem);
}

// Обработчик на получение данных JSONP
function onData(data) {
	if (data) {

		// Заполнить картинками
		var grid = document.querySelector('.grid');
		for (var i = 0; i < 7; i++) {
			var img = grid.querySelector('.grid__item--'+(i+1)+' .grid__item-img');
			if (data.hits[i]) {
				img.src = data.hits[i].webformatURL;
				img.parentNode.querySelector('.grid__caption').innerHTML = data.hits[i].tags;
				img.setAttribute('data-width', data.hits[i].webformatWidth);
				img.setAttribute('data-height', data.hits[i].webformatHeight);
			} else {
				img.src = '';
				img.parentNode.querySelector('.grid__caption').innerHTML = 'Empty';
				img.setAttribute('data-width', 0);
				img.setAttribute('data-height', 0);
			}
		}

		// Масштабировать картинки
		var gridItems = grid.querySelectorAll('grid__item');
		for (var i = 0; i < gridItems.length; i++) {
			var el = gridItems[i];
			var refH = el.offsetHeight;
			var refW = el.offsetWidth;

			var imgH = el.getElementsByTagName("img")[0].getAttribute('data-height');
			var imgW = el.getElementsByTagName("img")[0].getAttribute('data-width');
			
			if (imgH-refH > imgW-refW) {
				el.classList.add("grid__item--portrait");
				el.classList.remove("grid__item--landscape");
			} else {
				el.classList.add("grid__item--landscape");
				el.classList.remove("grid__item--portrait");
			}
		}
	}
}
// Получение картинок с сервиса 


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


// Функция запускается после загрузки документа
function documentReady() {

	// Инициализация Masonry
	var msnry = new Masonry('.grid', {
		itemSelector: '.grid__item',
		columnWidth: '.grid__sizer',
		gutter: 1
	});

	// Инициализация слайдеров
	var sliders = document.querySelectorAll('.slider');
	window.mySliders = [];
	for (var sl = 0; sl < sliders.length; sl++) {
		window.mySliders.push(new Slider(sliders[sl], sl));	
	}

	// Загрузка картинок по пустому запросу
	getPictures();

	// Кроссбраузерная установка обработчика на кнопку запроса картинок
	Event.add(
		document.querySelector('.request-area .round-button'), 
		'click', 
		function (e) {
			var elem = document.querySelector('.request-area input');
			getPictures(elem.value);
		}
	);
}

//# sourceMappingURL=../maps/main.js.map
