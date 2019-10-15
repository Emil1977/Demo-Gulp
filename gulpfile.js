var gulp = require('gulp'),
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require('gulp-rename'),
  inject = require('gulp-inject'),
  uglify = require('gulp-uglify'),
  plumber = require('gulp-plumber'),
  browserify = require('gulp-browserify'),
  clean = require('gulp-clean'),
  sourcemaps = require('gulp-sourcemaps'),
  htmlmin = require('gulp-html-minifier'),
  browserSync = require('browser-sync'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  minify = require('gulp-minify'),
  watch = require('gulp-watch');

var src = './src/',
  dist = './dist/';


// ###########################################################
// MINIFY SASS

gulp.task('sass', done => {
  gulp.src(src + 'assets/sass/*.sass')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(rename({
      basename: 'style'
    }))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist + 'assets/css'))
    .pipe(browserSync.stream())
  done();
});

// ###########################################################
// MINIFY JS

gulp.task('js',done => {
  gulp.src(src + 'assets/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(concat('global.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(browserify())
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist + 'assets/js'))
    .pipe(browserSync.stream())
    done();
});


// ###########################################################
// MINIFY HTML

gulp.task('html', done => {
  gulp.src(dist + '*.html', {
      force: true
    })
    .pipe(clean());
  gulp.src(src + '*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(dist))
    .pipe(browserSync.stream())
  done();
});


// ###########################################################
// WATCH

gulp.task('default', function() {

  browserSync.init({
    server: './dist'
  });

  gulp.watch([src + '*.html', src + 'assets/sass/*.sass', src + 'assets/js/*.js'],
    gulp.parallel('html', 'sass', 'js'));
});
