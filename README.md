# gulp-study

## pug

### npm

`npm install --save-dev gulp gulp-pug gulp-plumber gulp-notify browser-sync`

- gulp : タスクランナー本体
- gulp-pug : Pug を HTML に変換する
- gulp-plumnber : エラーで処理が止まるのを防ぐ
- gulp-notify : エラーや処理完了を通知で教えてくれる
- browser-sync : ローカルサーバー＋自動リロードで快適開発

##　ディレクトリ構成

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
│   ├─ global/           ← 全体共通の JS（ユーティリティ関数など）
│   ├─ components/
│   └─ main.ts
└─ assets/
    ├─ images/
    └─ fonts/



```
