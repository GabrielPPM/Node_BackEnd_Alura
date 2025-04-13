function filtraOcorrencias(paragrafo){
    return Object.keys(paragrafo).filter(chave => paragrafo[chave] > 1)
}

function montaSaidaArquivo(listaPalavras){
    let textoFinal = '';
    listaPalavras.forEach((paragrafo, indice) => {
        if(Object.values(paragrafo).some(verificaSeEhMaior)){
            const duplicadas = filtraOcorrencias(paragrafo).join(', ');
            textoFinal += `Palavras duplicadas no parágrafo ${indice + 1}: ${duplicadas} \n`
        }
    })

    return textoFinal
}

function verificaSeEhMaior(valor){
    return valor > 1;
}

export { montaSaidaArquivo }