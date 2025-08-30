const { src, dest } = require('gulp');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const yargs = require('yargs');
const argv = yargs.argv;

// 切り替えよう
const basePath = argv.base || '/';

const paths = {
  src: ['src/pug/**/*.pug', '!src/pug/**/_*.pug'],
  dist: 'html', // <-フォルダ名
  preview: 'preview',
};

// dist に出力（build 用）
function compilePugDist() {
  return src(paths.src)
    .pipe(
      plumber({
        errorHandler: notify.onError('Pug Error: <%= error.message %>'),
      })
    )
    .pipe(pug({ pretty: true, locals: { basePath } }))
    .pipe(dest(paths.dist));
}

// preview に出力（watch 用）
function compilePugPreview() {
  return src(paths.src)
    .pipe(
      plumber({
        errorHandler: notify.onError('Pug Error: <%= error.message %>'),
      })
    )
    .pipe(pug({ pretty: true, locals: { basePath } }))
    .pipe(dest(paths.preview));
}

module.exports = { compilePugDist, compilePugPreview };
