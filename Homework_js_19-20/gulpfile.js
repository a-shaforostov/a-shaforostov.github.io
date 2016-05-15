'use strict';

// https://habrahabr.ru/post/250569/

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    rename = require("gulp-rename"),
    cssmin = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch');

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/css/main.css',
        scss: 'src/css/main.scss',
        scssTarget: 'src/css',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/css/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger (сборка файла из фрагментов - сейчас не используется)
        .pipe(gulp.dest(path.build.html)); //Выплюнем их в папку build
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(uglify()) //Сожмем наш js
        .pipe(rename(function (path) {
            path.basename += ".min";
          }))
        .pipe(gulp.dest(path.build.js)); //Выплюнем готовый файл в build
});

gulp.task('style:build', function () {
    gulp.src(path.src.scss) //Выберем наш main.scss
        // .pipe(rigger()) //Прогоним через rigger
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.src.scssTarget))
        .pipe(cssmin()) //Сожмем
        .pipe(rename(function (path) {
            path.basename += ".min";
          }))
        .pipe(gulp.dest(path.build.css)); //И в build
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем картинки
        .pipe(gulp.dest(path.build.img)); //И в build
});

// gulp.task('sass:build', function () {
    // return gulp.src(path.src.scss)
        // .pipe(rigger()) //Прогоним через rigger
        // .pipe(sass().on('error', sass.logError))
        // .pipe(gulp.dest(path.src.scssTarget));
  // });

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
    // watch([path.watch.fonts], function(event, cb) {
    //     gulp.start('fonts:build');
    // });
});

gulp.task('build', [
    'html:build',
    'js:build',
    // 'sass:build',
    'style:build',
    'image:build'
]);

gulp.task('default', ['build', 'watch']);
