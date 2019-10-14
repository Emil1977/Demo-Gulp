var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    cleanCSS      = require('gulp-clean-css'),
    autoprefixer  = require('gulp-autoprefixer'),
    rename        = require('gulp-rename'),
    inject        = require('gulp-inject'),
    uglify        = require('gulp-uglify'),
    plumber       = require('gulp-plumber'),
    browserify    = require('gulp-browserify'),
    clean         = require('gulp-clean'),
    sourcemaps    = require('gulp-sourcemaps'),
    htmlmin       = require('gulp-html-minifier'),
    browserSync   = require('browser-sync'),
    babel         = require('gulp-babel'),
    concat        = require('gulp-concat'),
    minify        = require('gulp-minify'),
    watch         = require('gulp-watch')
    ;

var src        ='./src/',
    dist       ='./dist/';
// ###########################################################
// MINIFY HTML

gulp.task('html', done => {
  gulp.src(dist + '*.html',{force: true})
    .pipe(clean())
  gulp.src(src + '*.html')
    .pipe(htmlmin({collapseWitespace: true}))
    .pipe(gulp.dest(dist))
    done();
});

// ###########################################################
// MINIFY SASS

gulp.task('sass', done => {
  gulp.src(src + 'assets/sass/*.sass')
    .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(rename({ basename: 'style'}))
      .pipe(cleanCSS())
      .pipe(rename({ suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist + 'assets/css'))
    done();
});

gulp.task('js', done => {
  gulp.src('./app/js/*.js')
    .pipe(babel({presets: ['@babel/env'] }))
    .pipe(concat('global.js'))
    .pipe(gulp.dest('./src/js/dist'))
    .pipe(minify())
    .pipe(gulp.dest('./src/js/dist'))
    done();
});

// ###########################################################
// WATCH

gulp.task('default', () => {
  gulp.watch([src + '*.html'],['html']);
  gulp.watch([src + 'assets/sass/*.sass'],['sass']);
  //,'./app/js/*.js'],
  //gulp.parallel('html','sass','js'));
});
