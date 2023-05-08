const { mkdir, stat } = require( 'fs')
const path = require( 'path');
const { readdir, copyFile } = require('fs/promises') ;

const copyDirectory = async () => {

  try {
    mkdir(path.join(__dirname, 'newFolder'), {recursive: true}, (err) => {
      if (err) {
        return console.error(err);
      }
    });
  } catch (err) {
    console.error(err.message);
  }

  const opt = { withFileTypes: true };
  const pathDir = path.join(__dirname, 'files');

  try {
    const files = await readdir(pathDir, opt);
    console.log(files);
    for (const file of files) {
      console.log(path.join(__dirname, 'files', file.name));
      try {
        await copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'newFolder', file.name));
        console.log('source.txt was copied to destination.txt');
      } catch {
        console.error('The file could not be copied');
      }

    }
  } catch (err) {
    console.error(err);
  }
};

copyDirectory();
