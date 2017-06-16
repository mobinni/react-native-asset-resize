import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import R from 'ramda';
import chalk from 'chalk';
import {getImagesInPath} from './utils';
import {ANDROID_LAUNCHER, IOS_LAUNCHER} from './constants';

const resizeImage = (size, factor) => (image) => {
  return new Promise((resolve, reject) => {
    image.resize(size).toFile(
      path.resolve(
        'example',
        'assets',
        `launcher_${size}x${size}@${factor}x.png`
      ),
      (err, info) => {
        if (err) {
          reject(err);
        }
        resolve(info);
      }
    );
  });
};

async function resize(dirPath, sizes) {
  const files = await getImagesInPath(dirPath);
  const parsedImages = files.map(file => sharp(file));

  const {android, ios} = sizes;

  parsedImages.map((image) => {
    try {
      android.map(async ({size, factor}) => await resizeImage(size, factor)(image));
      ios.map(async ({size, factor}) => await resizeImage(size, factor)(image));
    } catch (e) {
      console.log(chalk.red(e));
    }
  });
}

export function resizeLauncher(dirPath) {
  console.log(dirPath)
  resize(
    dirPath,
    {ANDROID_LAUNCHER, IOS_LAUNCHER}
  );
}
