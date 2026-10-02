const API = 'http://localhost:3001/quintas'

async function pedir(url, opcoes) {
  let resposta
  try {
    resposta = await fetch(url, opcoes)
  }
  catch {
    throw new Error('Não foi possível contactar o servidor. Verifique a sua ligação à Internet.')
  }
  return tratarResposta(resposta)
}

async function tratarResposta(resposta) {
  if (!resposta.ok) {
    const dados = await resposta.json().catch(() => ({}))
    const erro = new Error(dados.erro || 'Ocorreu um erro inesperado.')
    erro.status = resposta.status
    throw erro
  }
  if (resposta.status === 204) return null
  return resposta.json()
}

export async function listarItens() {
  return pedir(`${API}/itens`)
}

export async function obterItem(id) {
  return pedir(`${API}/itens/${id}`)
}

export async function verificarDisponibilidade(id, { inicio, fim, quantidade }) {
  const parametros = new URLSearchParams({ inicio, fim, quantidade })
  return pedir(`${API}/itens/${id}/disponibilidade?${parametros}`)
}

export async function criarReserva({ itemId, dataInicio, dataFim, quantidade, nome, email }) 
{
    return pedir(`${API}/reservas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemId: Number(itemId),
        dataInicio,
        dataFim,
        quantidade: Number(quantidade),
        nome,
        email,
      }),
    })
}
export async function listarReservas() {
  return pedir(`${API}/reservas`)
}

export async function cancelarReserva(id) {
  return pedir(`${API}/reservas/${id}`, { method: 'DELETE' })
}
