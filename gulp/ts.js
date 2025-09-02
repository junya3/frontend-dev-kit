import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import ts from 'gulp-typescript';
import yargs from 'yargs';
import terser from 'gulp-terser';

const argv = yargs.argv;

const paths = {
  src: 'src/ts/**/*.ts',
  preview: 'preview/assets/js',
  dist: 'html/assets/js',
};

const tsProject = ts.createProject('tsconfig.json');

// ----------------------------
// preview
// ----------------------------
export function compileTsPreview() {
  console.log('[TS:preview] compiling...');
  return src(paths.src, { sourcemaps: true })
    .pipe(
      plumber({
        errorHandler: notify.onError('TS Error: <%= error.message %>'),
      })
    )
    .pipe(tsProject())
    .js.pipe(dest(paths.preview, { sourcemaps: '.' }));
}

// ----------------------------
// build
// ----------------------------
export function compileTsDist() {
  console.log('[TS:build] compiling...');
  return src(paths.src)
    .pipe(
      plumber({
        errorHandler: notify.onError('TS Error: <%= error.message %>'),
      })
    )
    .pipe(tsProject())
    .js.pipe(terser()) // minify
    .pipe(dest(paths.dist));
}
