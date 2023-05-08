const { mkdir, stat } = require( 'fs')
const path = require( 'path');
const { readdir } = require('fs/promises');
const fs = require('fs');
const { bundleStyles } = require( '../05-merge-styles/index');

// async function copyDir(srcDir, destDir) {
//   await copyFiles.copyFiles(srcDir, destDir);
//   await copyStyle.copyStylesFiles(path.join(__dirname, 'project-dist', 'style.css'), path.join(__dirname, 'styles'));
//   await buildHTML();
// }


try {
  mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {
    if (err) {
      return console.error(err);
    }
  });
} catch (err) {
  console.error(err.message);
}


const dirName =__dirname;
console.log(dirName);
bundleStyles('project-dist', 'bundle.css', 'styles', dirName);

// const buildPage = async () => {
//   try {
//     mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {
//       if (err) {
//         return console.error(err);
//       }
//     });
//   } catch (err) {
//     console.error(err.message);
//   }
//
//   const opt = { withFileTypes: true };
//   const pathDir = path.join(__dirname, 'components');
//
//   try {
//     const files = await readdir(pathDir, opt);
//     for (const file of files) {
//       const currPath = path.join(__dirname, file.name);
//       const component = path.basename(currPath).split('.')[0];
//
//     }
//   } catch (err) {
//     console.error(err);
//   }
//
//
//   const readableStream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
//   readableStream.on('data', chunk => {
//
//     fs.appendFile(
//       path.join(__dirname, 'project-dist', 'index.html'),
//       `${chunk}`,
//       err => {
//         if (err) throw err;
//       });
//
//   });
//
// };

// buildPage();
