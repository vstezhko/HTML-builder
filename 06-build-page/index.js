const { mkdir, stat } = require( 'fs')
const path = require( 'path');
const { readFile, writeFile } = require('fs/promises');
const { bundleStyles } = require( '../05-merge-styles/index');
const { copyFolder } = require( '../04-copy-directory/index');


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
bundleStyles('project-dist', 'style.css', 'styles', dirName);
copyFolder( path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist','assets'));

async function createTemplate(src, componentsFolder) {
  try {
    const template = await readFile(src);
    const stringTemplate = template.toString();
    const componentTemplates = stringTemplate.match(/{{(.*?)}}/gi);
    let newFileHTML = stringTemplate;

    if (componentTemplates) {
      for (let template of componentTemplates) {
        const name = `${template.slice(2, template.length-2)}.html`;
        const fileContent = await readFile(path.join(__dirname, componentsFolder, name));
        newFileHTML = newFileHTML.replace(template, fileContent.toString());
      }

      writeFile(path.join(__dirname, 'project-dist', 'index.html'), newFileHTML);

    }
  } catch (err) {
    console.log(err);
  }
}

createTemplate(path.join(__dirname, 'template.html'), 'components');

