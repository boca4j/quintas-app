import { useContext } from 'react'
import { FavoritosContext } from './FavortitosContext.js'

export function useFavoritos() {
  const contexto = useContext(FavoritosContext)
  if (!contexto) {
    throw new Error('useFavoritos tem de ser usado dentro de um FavoritosProvider')
  }
  return contexto
}