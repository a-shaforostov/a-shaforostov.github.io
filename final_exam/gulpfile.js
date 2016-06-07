'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
	 imagemin = require('gulp-imagemin'),
	 spritesmith = require('gulp.spritesmith'),
	 plumber = require('gulp-plumber'),
	 rename = require('gulp-rename'),
	 mqRemove = require("gulp-mq-remove"),
    sourcemaps = require('gulp-sourcemaps'),
    htmlmin = require('gulp-htmlmin'),
    watch = require('gulp-watch');

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
       html: 'build/',
       js: 'build/js/',
       css: 'build/css/',
       img: 'build/img/',
		 sprites: 'build/img/sprites/',
       fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
       html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
       js: 'src/js/*.js',//В стилях и скриптах нам понадобятся только main файлы
       style: 'src/css/main.css',
       scss: 'src/css/main.scss',
       scssTarget: 'src/css',
       img: ['!src/img/sprites/*.*', 'src/img/**/*.png', 'src/img/**/*.jpg', 'src/img/**/*.svg', 'src/img/**/*.gif'],
		 sprites: 'src/img/sprites/',
       fonts: 'src/fonts/**/*.*',
		 temp: 'temp'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
       html: 'src/**/*.html',
       js: 'src/js/**/*.js',
       style: 'src/css/**/*.scss',
       img: 'src/img/**/*.*',
		 sprites: 'src/img/sprites/*.png',
       fonts: 'src/fonts/**/*.*'
    }
};

gulp.task('html:build', function () {
    return gulp.src(path.src.html) //Выберем файлы по нужному пути
		.pipe(plumber())
	 	.pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest(path.build.html)); //Выплюнем их в папку build
});

gulp.task('fonts:build', function () {
    return gulp.src(path.src.fonts) //Выберем файлы по нужному пути
        .pipe(gulp.dest(path.build.fonts)); //Выплюнем их в папку build
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
		.pipe(sourcemaps.init()) //Инициализация первой командой
		.pipe(plumber())
		.pipe(uglify()) //Сожмем наш js
		.pipe(sourcemaps.write('../maps')) // Карта последней командой
		.pipe(gulp.dest(path.build.js)); //Выплюнем готовый файл в build
});

gulp.task('style:build', function () {

	gulp.src(path.src.scss)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(path.build.css));

	gulp.src(path.src.scss)
		.pipe(sass().on('error', sass.logError))
		.pipe(mqRemove({ width: "1024px" }))
		.pipe(rename('main-IE8.css'))
		.pipe(gulp.dest(path.build.css));

});

gulp.task('image:build', function () {
    return gulp.src(path.src.img) //Выберем картинки
	 	.pipe(plumber())
		.pipe(imagemin({				 //Сожмем
			progressive: true
		}))
      .pipe(gulp.dest(path.build.img)); //И в build
});

gulp.task('sprite:build', function () {
	
	var spriteData = gulp.src(path.src.sprites+'*.png')
		.pipe(spritesmith({
			retinaSrcFilter: [path.src.sprites+'*@2x.png'],
			imgName: '../img/sprites/sprite.png',
			retinaImgName: '../img/sprites/sprite@2x.png',
			cssName: '_sprite.css',
			padding: 5
		}));
	
	spriteData.img.pipe(gulp.dest('build/img'));
	spriteData.css.pipe(gulp.dest(path.src.scssTarget));
	
});

gulp.task('watch', function(){
   watch([path.watch.html], function(event, cb) {
       gulp.start('html:build');
   });
   watch([path.watch.style], function(event, cb) {
       gulp.start('style:build');
   });
   watch([path.watch.js], function(event, cb) {
       gulp.start('js:build');
   });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('build', [
	'fonts:build',
   'image:build',
	'sprite:build',
   'style:build',
   'js:build',
   'html:build'
]);

gulp.task('default', ['build', 'watch']);
