import imagens from './imagens.json' with {type: 'json'} //sintaxe para importar json

const BASE_URL = 'http://localhost:3001'
const TEMA = 'quintas'

async function aplicar() {
    for (const [id, imagem] of Object.entries(imagens)) { //Object.entries transforma o obj {"1": "link"} numa lista [["1", "link"], ...]
        try {
            const resposta = await fetch(`${BASE_URL}/${TEMA}/itens/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imagem }), //JSON.stringify - converte o obj em texto / {imagem} é atalho para {imagem: imagem} (key e variavel c mesmo nome)
            })
        
            if (resposta.ok) {
                console.log(`OK - id ${id}: imagem aplicada`)
            } else {
                const erro = await resposta.json()
                console.log(`X - id ${id}: ${resposta.status} - ${erro.erro}`)
            }
            } catch (e) {
            console.log(`X - id ${id}: falha de ligação - ${e.message}`)
        }
    }
}

aplicar()