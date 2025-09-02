const { series, parallel, watch } = require('gulp');
const browserSync = require('browser-sync').create();

// gulp フォルダからタスクを読み込む
const { compilePugDist, compilePugPreview } = require('./gulp/pug');
const { compileSassDist, compileSassPreview } = require('./gulp/sass');

// preview ディレクトリを変数で定義
const paths = {
  preview: 'preview',
  pug: 'src/pug/**/*.pug',
  scss: 'src/scss/**/*.scss',
};

// watch + browserSync
function serve() {
  browserSync.init({
    server: { baseDir: paths.preview }, // ← ここを変数に変更
  });

  watch(paths.pug, compilePugPreview).on('change', browserSync.reload);
  watch(paths.scss, series(compileSassPreview, browserSync.reload));
}

// exports でタスク公開
exports.build = parallel(compilePugDist, compileSassDist);
exports.preview = series(
  parallel(compilePugPreview, compileSassPreview),
  serve
);

exports.watch = exports.preview;
