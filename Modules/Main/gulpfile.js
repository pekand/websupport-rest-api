var gulp = require('gulp');
var less = require('gulp-less');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var mergeStream = require('merge-stream');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  styles: {
    src: [
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/font-awesome/css/font-awesome.css',
    'src/styles/**/*.css',
    ],
    dest: 'Assets/layout/styles/'
  },
  less: {
    src: [
    'src/styles/**/*.less',
    ],
    dest: 'Assets/layout/styles/'
  },
  sass: {
    src: [
    'src/styles/**/*.sass',
    ],
    dest: 'Assets/layout/styles/'
  },
  scss: {
    src: [
    'src/styles/**/*.scss',
    ],
    dest: 'Assets/layout/styles/'
  },
  scripts: {
    src: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'src/scripts/**/*.js'
    ],
    dest: 'Assets/layout/scripts/'
  },
  images: {
    src: [
      'src/img/**/*.+(ico|png|jpg|jpeg|gif|svg)',
    ],
    dest: 'Assets/layout/img/'
  },   
  fonts: {
    src: [
      'node_modules/bootstrap/dist/fonts/*',
      'node_modules/font-awesome/fonts/*',
      'src/fonts/**/*'
    ],
    dest: 'Assets/layout/fonts/'
  } 
};
 
function clean() {
  return del([ 'Assets' ]);
}


function styles() {
  return mergeStream(
      gulp.src(paths.scss.src).pipe(sass()).pipe(concat('scss-files.scss')),
      gulp.src(paths.sass.src).pipe(sass()).pipe(concat('sass-files.sass')),
      gulp.src(paths.less.src).pipe(less()).pipe(concat('sass-files.less')),
      gulp.src(paths.styles.src).pipe(concat('css-files.css'))
    )
    .pipe(sourcemaps.init())
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write('.'))
    //.pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(sourcemaps.init())
    .pipe(babel())
    //.pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function images() {
  return gulp.src(paths.images.src)
  .pipe(gulp.dest(paths.images.dest));
}

function fonts() {
  return gulp.src(paths.fonts.src)
  .pipe(gulp.dest(paths.fonts.dest));
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.fonts.src, fonts);
}

var build = gulp.series(clean, gulp.parallel(styles, scripts, images, fonts));

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.images = images;
exports.fonts = fonts;
exports.default = build;
