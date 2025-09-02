import { series, parallel, watch } from 'gulp';
import browserSync from 'browser-sync';

import { compilePugDist, compilePugPreview } from './gulp/pug.js';
import { compileSassDist, compileSassPreview } from './gulp/sass.js';
import { compileTsDist, compileTsPreview } from './gulp/ts.js';
import { imagesPreview, imagesDist } from './gulp/images.js';
import { cleanDist, cleanPreview } from './gulp/clean.js';

const paths = {
  preview: 'preview',
  pug: 'src/pug/**/*.pug',
  scss: 'src/scss/**/*.scss',
  ts: 'src/ts/**/*.ts',
  images: 'src/assets/images/**/*',
};

function serve() {
  browserSync.init({ server: { baseDir: paths.preview } });

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
  watch(
    paths.images,
    series(imagesPreview, (done) => {
      browserSync.reload();
      done();
    })
  );
}

// ESM の named export に変更
export const build = series(
  cleanDist,
  parallel(compilePugDist, compileSassDist, compileTsDist, imagesDist)
);
export const preview = series(
  cleanPreview,
  parallel(
    compilePugPreview,
    compileSassPreview,
    compileTsPreview,
    imagesPreview
  ),
  serve
);
