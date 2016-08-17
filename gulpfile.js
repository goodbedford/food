var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var imagemin = require('gulp-imagemin');

// error handler for uglify view docs https://github.com/terinjokes/gulp-uglify
// var pump = require('pump');
//use for images
// var imagemin = require('gulp-imagemin')

var PATH = {
  css: path.join(__dirname, 'src', 'css/**/*.css'),
  cssDist: path.join(__dirname, 'src','css'),
  delete: './dist/**/*',
  dist: path.join(__dirname, 'dist'),
  images: path.join(__dirname, 'src', 'images/**/*'),
  imagesDist: path.join(__dirname, 'dist', 'images'),
  jsSrc: path.join(__dirname, 'src', 'js/**/*.js'),
  sassSrc: path.join(__dirname, 'src', 'sass/**/main.scss'),
  sass: path.join(__dirname, 'src', 'sass/**/*.scss'),
}

gulp.task('sass', function() {
  return gulp.src(PATH.sassSrc)
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
gulp.task('styles', function() {
  return gulp.src(PATH.sassSrc)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(PATH.cssDist))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(PATH.dist))
})
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
  return del([PATH.delete]);
});

gulp.task('images', function() {
  return gulp.src(PATH.images)
    .pipe(imagemin())
    .pipe(gulp.dest(PATH.imagesDist))
});

gulp.task('default',['clean', 'images','styles', 'scripts'], function() {
  gulp.watch(PATH.images, ['images']);
  gulp.watch(PATH.sass, ['sass']);
  gulp.watch(PATH.css, ['css']);
  gulp.watch(PATH.jsSrc, ['scripts']);
});
