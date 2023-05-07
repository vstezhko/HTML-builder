const path = require('path');
const fs = require('fs');
const readline = require('node:readline');

fs.writeFile(
  path.join(__dirname, 'text.txt'),
  '',
  (err) => {
    if (err) throw err;
    // console.log('Файл был создан');
  }
);

const {
  stdin: input,
  stdout: output,
} = require('node:process');

const rl = readline.createInterface({ input, output });

rl.write('Что записать в файл?\n');

rl.on('line', (input) => {

  if (input === 'exit') {
    rl.close();
    return;
  }

  if (input !== 'Что записать в файл?\n') {
    fs.appendFile(
      path.join(__dirname, 'text.txt'),
      `${input}\n`,
      err => {
        if (err) throw err;
      });
  }
});

rl.on( 'close', () => {
  console.log('Прощальная фраза');
});

rl.on( 'SIGINT', rl.close);
