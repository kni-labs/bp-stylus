/* Make JShint stop yelling: DO NOT REMOVE */
/* jshint undef:false, unused:false, strict:false */

//
// Plugins
//
var
  gulp       = require('gulp'),
  plumber    = require('gulp-plumber'),
  gutil      = require('gulp-util'),
  notify     = require('gulp-notify'),
  watch      = require('gulp-watch'),
  stylus     = require('gulp-stylus'),
  sourcemaps = require('gulp-sourcemaps');
  jade       = require('gulp-jade'),
  uglify     = require('gulp-uglify'),
  concat     = require('gulp-concat'),
  jshint     = require('gulp-jshint'),
  stylish    = require('jshint-stylish'),
  refresh    = require('gulp-livereload'),
  nib        = require('nib'),
  jeet       = require('jeet'),
  rupture    = require('rupture');

//
// Sources
//
var sources = {
  images      : 'img/**/*',
  favicon     : 'favicon.ico',
  videos      : 'video/**/*',
  stylus      : 'stylus/**/*',
  fonts       : 'fonts/**/*',
  javascripts : 'js/*.js',
  vendorjs    : [
    'js/vendor/jquery.waypoints.js',
    'js/vendor/jquery.ba-hashchange.js',
    'js/vendor/headroom.js',
    'js/vendor/jQuery.headroom.js'
  ],
  jade        : 'views/**/*'
};

//
// Destinations
//
var destinations = {
  root        : '',
  images      : 'public/img/',
  videos      : 'public/video',
  styles      : 'public/css/',
  fonts       : 'public/fonts/',
  javascripts : 'public/js/'
};

//
// Stylus task
//
gulp.task('stylus', function () {
  gulp.src('./stylus/site.styl')
  .pipe(plumber({
    errorHandler: notify.onError({
        sound: 'Purr',
        title: "Stylus Error:",
        message:  "<%= error.message %>"})
    }))
    .pipe(sourcemaps.init())
    .pipe(stylus({
      use: [nib(), jeet(), rupture()],
      compress: true,
      linenos: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(destinations.styles))
    .pipe(refresh());
});

//
// Javascript tasks
//
gulp.task('scripts', function() {
  return gulp.src(sources.javascripts)
    .pipe(jshint()
      .on('error', gutil.beep))
    .pipe(jshint.reporter(stylish))
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(destinations.javascripts))
    .pipe(uglify())
    .pipe(gulp.dest(destinations.javascripts))
    .pipe(refresh());
});

gulp.task('vendorjs', function() {
  return gulp.src(sources.vendorjs)
    .pipe(jshint()
      .on('error', gutil.beep))
    .pipe(jshint.reporter(stylish))
    .pipe(plumber())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(destinations.javascripts))
    .pipe(uglify())
    .pipe(gulp.dest(destinations.javascripts));
});

//
// Jade task
//

gulp.task('jade', function() {
  gulp.src('views/pages/*')
    .pipe(jade({}))
    .pipe(gulp.dest('public/'))
    .pipe(refresh());
});

//
// Watch tasks
//
gulp.task('watch', ['build'], function() {
  refresh.listen();
  gulp.watch(sources.stylus, ['stylus']);
  gulp.watch(sources.styluschild, ['stylus']);
  gulp.watch(sources.jade, ['jade']);
  gulp.watch(sources.javascripts, ['scripts']);
  gulp.watch(sources.vendorjs, ['vendorjs']);
});

//
// Task runners
//
gulp.task('default', ['build'], function () {
  process.exit(0);
});

//
// Assets Only
//
gulp.task('build', ['stylus', 'scripts', 'vendorjs']);
