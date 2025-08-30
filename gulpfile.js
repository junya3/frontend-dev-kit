const { series, watch } = require('gulp');
const browserSync = require('browser-sync').create();

// gulp フォルダからタスクを読み込む
const { compilePugDist, compilePugPreview } = require('./gulp/pug');

// preview ディレクトリを変数で定義
const paths = {
  preview: 'preview',
};

// watch + browserSync
function serve() {
  browserSync.init({
    server: { baseDir: paths.preview }, // ← ここを変数に変更
  });

  watch('src/pug/**/*.pug', compilePugPreview).on('change', browserSync.reload);
}

// exports でタスク公開
exports.build = compilePugDist;
exports.watch = series(compilePugPreview, serve);
