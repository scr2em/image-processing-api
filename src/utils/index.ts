import fs from "fs";
import sharp from "sharp";

export function isFileExist(fileDir: string): Promise<boolean> {
  return fs.promises
    .access(fileDir, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

export function resizeImage(filePath: string, width?: number, height?: number): Promise<Buffer> {
  let promise = sharp(filePath);

  if (width && height) {
    promise = promise.resize({ width, height });
  } else if (width) {
    promise = promise.resize({ width });
  } else if (height) {
    promise = promise.resize({ height });
  }

  return promise.toBuffer();
}
