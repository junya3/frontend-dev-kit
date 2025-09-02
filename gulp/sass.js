const { build } = require('../gulpfile');

const { src, dest } = require('gulp'),
  plumber = require('gulp-plumber'),
  notify = require('gulp-notify'),
  sass = require('gulp-sass')(require('sass')),
  cleanCSS = require('gulp-clean-css'),
  yargs = require('yargs'),
  argv = yargs.argv;

const paths = {
  src: 'src/scss/**/*.scss',
  dist: 'html/assets/css',
  preview: 'preview/assets/css',
};

// ----------------------------
// build　圧縮あり
// ----------------------------
function compileSassDist() {
  console.log('[SASS:build] compiling...');
  return src(paths.src, { sourcemaps: false })
    .pipe(
      plumber({
        errorHandler: notify.onError('Sass Error: <%= error.message %>'),
      }) // error 出力
    )
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(dest(paths.dist));
}

// ----------------------------
// preview
// ----------------------------
function compileSassPreview() {
  console.log('[SASS:preview] compiling...');
  return src(paths.src, { sourcemaps: true })
    .pipe(
      plumber({
        errorHandler: notify.onError('Sass Error: <%= error.message %>'),
      })
    )
    .pipe(sass())
    .pipe(dest(paths.preview, { sourcemaps: '.' }));
}

// =========================
// watch
// =========================
function watchSassPreview() {
  console.log('[SASS:watch:preview] watching...');
  watch(paths.src, compileSassPreview);
}

module.exports = { compileSassDist, compileSassPreview };
