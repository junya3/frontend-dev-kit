# gulp-study

## 概要

このリポジトリは **Gulp で Pug と Sass をコンパイルする開発環境** です。
preview 用サーバーでの自動リロードと、build 用の圧縮・出力に対応しています。

## インストール

```bash
npm install
```

## 開発サーバー（watch + preview）

```bash
npm run watch
```

- `preview` フォルダをルートとしてローカルサーバー起動
- Pug/Sass 変更時に自動でブラウザをリロード
- CSS/JS/画像の変更も反映されます

## ビルド（本番用）

```bash
npm run build
```

- `html` フォルダに出力（CSS は minify 済み）
- デプロイ先に応じて `root` を変更可能

例：

```bash
gulp build --base=/exam/
```

- Pug 内で使用する `root` に適用されます

## 使用パッケージ

### 共通

| パッケージ   | 用途                                 |
| ------------ | ------------------------------------ |
| gulp         | タスクランナー本体                   |
| gulp-plumber | エラーで処理が止まるのを防ぐ         |
| gulp-notify  | エラーや処理完了をデスクトップ通知   |
| browser-sync | ローカルサーバー＋自動リロード       |
| yargs        | CLI 引数取得（build/preview 切替用） |

### Pug

| パッケージ | 用途            |
| ---------- | --------------- |
| gulp-pug   | Pug → HTML 変換 |

### Sass

| パッケージ     | 用途                                    |
| -------------- | --------------------------------------- |
| gulp-sass      | Gulp から Sass をコンパイルするラッパー |
| sass           | Sass コンパイラ本体（Dart Sass）        |
| gulp-clean-css | CSS を minify（圧縮）                   |

## Pug での CSS/リンク指定

- preview/build 両対応には `root` 変数を利用すると便利です。

```pug
// Pug 例
link(rel="stylesheet", href=root + "assets/css/style.css")
a(href=root + "about")
```

- preview タスクでは `root = '/'`
- build タスクでは `root = '/exam/'`（デプロイ先に応じて変更）

## ディレクトリ構成

```
src/
├─ pug/
│   ├─ global/           ← 全ページ共通（head, meta など）
│   │   ├─ _head.pug
│   │   └─ _meta.pug
│   ├─ components/       ← ヘッダーやフッターなど共通部品
│   ├─ layouts/          ← レイアウトテンプレート
│   │   └─ base.pug
│   └─ pages/
│       ├─ index.pug
│       └─ about.pug
├─ sass/
│   ├─ global/           ← 共通変数・リセット・フォント
│   │   ├─ _variables.scss
│   │   ├─ _reset.scss
│   │   └─ _typography.scss
│   ├─ components/
│   ├─ layouts/
│   └─ main.scss
├─ ts/
│   ├─ global/           ← 共通 JS（ユーティリティ関数）
│   ├─ components/
│   └─ main.ts
└─ assets/
    ├─ images/
    └─ fonts/
```

💡 **ポイント**

- 開発中は `npm run watch` で preview フォルダを確認
- build 後は `html` フォルダをデプロイ用に使用
- SCSS 変更時は main.scss を編集
- Pug 変更時は pages 配下を編集
