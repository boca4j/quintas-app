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
        return nomeLimpo.includes(textoLimpo) || descricaoLimpa.inclues(textoLimpo)
    })
}