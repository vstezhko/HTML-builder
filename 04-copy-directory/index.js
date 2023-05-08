const { mkdir, copyFile, readdir, stat} = require('fs/promises');
const path = require('path');

async function copyFolder(srcFolder, destFolder) {
  await mkdir(destFolder, { recursive: true });
  const entries = await readdir(srcFolder);

  for (const entry of entries) {

    const src = path.join(srcFolder, entry);
    const dest = path.join(destFolder, entry);
    const stats = await stat(src);

    if (stats.isDirectory()) {
      await copyFolder(src, dest);
    } else {
      await copyFile(src, dest);
    }
  }
}

if (require.main === module) {
  copyFolder(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'));
}

module.exports = {copyFolder};

