/*
 * #1
 * Напишите функцию, которая будет преобразовывать массив
 * со вложенными массивами в один плоский массив
 * EX:
 * in  : [1, [2, 3, [4, 5], [2, 4]], 3, [[2, [3, [1]], 4], [3]]]
 * out : [1, 2, 3, 4, 5, 2, 4, 3, 2, 3, 1, 4, 3]
*/

{
	const source = [1, [2, 3, [4, 5], [2, 4]], 3, [[2, [3, [1]], 4], [3]]];
	const result = [];

	function plain(item) {

		if (Array.isArray(item)) {
			item.forEach( child => plain(child) );
		} else {
			result.push(item);
		}

	}

	plain(source);
	console.log('#1. Плоский массив:', result);
}

/*
 * #2
 * Напишите функцию, которая будет преобразовывать
 * ключи объекта в camelCase
 * EX 1:
 * in  : { user_name: 'shar', is_logged_in: true }
 * out : { userName: 'shar', isLoggedIn: true }
 *
 * EX 2:
 * in  : { 'user NAME': 'shar', TYPE: true }
 * out : { userName: 'shar', type: true }
*/

{
	String.prototype.toCamelCase = function() {
		const source = this.toLowerCase();
		let result = '';

		for (let i = 0; i < source.length; i++) {

			result += ([' ', '_', '-'].indexOf(source[i]) !== -1) ? source[++i].toUpperCase() : source[i];

		}

		return result;
	};

	function camelObject(src, processor) {
		const obj = {};

		Object.keys(src).forEach( item => {

			obj[item.toCamelCase()] = processor ? processor(src[item]) : src[item];

		});

		return obj;
	}

	const in1 = { user_name: 'shar', is_logged_in: true };
	const in2 = { 'user NAME': 'shar', TYPE: true };
	console.log('#2. Преобразование в camel case:', camelObject(in1), camelObject(in2));

}

/*
 * #3
 * Усовершенствуйте функцию из задания выше так,
 * чтобы она работала и для вложенных структур тоже
 * EX:
 * in  : { all-users: [{ user_name: 'shar', info: { full_description: '42' } }] }
 * out : { allUsers: [{ userName: 'shar', info: { fullDescription: '42' } }] }
 *
 * P.S. Постарайтесь переиспользовать общую логику
*/

{
	// Замутно, но в функциональном стиле и с максимальным переиспользованием общей логики
	// В реальном проекте я бы так не делал
	const in1 = { 'all-users': [{ user_name: 'shar', info: { full_description: '42' } }] };
	console.log(
		'#3. Преобразование в camel case вложенных структур:',
		camelObject(in1, function processor(item) {
			return item instanceof Object ? camelObject(item, processor) : item;
		})
	);
}
