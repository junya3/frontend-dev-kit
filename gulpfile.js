// gulpfile.js
const { series, parallel, watch } = require('gulp');
const browserSync = require('browser-sync').create();

// gulp フォルダからタスクを読み込む
const { compilePugDist, compilePugPreview } = require('./gulp/pug');
const { compileSassDist, compileSassPreview } = require('./gulp/sass');
const { compileTsDist, compileTsPreview } = require('./gulp/ts');
// const { imagesPreview, imagesDist } = require('./gulp/images');

// preview ディレクトリを変数で定義
const paths = {
  preview: 'preview',
  pug: 'src/pug/**/*.pug',
  scss: 'src/scss/**/*.scss',
  ts: 'src/ts/**/*.ts',
  images: 'src/assets/images/**/*',
};

// watch + browserSync
function serve() {
  browserSync.init({
    server: { baseDir: paths.preview },
  });

  watch(paths.pug, compilePugPreview).on('change', browserSync.reload);
  watch(
    paths.scss,
    series(compileSassPreview, (done) => {
      browserSync.reload();
      done();
    })
  );
  watch(
    paths.ts,
    series(compileTsPreview, (done) => {
      browserSync.reload();
      done();
    })
  );
  // watch(paths.images, series(imagesPreview, (done) => {
  //   browserSync.reload();
  //   done();
  // }));
}

// exports でタスク公開
const build = parallel(
  compilePugDist,
  compileSassDist,
  compileTsDist
  // imagesDist
);

const preview = series(
  parallel(
    compilePugPreview,
    compileSassPreview,
    compileTsPreview
    // imagesPreview
  ),
  serve
);

module.exports = {
  build,
  preview,
  watch: preview,
};
