import { createContext, useContext, useEffect, useState } from 'react'

const CHAVE_LOCALSTORAGE = 'quintas-favoritos'
const FavoritosContext = createContext(null)

function lerFavoritosGuardados() {
  try {
    const guardados = JSON.parse(localStorage.getItem(CHAVE_LOCALSTORAGE))
    return Array.isArray(guardados) ? guardados.map(Number) : []
  } catch {
    return []
  }
}

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(lerFavoritosGuardados)

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_LOCALSTORAGE, JSON.stringify(favoritos))
    } catch {
      // localStorage indisponível: os favoritos ficam só em memória
    }
  }, [favoritos])

  function eFavorito(espacoId) {
    return favoritos.includes(Number(espacoId))
  }

  function alternarFavorito(espacoId) {
    const id = Number(espacoId)
    setFavoritos((atual) =>
      atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id],
    )
  }

  function limparFavoritos() {
    setFavoritos([])
  }

  return (
    <FavoritosContext.Provider value={{ favoritos, eFavorito, alternarFavorito, limparFavoritos }}>
      {children}
    </FavoritosContext.Provider>
  )
}

export function useFavoritos() {
  const contexto = useContext(FavoritosContext)
  if (!contexto) {
    throw new Error('useFavoritos tem de ser usado dentro de um FavoritosProvider')
  }
  return contexto
}