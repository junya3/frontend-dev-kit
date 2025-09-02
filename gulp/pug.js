import { src, dest } from 'gulp';
import pug from 'gulp-pug';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import yargs from 'yargs';

const argv = yargs(process.argv.slice(2)).argv; // ← ESM 対応
const paths = {
  src: ['src/pug/**/*.pug', '!src/pug/**/_*.pug'],
  dist: 'html',
  preview: 'preview',
};

// build 用: --base=/junya03/sub/ などで切替
const basePathForDist = argv.base || '/';

// preview 用: 常にルートで固定
const basePathForPreview = '/';

// build（html 出力）
export function compilePugDist() {
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

// preview（watch 用）
export function compilePugPreview() {
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
