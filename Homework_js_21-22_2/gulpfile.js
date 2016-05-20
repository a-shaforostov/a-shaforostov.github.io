'use strict';

// https://habrahabr.ru/post/250569/

var gulp = require('gulp'),
    babel = require('gulp-babel'),
    filter = require('gulp-filter');

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html',
        js: 'src/js/*.js',
        style: 'src/css/*.css'
    }
};

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html));
});

gulp.task('js:build', function () {
    var f = filter(['*', '!src/js/tmpl.js'], {restore: true});

    return gulp.src(path.src.js)
        .pipe(f) // Фильтруем файлы, которые не нужно бабифицировать
        .pipe(babel({
			presets: ['es2015']
		}))
        .pipe(f.restore)
        .pipe(gulp.dest(path.build.js));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(gulp.dest(path.build.css));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build'
]);

gulp.task('default', ['build']);
