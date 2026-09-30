import { validarData } from './datas.js'

export function validarConvidados(valor, capacidade) {
  if (valor === '') return 'O número de convidados é obrigatório.'
  
  const n = Number(valor)

  if (!Number.isInteger(n) || n < 1) return 'Indique um número inteiro de convidados (mínimo 1).'
  
  if (n > capacidade) return `Este espaço tem capacidade para ${capacidade} convidados.`
  return null
}

export function validarReserva({ inicio, fim, convidados }, capacidade) {
  const erros = validarData(inicio, fim)

  const erroConvidados = validarConvidados(convidados, capacidade)
  if (erroConvidados) erros.convidados = erroConvidados

  return erros
 }