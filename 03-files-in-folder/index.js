const path = require('path');
const { readdir } = require('fs/promises') ;
const { stat } = require('fs');
const opt = { withFileTypes: true };
const pathDir = path.join(__dirname, 'secret-folder');

const readFolder = async() => {
  try {
    const files = await readdir(pathDir, opt);
    for (const file of files) {
      if (!file.isDirectory()) {
        const currPath = path.join(__dirname, 'secret-folder', file.name);
        const name = path.basename(currPath).split('.')[0];
        const ext = path.extname(currPath).split('.')[1];
        stat(currPath, (err, stats) => {
          const size = stats.size;
          console.log(`${name} - ${ext} - ${size}kb`);
        });
      }
    }
  } catch (err) {
    console.error(err);
  }};

readFolder();
