const { build } = require('../gulpfile');

const { src, dest } = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const yargs = require('yargs');
const argv = yargs.argv;

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
