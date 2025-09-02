import { src } from 'gulp';
import copy from 'gulp-copy';

const paths = {
  src: 'src/assets/fonts/**/*',
  preview: 'preview/assets/fonts',
  dist: 'html/assets/fonts',
};

// Preview 用
export function fontsPreview() {
  return src(paths.src, { buffer: true }).pipe(
    copy(paths.preview, { prefix: 3 })
  );
}

// Build 用
export function fontsDist() {
  return src(paths.src, { buffer: true }).pipe(copy(paths.dist, { prefix: 3 }));
}
