import { createContext, useContext, useEffect, useState } from 'react'

const CHAVE_LOCALSTORAGE = 'quintas-favoritos'
const FavoritosContext = createContext(null)

function lerFavoritosGuardados() {
  try {
    const guardados = localStorage.getItem(CHAVE_LOCALSTORAGE)
    return guardados ? JSON.parse(guardados) : []
  } catch {
    return []
  }
}

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(lerFavoritosGuardados)

  useEffect(() => {
    localStorage.setItem(CHAVE_LOCALSTORAGE, JSON.stringify(favoritos))
  }, [favoritos])

  function alternarFavorito(espacoId) {
    setFavoritos((atual) =>
      atual.includes(espacoId)
        ? atual.filter((id) => id !== espacoId)
        : [...atual, espacoId],
    )
  }

  function eFavorito(espacoId) {
    return favoritos.includes(espacoId)
  }

  return (
    <FavoritosContext.Provider value={{ favoritos, alternarFavorito, eFavorito }}>
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
