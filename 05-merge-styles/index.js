const path = require( 'path');
const { readdir} = require( 'fs/promises')
const fs = require('fs');

const merge = async () => {

  const opt = { withFileTypes: true };
  const pathDir = path.join(__dirname, 'styles');

  fs.writeFile(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    '',
    (err) => {
      if (err) throw err;
    }
  );

  try {
    const files = await readdir(pathDir, opt);
    for (const file of files) {
      const currPath = path.join(__dirname, file.name);
      const ext = path.extname(currPath);
      if (!file.isDirectory() && ext === '.css') {
        const readableStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
        readableStream.on('data', chunk => {
          fs.appendFile(
            path.join(__dirname, 'project-dist', 'bundle.css'),
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

merge();
