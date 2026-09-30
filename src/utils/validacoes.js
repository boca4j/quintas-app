import { validarData } from './datas.js'

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validarConvidados(valor, capacidade) {
  if (valor === '') return 'O número de convidados é obrigatório.'
  const n = Number(valor)
  if (!Number.isInteger(n) || n < 1) return 'Indica um número inteiro de convidados (mínimo 1).'
  if (n > capacidade) return `Este espaço tem capacidade para ${capacidade} convidados.`
  return null
}

export function validarNome(nome) {
  return nome.trim() ? null : 'O nome é obrigatório.'
}

export function validarEmail(email) {
  if (!email.trim()) return 'O email é obrigatório.'
  if (!REGEX_EMAIL.test(email.trim())) return 'Indica um email válido.'
  return null
}


export function validarReserva({ inicio, fim, convidados, nome, email }, capacidade) {
  const erros = validarData(inicio, fim)

  const erroConvidados = validarConvidados(convidados, capacidade)
  if (erroConvidados) erros.convidados = erroConvidados

  const erroNome = validarNome(nome)
  if (erroNome) erros.nome = erroNome

  const erroEmail = validarEmail(email)
  if (erroEmail) erros.email = erroEmail

  return erros
}