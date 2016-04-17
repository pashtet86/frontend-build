// Includes
var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    browserSync     = require('browser-sync').create(),
    cssnano         = require('gulp-cssnano'),
    sourcemaps      = require('gulp-sourcemaps'),
    autoprefixer    = require('gulp-autoprefixer'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    rename          = require('gulp-rename'),
    imagemin        = require('gulp-imagemin'),
    cache           = require('gulp-cache');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
};

// browserSync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
  })
})

// Styles: soursemaps + minification + autoprefixer + browsersync
gulp.task('styles', function () {
  return gulp
    .src('assets/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    // .pipe(cssnano()) //brake sourcemapse 
    .pipe(rename('main.css'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Images optimization
gulp.task('images', function(){
  return gulp
    .src('assets/imgs/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('public/imgs'))
});

// Concatenate & Minify JS
// gulp.task('scripts', function() {
//   return gulp.src('assets/js/*.js')
//     .pipe(concat('all.js'))
//     .pipe(gulp.dest('public'))
//     .pipe(rename('all.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('public/js'));
// });

// Watch Files For Changes
gulp.task('watch', ['browserSync', 'styles', 'images'], function() {
  gulp.watch('assets/scss/**/*.scss', ['styles']);
  gulp.watch('assets/imgs/**/*.+(png|jpg|gif|svg)', ['images']);
  // gulp.watch('assets/js/*.js', ['scripts']);
});

// Default Task
gulp.task('default', ['browserSync', 'styles', 'images', 'watch']);