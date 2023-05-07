const path = require('path');
const fs = require('fs');
const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
readableStream.on('data', chunk => console.log(chunk));
readableStream.on( 'error', error => error.message)