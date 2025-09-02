// gulp/ts.js
const { src, dest } = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const yargs = require('yargs');
const argv = yargs.argv;
const terser = require('gulp-terser'); // build 用に圧縮

const paths = {
  src: 'src/ts/**/*.ts',
  preview: 'preview/assets/js',
  dist: 'html/assets/js',
};

const tsProject = ts.createProject('tsconfig.json');

// preview
function compileTsPreview() {
  console.log('[TS:preview] compiling...');
  return src(paths.src, { sourcemaps: true })
    .pipe(
      plumber({
        errorHandler: notify.onError('TS Error: <%= error.message %>'),
      })
    )
    .pipe(tsProject())
    .js.pipe(dest(paths.preview, { sourcemaps: '.' }));
}

// build
function compileTsDist() {
  console.log('[TS:build] compiling...');
  return src(paths.src)
    .pipe(
      plumber({
        errorHandler: notify.onError('TS Error: <%= error.message %>'),
      })
    )
    .pipe(tsProject())
    .js.pipe(terser()) // minify
    .pipe(dest(paths.dist));
}

module.exports = { compileTsPreview, compileTsDist };
