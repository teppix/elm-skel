var gulp = require('gulp');
var elm = require('gulp-elm');
var minify = require('gulp-minify');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');


var config = {
  watchfiles: 'src/*.elm',
  buildfiles: 'src/Main.elm',
  jsfiles:    'dist/*.js',
  dest:       'dist/',
};

gulp.task('elm-init', elm.init);

gulp.task('elm', ['elm-init'], function() {
  return gulp.src(config.buildfiles)
            .pipe(elm())
            .pipe(gulp.dest(config.dest));
});


gulp.task('compress', ['elm-init', 'elm'], function() {
  return gulp.src(config.jsfiles)
            .pipe(minify({
              ignoreFiles: ['-min.js'],
            }))
            .pipe(gulp.dest(config.dest));
});


gulp.task('watch', ['elm-init'], function() {
  return gulp.src( config.buildfiles )
          .pipe(watch(config.watchfiles))
          .pipe(plumber())
          .pipe(elm())
          .pipe(gulp.dest(config.dest));
});


gulp.task('default', ['elm']);

