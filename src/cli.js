import fs from 'fs';
import path from 'path';
import trataErros from './erros/funcoesErro.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander';
import chalk, { Chalk } from 'chalk';

const program = new Command();

program.version('0.0.1')
.option('-t, --texto <string>', 'caminho do texto a ser processado')
.option('-d, --destino <string>', 'caminho da pasta onde salver o arquivo de resultados')
.action((options) => {
    const { texto, destino } = options;
    console.log(`texto: ${texto}, destino: ${destino}`)
    if(!texto || !destino) {
        console.error(chalk.red('erro: inserir caminho de origem e destino.'))
        program.help();
        return
    }

    const caminhoTexto = path.resolve(texto);
    const caminhoDestino = path.resolve(destino)

    try{
        processaArquivo(caminhoTexto, caminhoDestino)
        console.log(chalk.green('texto processado com sucesso!'))
    }catch(err){
        throw new Error(chalk.red(`Ocorreu um erro no processamento ${err}`))
    }
})

program.parse();

function processaArquivo(texto, destino){
    fs.readFile(texto, 'utf-8', (erro , data) => {
        try{
            if (erro) throw erro
            const resultado = contaPalavras(data);
            criaESalvaArquivo(resultado, destino)
        }
        catch(erro){
            trataErros(erro)    
        }
    })
    
}


async function criaESalvaArquivo(listaPalavras, endereco){
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = montaSaidaArquivo(listaPalavras);
    try{
        await fs.promises.writeFile(arquivoNovo, textoPalavras)
        console.log(`Arquivo criado!`)
    }catch(err){
        throw err
    }
}