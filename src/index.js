const fs = require('fs');
const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];

fs.readFile(link, 'utf-8', (err , data) => {
    if (err) throw err;
    console.log(data);
})

console.log(link)