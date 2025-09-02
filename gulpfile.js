const { series, parallel, watch } = require('gulp');
const browserSync = require('browser-sync').create();

// gulp フォルダからタスクを読み込む
const { compilePugDist, compilePugPreview } = require('./gulp/pug');
const { compileSassDist, compileSassPreview } = require('./gulp/sass');
const { compileTsDist, compileTsPreview } = require('./gulp/ts');

// preview ディレクトリを変数で定義
const paths = {
  preview: 'preview',
  pug: 'src/pug/**/*.pug',
  scss: 'src/scss/**/*.scss',
  ts: 'src/scss/**/*.ts',
};

// watch + browserSync
function serve() {
  browserSync.init({
    server: { baseDir: paths.preview }, // ← ここを変数に変更
  });

  watch(paths.pug, compilePugPreview).on('change', browserSync.reload);
  watch(paths.scss, series(compileSassPreview, browserSync.reload));
  watch('src/ts/**/*.ts', compileTsPreview).on('change', browserSync.reload);
}

// exports でタスク公開
exports.build = parallel(compilePugDist, compileSassDist, compileTsDist);
exports.preview = series(
  parallel(compilePugPreview, compileSassPreview, compileTsPreview),
  serve
);

exports.watch = exports.preview;
