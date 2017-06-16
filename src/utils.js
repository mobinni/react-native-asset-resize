export function getImagesInPath(dirPath) {
  try {
    const normalizedPath = path.normalize(dirPath);
    if (!fs.lstatSync(normalizedPath).isDirectory()) {
      throw new Error('Given path is not a directory');
    }

    return new Promise((resolve, reject) => {
      fs.readdir(normalizedPath, (err, files) => {
        if (err) {
          reject('An error occurred while reading the path');
        }
        resolve(
          files
            .filter(f => /\.(jpg|png|jpeg)/.test(f))
            .map(f => path.resolve(normalizedPath, f))
        );
      });
    });
  } catch (e) {
    console.log(chalk.red(e));
  }
}

export function createIOSContents(dirPath) {
  try {
    fs.writeFile
  } catch (e) {
    console.log(chalk.red(e));
  }
}
