// gulp/images.js
import { src, dest } from 'gulp';
import image from 'gulp-image';

const paths = {
  src: 'src/assets/images/**/*',
  preview: 'preview/assets/images',
  dist: 'html/assets/images',
};

// preview: 単純コピー
export function imagesPreview() {
  return src(paths.src, { encoding: false }).pipe(dest(paths.preview));
}

// build: 圧縮
export function imagesDist() {
  return src(paths.src, { encoding: false })
    .pipe(
      image({
        pngquant: true,
        optipng: false,
        zopflipng: true,
        jpegRecompress: false,
        mozjpeg: true,
        guetzli: false,
        gifsicle: true,
        svgo: true,
      })
    )
    .pipe(dest(paths.dist));
}
