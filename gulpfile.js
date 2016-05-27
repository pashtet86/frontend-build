// Includes
var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    source          = require('vinyl-source-stream'),
    gutil           = require('gulp-util'),
    browserify      = require('browserify'),
    browserSync     = require('browser-sync').create(),
    htmlInjector    = require("bs-html-injector"),
    cssnano         = require('gulp-cssnano'),
    sourcemaps      = require('gulp-sourcemaps'),
    autoprefixer    = require('gulp-autoprefixer'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    rename          = require('gulp-rename'),
    imagemin        = require('gulp-imagemin'),
    cache           = require('gulp-cache'),
    // reload          = browserSync.reload,
    globbing        = require('gulp-css-globbing'), //globing scss files from folders
    notify 			    = require("gulp-notify"),
    size 			      = require('gulp-size'),
    nunjucksRender  = require('gulp-nunjucks-render');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
};

// browserSync
gulp.task('browserSync', function() {
  browserSync.use(htmlInjector, {
    files: "public/*.html"
  });
  browserSync.init({
    host  : '192.168.0.13', //set it mannually if you use virtualbox
    server: {
      baseDir: 'public'
    },
  })
})

// Styles: soursemaps + minification + autoprefixer + browsersync
gulp.task('styles', function () {
  return gulp
    .src('assets/scss/app.scss')
    .pipe(globbing({
        extensions: ['.scss']
    }))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions)
    .on("error", notify.onError(function (error) { return "CSS not builded: " + error.message; }))) //if not builded show error message
    .pipe(autoprefixer())
    // .pipe(cssnano()) // sourcemaps can brokes
    .pipe(rename('main.css'))
    .pipe(sourcemaps.write('maps'))
    .pipe(size())
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream({match: '**/*.css'}))
});

// Images optimization
gulp.task('images', function(){
  return gulp
    .src('assets/imgs/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(size())
    .pipe(gulp.dest('public/imgs'))
});

gulp.task('nunjucks', function() {
  return gulp.src('assets/pages/**/*.+(html|nunjucks)')
  .pipe(nunjucksRender({
      path: ['assets/templates']
    }))
  .pipe(gulp.dest('public'))
});

// Watch Files For Changes
gulp.task('watch', ['nunjucks','browserSync','styles'], function() {
  gulp.watch('assets/scss/**/*.scss', ['styles']);
  gulp.watch('assets/imgs/**/*.+(png|jpg|gif|svg)', ['images']);
  gulp.watch("assets/**/*.html", ['nunjucks']);
  // gulp.watch("public/*.html", htmlInjector);
  // gulp.watch('assets/js/*.js', ['scripts']);
});

// Default Task
gulp.task('default', ['styles', 'images']);
