import { src, dest, watch } from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass'; // ← 修正ポイント
import cleanCSS from 'gulp-clean-css';
import yargs from 'yargs';

const sass = gulpSass(dartSass);
const argv = yargs.argv;

const paths = {
  src: 'src/scss/**/*.scss',
  dist: 'html/assets/css',
  preview: 'preview/assets/css',
};

// ----------------------------
// build　圧縮あり
// ----------------------------
export function compileSassDist() {
  console.log('[SASS:build] compiling...');
  return src(paths.src, { sourcemaps: false })
    .pipe(
      plumber({
        errorHandler: notify.onError('Sass Error: <%= error.message %>'),
      })
    )
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(dest(paths.dist));
}

// ----------------------------
// preview
// ----------------------------
export function compileSassPreview() {
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
// =============================
export function watchSassPreview() {
  console.log('[SASS:watch:preview] watching...');
  watch(paths.src, compileSassPreview);
}
