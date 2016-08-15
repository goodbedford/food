var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
// error handler for uglify view docs https://github.com/terinjokes/gulp-uglify
// var pump = require('pump');
//use for images
// var imagemin = require('gulp-imagemin')

var PATH = {
  css: path.join(__dirname, 'src', 'css/**/*.css'),
  cssDist: path.join(__dirname, 'src','css'),
  dist: path.join(__dirname, 'dist'),
  sass: path.join(__dirname, 'src', 'sass/**/*.scss'),
  jsSrc: path.join(__dirname, 'src', 'js/**/*.js')
}

gulp.task('sass', function() {
  return gulp.src(PATH.sass)
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest(PATH.cssDist))
});
gulp.task('css', function() {
  return gulp.src(PATH.css)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(PATH.dist));
});
gulp.task('lint', function() {
  return gulp.src(PATH.jsSrc)
    .pipe(jshint())
    .pipe(jshint.reporter(jshintStylish))
});
gulp.task('concatJs', function() {
  return gulp.src(PATH.jsSrc)
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest(PATH.dist))
});

gulp.task('scripts', function() {
  return gulp.src(PATH.jsSrc)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(jshintStylish))
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest(PATH.dist))
});

gulp.task('clean', function() {
  return del([PATH.dist]);

});

gulp.task('default',['clean', 'sass', 'css', 'scripts'], function() {
  gulp.watch(PATH.sass, ['sass']);
  gulp.watch(PATH.css, ['css']);
  gulp.watch(PATH.jsSrc, ['scripts']);
});
