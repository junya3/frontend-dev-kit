# gulp-study

## プロジェクト概要

このプロジェクトは Gulp を使ったフロントエンド開発の学習用リポジトリです。
Pug, Sass, TypeScript を組み合わせて、build/preview の環境を整えています。

## ディレクトリ構成

```
src/
├─ pug/
│   ├─ global/           ← 全ページ共通の Pug（head, meta, 共通部分など）
│   │   ├─ _head.pug
│   │   └─ _meta.pug
│   ├─ components/
│   │   ├─ _header.pug
│   │   └─ _footer.pug
│   ├─ layouts/
│   │   └─ base.pug
│   └─ pages/
│       ├─ index.pug
│       └─ about.pug
├─ sass/
│   ├─ global/           ← 全体共通の変数、リセット、フォントなど
│   │   ├─ _variables.scss
│   │   ├─ _reset.scss
│   │   └─ _typography.scss
│   ├─ components/
│   ├─ layouts/
│   └─ main.scss
├─ ts/
│   ├─ global/           ← 全体共通の TypeScript（ユーティリティ関数など）
│   ├─ components/
│   └─ main.ts
└─ assets/
    ├─ images/
    └─ fonts/
```

## root / basePath 設定と使い方

### 使い方

```pug
// example.com/exam/about/ にアンカーを設定したいとき
a(href=root + 'about')
```

- 出力（build 時）

```html
<a href="/exam/about"></a>
```

### root 設定

`package.json` の build コマンドを下記のように書き換えます：

```json
"build": "gulp build --base=/exam/"
```

- \*\*\*の位置にデプロイする際に適応させるパスを設定

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

## 注意ポイント

- Sass, TypeScript, Pug は全て **root 変数** を使うことで build/preview 両方で同じコードを利用可能
- preview 用は sourcemap を付与、圧縮なし
- build 用は minify / 圧縮あり
- TypeScript は ES6 モジュール対応で `<script type="module">` で読み込むこと
