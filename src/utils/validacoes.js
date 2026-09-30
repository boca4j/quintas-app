import { validarData } from './datas.js'

export function validarReserva({ inicio, fim }) {
  return validarData(inicio, fim)
}