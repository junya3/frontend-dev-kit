// gulp/pug.js
const { src, dest } = require('gulp');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const yargs = require('yargs');
const argv = yargs.argv;

const paths = {
  src: ['src/pug/**/*.pug', '!src/pug/**/_*.pug'],
  dist: 'html',
  preview: 'preview',
};

// build 用: --base=/junya03/sub/ などで切替
const basePathForDist = argv.base || '/';

// preview 用: つねにルートで固定
const basePathForPreview = '/';

// build（html 出力）
function compilePugDist() {
  console.log('[PUG:build] basePath =', basePathForDist);
  return src(paths.src)
    .pipe(
      plumber({
        errorHandler: notify.onError('Pug Error: <%= error.message %>'),
      })
    )
    .pipe(pug({ pretty: true, locals: { root: basePathForDist } }))
    .pipe(dest(paths.dist));
}

// watch（preview 出力）
function compilePugPreview() {
  console.log('[PUG:preview] root =', basePathForPreview);
  return src(paths.src)
    .pipe(
      plumber({
        errorHandler: notify.onError('Pug Error: <%= error.message %>'),
      })
    )
    .pipe(pug({ pretty: true, locals: { root: basePathForPreview } }))
    .pipe(dest(paths.preview));
}

module.exports = { compilePugDist, compilePugPreview };
