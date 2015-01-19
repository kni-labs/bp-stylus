/* Make JShint stop yelling: DO NOT REMOVE */
/* jshint undef:false, unused:false, strict:false */

//
// Plugins
//
var
  gulp    = require('gulp'),
  plumber = require('gulp-plumber'),
  gutil   = require('gulp-util'),
  notify  = require('gulp-notify'),
  watch   = require('gulp-watch'),
  stylus  = require('gulp-stylus'),
  jade    = require('gulp-jade'),
  uglify  = require('gulp-uglify'),
  jshint  = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  refresh = require('gulp-livereload'),
  nib     = require('nib'),
  jeet    = require('jeet'),
  rupture = require('rupture');

//
// Sources
//
var sources = {
  images      : 'img/**/*',
  favicon     : 'favicon.ico',
  videos      : 'video/**/*',
  stylus      : 'stylus/**/*',
  fonts       : 'fonts/**/*',
  javascripts : 'js/**/*',
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
// Copy asset files
//
gulp.task('assets', function() {

  // Move the favicon - TODO: Possibly move static/root type files with this
  gulp.src(sources.favicon)
    .pipe(gulp.dest(destinations.root));

  // Move the images
  gulp.src(sources.images)
    .pipe(gulp.dest(destinations.images));

  // Move the videos
  gulp.src(sources.videos)
    .pipe(gulp.dest(destinations.videos));

  // Move the fonts
  gulp.src(sources.fonts)
    .pipe(gulp.dest(destinations.fonts));

  // Move the scripts
  gulp.src(sources.javascripts[0])
    .pipe(gulp.dest(destinations.javascripts));

  // Move the legacy script
  gulp.src(sources.javascripts[1])
    .pipe(gulp.dest(destinations.javascripts));

});

//
// Stylus task
//
gulp.task('stylus', function() {
  return gulp.src('stylus/site.styl')
    .pipe(plumber({
      errorHandler: notify.onError({
        sound: 'Purr',
        title: "Stylus Error:",
        message:  "<%= error.message %>"})
    }))
    .pipe(stylus({
      use: [nib(), jeet(), rupture()],
      sourcemap: {
        inline: true,
        sourceRoot: '.',
        basePath: 'public/css'
      },
      compress: true,
      linenos: false
    }))
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
    .pipe(uglify())
    .pipe(gulp.dest(destinations.javascripts));
});

//
// Jade task
//
gulp.task('jade', function() {
  return gulp.src(sources.jade)
    .pipe(refresh());
});

//
// Watch tasks
//
gulp.task('watch', ['build'], function() {
  gulp.watch(sources.stylus, ['stylus']);
  gulp.watch(sources.styluschild, ['stylus']);
  gulp.watch(sources.jade, ['jade']);
  gulp.watch(sources.javascripts, ['scripts']);
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
gulp.task('build', ['assets', 'stylus', 'scripts']);
