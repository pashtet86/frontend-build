// Include gulp
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
  })
})

gulp.task('sass', function () {
    return gulp
        .src('assets/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({
          stream: true
        }))
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('assets/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

// Watch Files For Changes
gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('assets/scss/*.scss', ['sass']);
    // gulp.watch('assets/js/*.js', ['scripts']);
});

// Default Task
gulp.task('default', ['sass', 'scripts']);