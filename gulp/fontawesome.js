import { src, dest } from 'gulp';

const paths = {
  fontawesome: {
    css: 'node_modules/@fortawesome/fontawesome-free/css/all.min.css',
    webfonts: 'node_modules/@fortawesome/fontawesome-free/webfonts/*',
    distCss: 'html/assets/vendor/fontawesome/css',
    distFonts: 'html/assets/vendor/fontawesome/webfonts',
    previewCss: 'preview/assets/vendor/fontawesome/css',
    previewFonts: 'preview/assets/vendor/fontawesome/webfonts',
  },
};

// ----------------------------
// CSS
// ----------------------------
export function copyFontAwesomeCssDist() {
  return src(paths.fontawesome.css).pipe(dest(paths.fontawesome.distCss));
}

export function copyFontAwesomeCssPreview() {
  return src(paths.fontawesome.css).pipe(dest(paths.fontawesome.previewCss));
}

// ----------------------------
// Webfonts
// ----------------------------
export function copyFontAwesomeWebfontsDist() {
  return src(paths.fontawesome.webfonts, { encoding: false }).pipe(
    dest(paths.fontawesome.distFonts),
  );
}

export function copyFontAwesomeWebfontsPreview() {
  return src(paths.fontawesome.webfonts, { encoding: false }).pipe(
    dest(paths.fontawesome.previewFonts),
  );
}
