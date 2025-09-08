# gulp-study

## プロジェクト概要

このプロジェクトは Gulp を使ったフロントエンド開発の学習用リポジトリです。
Pug、Sass、TypeScript を組み合わせて、preview / build の環境を整えています。

## ディレクトリ構成

```
src/
├── assets
│   ├── fonts                 // フォントデータ
│   └── images                // 画像データ
├── pug
│   ├── components            // 常用パーツ
│   │   └── common
│   │       └── _icon.pug
│   ├── layouts               // レイアウトパーツ
│   │   ├── _footer.pug
│   │   ├── _header.pug
│   │   └── layout.pug
│   └── pages                 // ページ
│       ├── *\*\*\            // 下層ページ
│       │   └── index.pug
│       └── index.pug
├── scss
│   ├── foundation            // 基盤スタイル
│   │   ├── _fonts.scss       // フォント
│   │   ├── _function.scss    // 関数
│   │   ├── _index.scss
│   │   ├── _mixin.scss       // ミックスイン
│   │   ├── _placeholder.scss // 常用クラス
│   │   ├── _reset.scss       // リセット
│   │   └── _variable.scss    // 定数、変数
│   ├── layout
│   │   ├── _base.scss
│   │   ├── _common.scss      // 常用クラス
│   │   ├── _footer.scss
│   │   ├── _header.scss
│   │   └── _index.scss
│   ├── main.scss
│   ├── pages
│   │   └── *\*\*\
│   │       └── index.scss
│   └── utils                 // ライブラリ
│       ├── _grid.scss
│       └── _index.scss
└── ts
    └── main.ts
```

## root / basePath 設定と使い方

### 使い方

例: `example.com/exam/about/` にアンカーを設定したいとき:

```pug
a(href=root + "about")
```

出力（build 時）:

```html
<a href="/exam/about"></a>
```

### root 設定

`package.json` の build コマンドを下記のように書き換えます:

```json
"build": "gulp build --base=/exam/"
```

デプロイ先のパスに応じて `--base` を変更してください。

## Pug からのリンク例

### CSS

```pug
link(rel="stylesheet", href=root + "assets/css/main.css")
```

### TypeScript / JS

```pug
// ES6 モジュールとして読み込む
script(type="module", src=root + "assets/js/main.js")
```

## 画像 (Images)

プロジェクト内の画像は `src/assets/images` に配置します。

### Preview

`npm run watch` を実行すると、画像は `preview/assets/images` にコピーされます。
Gulp 5 の仕様で画像ファイルが破損しないよう `{ encoding: false }` を指定しています。

```js
return src(paths.src, { encoding: false })
  .pipe(image()) // gulp-image で軽量圧縮
  .pipe(dest(paths.preview));
```

### Build

`npm run build` 実行時は `html/assets/images` にコピーされ、軽量圧縮されます。
`gulp-image` を利用して JPEG / PNG / SVG のサイズを削減します。

```js
return src(paths.src, { encoding: false }).pipe(image()).pipe(dest(paths.dist));
```

## Fonts

- 配置場所

  フォントは `src/assets/fonts/` に置いてください。

- 配置方式（推奨）

  **相対パス（推奨）** または **CDN** のどちらかを選べます。
  - 相対パス：開発・デプロイで同じリポジトリ内にフォントを持つ場合に便利で、オフラインでも動作します。
  - CDN：配信速度とキャッシュの利点があり、複数サイトで共有する場合に有効です（ライセンスを確認）。

- 相対パスを使う場合の簡単手順
  1. `src/assets/fonts/` にフォントファイルを置く。
  2. Gulp で preview / build にコピーする（

  3. CSS はルートからの相対パスを使う（`root` 変数を使うと basePath に対応しやすい）：

  ```css
  src: url('/assets/fonts/NotoSansJP-VariableFont_wght.ttf') format('truetype');
  ```

それだけで十分です。

## 重要ポイント（その他）

- Sass、TypeScript、Pug は全て `root` 変数を使うことで preview / build 両方で同じコードを利用できます。
- Preview は sourcemap を付与（開発向け）、圧縮は行いません。
- Build は minify / 圧縮を行います（本番向け）。
- TypeScript は ES6 モジュール対応で `<script type="module">` で読み込んでください。
