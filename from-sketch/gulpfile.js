var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var gutil = require("gulp-util");

var concat = require('gulp-concat');
var filter = require('gulp-filter');

var jade = require('gulp-jade');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');

var coffee = require('gulp-coffee');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');

var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');

var browserSyncTask = 'browserSync';


var bowerFileOptions = {
  overrides: {
    bootstrap: {
      main: [
          './dist/js/bootstrap.js',
          './dist/css/*.min.*',
          './dist/fonts/*.*'
      ]
    },
    "font-awesome": {
      main: [
        "./css/*.css",
        "./fonts/fontawesome-webfont.ttf"
      ]
    }
  }
};

gulp.task('clean:develop', function () {
  return del.sync('./develop/*');
});

gulp.task(
  "sass",
  function () {
    return gulp.src('./app/stylesheets/main.scss')
      .pipe(sass())
      .pipe(autoprefix('last 2 version', 'ie 8', 'ie 9'))
      .pipe(gulp.dest('develop/css'))
  }
);

gulp.task(
  'coffee',
  function() {
    gulp.src('./app/js/main.coffee')
      .pipe(sourcemaps.init())
      .pipe(
          coffee({bare: true}).on('error', gutil.log)
      )
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./develop/js'));
  }
);

gulp.task('vendor-css', function(){
  return gulp.src(
    mainBowerFiles(
      bowerFileOptions
    )
  )
  .pipe(filter('**/*.css'))
  .pipe(concat('vendors.css'))
  .pipe(gulp.dest('./develop/css'))
});

gulp.task('vendor-fonts', function(){
  return gulp.src(
    mainBowerFiles(
      bowerFileOptions
    )
  )
  .pipe(filter('**/*.ttf'))
  .pipe(gulp.dest('./develop/fonts'))
});

gulp.task('vendor-js', function(){
  return gulp.src(mainBowerFiles())
    .pipe(filter("**/*.js"))
    .pipe(concat("vendors.js"))
    .pipe(gulp.dest('./develop/js/'))
});

var vendorsTask = ['vendor-css', 'vendor-js', 'vendor-fonts'];

gulp.task('html', vendorsTask, function() {
  return gulp.src('./app/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('./develop'))
});

gulp.task(
  browserSyncTask,
  function () {
    return browserSync.init(
      {
        server: {
          baseDir: 'develop'
        }
      }
    )
  }
);

gulp.task('images', function () {
  return gulp.src('app/asserts/images/**/*.+(png|jpg|gif|svg)')
    .pipe(
      cache(
        imagemin({interlaced: true})
      )
    )
    .pipe(gulp.dest('develop/asserts/images/'))
});

gulp.task('cache:clear', function (callback) {
  return cache.clearAll(callback)
});

gulp.task('fonts', function() {
  return gulp.src('app/asserts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('reload', function () {
    return browserSync.reload()
  }
);


function reloadAfter(actions){
  function _reloadAfter(){
    runSequence(actions, 'reload');
  }
  return _reloadAfter
}

gulp.task(
  "dev-watch",
  ['sass', 'coffee', 'html', 'images'],
  function () {
    gulp.watch('app/stylesheets/**/*.scss', reloadAfter('sass'));
    gulp.watch('app/js/**/*.coffee', reloadAfter('coffee'));
    gulp.watch('app/index.jade', reloadAfter('html'));
    gulp.watch('app/asserts/images/**/*', reloadAfter('images'));
  }
);


gulp.task(
  "develop",
  function (callback) {
    runSequence(
      ['clean:develop', 'cache:clear'],
      [browserSyncTask, 'dev-watch'],
      callback
    );
  }
);

