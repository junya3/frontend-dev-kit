import { deleteAsync } from 'del';

export function cleanDist() {
  return deleteAsync(['html/**', '!html']); // htmlフォルダの中身を削除
}

export function cleanPreview() {
  return deleteAsync(['preview/**', '!preview']);
}
