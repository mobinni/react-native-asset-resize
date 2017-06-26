import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import R from 'ramda';
import chalk from 'chalk';
import { getImagesInPath } from './utils';
import { ANDROID_LAUNCHER, IOS_LAUNCHER } from './constants';

const outputAndroid = path.resolve(
  '../',
  __dirname,
  'output',
  'android'
);

const outputIOS = path.resolve(
    '../',
  __dirname,
  'output',
  'ios'
);

const resizeImage = (size, factor, output) => (image) => {
  return new Promise((resolve, reject) => {
    image.resize(size).toFile(
      path.resolve(
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

  const { android, ios } = sizes;

  parsedImages.map((image) => {
    try {
      android.map(async ({ size, factor }) => await resizeImage(size, factor)(image));
      ios.map(async ({ size, factor }) => await resizeImage(size, factor)(image));
    } catch (e) {
      console.log(chalk.red(e));
    }
  });
}

export function createFolder(outputPath) {
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }
}

export function resizeLauncher(dirPath) {
  resize(
    dirPath,
    { ANDROID_LAUNCHER, IOS_LAUNCHER }
  );
  try {
    createFolder(`${outputIOS}/launcher`);
    createFolder(`${outputAndroid}/launcher`);
  } catch (e) {
    console.log(e);
  }
}

export function init() {
  try {
    console.log('got here', outputIOS)
    createFolder(outputIOS);
    createFolder(outputAndroid);
  } catch (e) {
    console.log(e);
  }
}
