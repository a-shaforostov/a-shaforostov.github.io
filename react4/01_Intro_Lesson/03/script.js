window.onload = function() {

	let movies;
	let orderField = 'id';
	let ascOrder = true;
	let currentPage = 1;
	let query;

	orderByField('id');

	const paginationEl = document.querySelector('.pagination-block');
	paginationEl.style.display = 'none';

	document.getElementsByTagName('thead')[0].addEventListener('click', function(event) {
		orderField = event.target.dataset['field'];
		orderByField(orderField);
	});

	document.forms[0].addEventListener('submit', function(event) {
		event.preventDefault();
		query = event.currentTarget.elements.search.value;
		if (query) {
			currentPage = 1;
			getMovies();
		}
	});

	document.querySelector('.pagination-block select').addEventListener('change', function(event) {
		currentPage = event.target.value;
		getMovies();
	});

	function orderByField() {
		let items = document.querySelectorAll('.field-caption>div');
		let currentItem = document.querySelector(`.field-caption>div[data-field="${orderField}"]`);
		let classes = Array.from(currentItem.classList);

		if (classes.indexOf('asc') !== -1) {

			currentItem.classList.remove('asc');
			currentItem.classList.add('desc');
			ascOrder = false;

		} else {

			if (classes.indexOf('desc') !== -1) {

				currentItem.classList.remove('desc');
				currentItem.classList.add('asc');
				ascOrder = true;

			} else {

				items.forEach(item => {
					item.className = '';
				});
				currentItem.classList.add('asc');
				currentItem.classList.add('ordered');
				ascOrder = true;

			}
		}

		if (movies) {
			// Изменить сортировку и отобразить
			render( orderArray(movies, orderField, ascOrder) );
		}
	}

	function getMovies() {

		return fetchRequest(`https://api.themoviedb.org/3/search/movie?api_key=6cbafac50ae57075cbc3591600facdb4&language=en-US&query=${query}&page=${currentPage}&include_adult=false`)
			.then(moviesJSON => {
				movies = moviesJSON;
				if (currentPage === 1) updatePagination(movies.total_pages);
				render( orderArray(movies, orderField, ascOrder) );
			});

	}

	function render(movies) {
		console.log(movies);
		const placeholder = document.getElementsByTagName('tbody')[0];
		placeholder.innerHTML = '';

		if (movies.length) {
			movies.forEach(movie => {
				const {id, title, original_language, popularity, vote_count, vote_average, release_date} = movie;
				const template = eval('`' + document.getElementById('row-template').innerHTML + '`');
				let newEl = document.createElement('tr');
				newEl.innerHTML = template;
				placeholder.appendChild(newEl);
			});
		} else {
			let newEl = document.createElement('tr');
			newEl.innerHTML = `<td colspan="7" style="text-align:center">Ничего не найдено</td>`;
			placeholder.appendChild(newEl);
		}

	}

	function updatePagination(pages) {

		const paginationEl = document.querySelector('.pagination-block');

		paginationEl.style.display = pages > 1 ? 'block' : 'none';

		let options = '';
		for (let i = 1; i <= pages; i++) {
			options += `<option value="${i}" ${i===currentPage ? 'selected' : ''}>${i}</option>`;
		}

		paginationEl.querySelector('select').innerHTML = options;
		paginationEl.querySelector('.total-pages').innerText = pages;
	}

	function orderArray(array, field, asc) {
		let newArray = [...array.results];

		newArray.sort( (a, b) => {
			return boolToSignedInt( (asc && a[field] > b[field]) || (!asc && a[field] < b[field]) );
		});

		return newArray;

		function boolToSignedInt(b) {
			return +b*2-1;
		}

	}

	function fetchRequest(url) {

		return fetch(url).then(request => request.json());

	}

};