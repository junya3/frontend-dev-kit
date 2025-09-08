import { series, parallel, watch } from 'gulp';
import browserSync from 'browser-sync';

import { compilePugDist, compilePugPreview } from './gulp/pug.js';
import { compileSassDist, compileSassPreview } from './gulp/sass.js';
import { compileTsDist, compileTsPreview } from './gulp/ts.js';
import { imagesPreview, imagesDist } from './gulp/images.js';
import { fontsPreview, fontsDist } from './gulp/fonts.js';
import { cleanDist, cleanPreview } from './gulp/clean.js';
import {
  copyFontAwesomeWebfontsDist,
  copyFontAwesomeWebfontsPreview,
  copyFontAwesomeCssDist,
  copyFontAwesomeCssPreview,
} from './gulp/fontawesome.js';

const paths = {
  preview: 'preview',
  pug: 'src/pug/**/*.pug',
  scss: 'src/scss/**/*.scss',
  ts: 'src/ts/**/*.ts',
  images: 'src/assets/images/**/*',
  fonts: 'src/assets/fonts/**/*',
};

function serve() {
  browserSync.init({ server: { baseDir: paths.preview } });

  watch(paths.pug, compilePugPreview).on('change', browserSync.reload);
  watch(
    paths.scss,
    series(compileSassPreview, (done) => {
      browserSync.reload();
      done();
    }),
  );
  watch(
    paths.ts,
    series(compileTsPreview, (done) => {
      browserSync.reload();
      done();
    }),
  );
  watch(
    paths.images,
    series(imagesPreview, (done) => {
      browserSync.reload();
      done();
    }),
  );
  watch(
    paths.fonts,
    series(fontsPreview, (done) => {
      browserSync.reload();
      done();
    }),
  );
}

// ESM の named export に変更
export const build = series(
  cleanDist,
  parallel(
    compilePugDist,
    compileSassDist,
    compileTsDist,
    imagesDist,
    fontsDist,
    copyFontAwesomeWebfontsDist,
    copyFontAwesomeCssDist,
  ),
);
export const preview = series(
  cleanPreview,
  parallel(
    compilePugPreview,
    compileSassPreview,
    compileTsPreview,
    imagesPreview,
    fontsPreview,
    copyFontAwesomeWebfontsPreview,
    copyFontAwesomeCssPreview,
  ),
  serve,
);
