const path = require( 'path');
const { readdir} = require( 'fs/promises')
const fs = require('fs');

const bundleStyles = async (destFolder, destFile, srcFolder, dirName = __dirname) => {

  const opt = { withFileTypes: true };
  const pathDir = path.join(dirName, srcFolder);


  fs.writeFile(
    path.join(dirName, destFolder, destFile),
    '',
    err => {
      if (err) throw err;
    });

  try {
    const files = await readdir(pathDir, opt);
    for (const file of files) {
      const currPath = path.join(dirName, file.name);
      const ext = path.extname(currPath);
      if (!file.isDirectory() && ext === '.css') {
        const readableStream = fs.createReadStream(path.join(dirName, srcFolder, file.name), 'utf-8');
        readableStream.on('data', chunk => {
          fs.appendFile(
            path.join(dirName, destFolder, destFile),
            `${chunk}`,
            err => {
              if (err) throw err;
            });
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
};

if (require.main === module) {
  bundleStyles('project-dist', 'bundle.css', 'styles', __dirname);
}

module.exports = {bundleStyles};
