const API = 'http://localhost:3001/quintas'

async function tratarResposta(resposta) {
  if (!resposta.ok) {
    const dados = await resposta.json().catch(() => ({}))
    throw new Error(dados.erro || 'Ocorreu um erro inesperado.')
  }
  if (resposta.status === 204) return null
  return resposta.json()
}

export async function listarItens() {
  const resposta = await fetch(`${API}/itens`)
  return tratarResposta(resposta)
}

export async function obterItem(id) {
  const resposta = await fetch(`${API}/itens/${id}`)
  return tratarResposta(resposta)
}

export async function verificarDisponibilidade(id, { inicio, fim, quantidade }) {
  const parametros = new URLSearchParams({ inicio, fim, quantidade })
  const resposta = await fetch(`${API}/itens/${id}/disponibilidade?${parametros}`)
  return tratarResposta(resposta)
}

export async function criarReserva({ itemId, dataInicio, dataFim, quantidade, nome, email }) {
  const resposta = await fetch(`${API}/reservas`, {
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
  return tratarResposta(resposta)
}

export async function listarReservas() {
  const resposta = await fetch(`${API}/reservas`)
  return tratarResposta(resposta)
}

export async function cancelarReserva(id) {
  const resposta = await fetch(`${API}/reservas/${id}`, { method: 'DELETE' })
  return tratarResposta(resposta)
}
