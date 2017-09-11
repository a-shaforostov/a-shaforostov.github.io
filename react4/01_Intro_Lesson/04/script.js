window.onload = function() {

	const resultElement = document.querySelector('.result');
	const progressElement = document.querySelector('.progress-text');

	progressElement.innerText = '';
	resultElement.innerText = '';

	document.querySelector('form').addEventListener('submit', function(event) {
		event.preventDefault();

		let getResultGenerator = getMaxDied( event.currentTarget.elements.search.value );
		run(getResultGenerator);
	});

	function* fetchRequest(url) {

		const request = yield fetch(url);
		const json = yield request.json();
		return json;

	}

	function* getMaxDied(num) {

		progressElement.innerText = '';
		resultElement.innerText = '';

		// Получить запрошенную книгк
		progressElement.innerText = 'Получение данных книги...';
		const bookUrl = `https://anapioficeandfire.com/api/books/${num}`;
		const book = yield* fetchRequest(bookUrl);
		let houses = {};

		// Учесть данные каждого персонажа
		let counter = 0;
		for (let characterUrl of book.characters) {

			progressElement.innerHTML =
				`Получение данных персонажа ${++counter} из ${book.characters.length} из книги <a href="${bookUrl}">${book.name}</a>`;

			const char = yield* fetchRequest(characterUrl);
			if (char.died) {
				char.allegiances.forEach(item => houses[item] = (houses[item] || 0) + 1);
			}
		}

		// Найти дом с максимальным количеством погибших
		let maxUrl;
		Object.keys(houses).forEach( (house) => maxUrl = houses[house] > (houses[maxUrl] ||0) ? house : maxUrl);

		if (maxUrl) {
			progressElement.innerText = 'Получение данных дома...';
			let {name:houseName} = yield* fetchRequest(maxUrl);
			resultElement.innerHTML = `В доме <a href="${maxUrl}">${houseName}</a> количество погибших ${houses[maxUrl]}`;
		} else {
			resultElement.innerText = `Домов не найдено`;
		}
		progressElement.innerText = 'Процесс завершен.';

	}

	function run(generator) {

		function iterate({ done, value }) {
			if (done) {
				return value;
			}

			return value.then(data => iterate(generator.next(data)))
		}

		return iterate(generator.next());
	}

};
