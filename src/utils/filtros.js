function removerAcentos(str) {
    return (str || '')
     .toLowerCase()
     .normalize('NFD') //decompoe os caracteres acentuados nos seus componentes base ex: à -> "a" + "`"
     .replace(/[\u0300-\u036f]/g, '') //expressao regular que encontra e apaga todos os sinais de acentuacao isolados ex: "a" + "`" -> a
}

export function filtrarPorTexto(itens, texto) {
    if (!texto || !texto.trim()) return itens

    const textoLimpo = removerAcentos(texto)

    return itens.filter((item) => {
        const nomeLimpo = removerAcentos(item.nome)
        const descricaoLimpa = removerAcentos(item.descricao)
        return nomeLimpo.includes(textoLimpo) || descricaoLimpa.includes(textoLimpo)
    })
}

export function filtrarPorRegiao(itens, regiao){
    if (regiao === 'Todas') return itens
    return itens.filter((item) => item.localizacao === regiao)
}

export function filtrarPorTipo(itens, tipo) {
    if (tipo === 'Todos') return itens
    return itens.filter((item) => item.categoria === tipo)
}

export function ordenaerItens(itens, ordenacao) {
    const copiaArrayItens=[...itens]

    if(ordenacao === 'precoAsc') {
        return copiaArrayItens.sort((a, b) => a.precoDia - b.precoDia)
    }

    if(ordenacao === 'precoDesc') {
        return copiaArrayItens.sort((a, b) => b.precoDia - a.precoDia)
    }

    if(ordenacao === 'avaliacao') {
        return copiaArrayItens.sort((a, b) => b.avaliacao - a.avaliacao)
    }

    return copiaArrayItens
}