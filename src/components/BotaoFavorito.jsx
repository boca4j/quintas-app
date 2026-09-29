import { useFavoritos } from '../hooks/useFavoritos.jsx'

function BotaoFavorito({ espacoId }) {
  const { eFavorito, alternarFavorito } = useFavoritos()
  const favorito = eFavorito(espacoId)

  return (
    <button
      type="button"
      onClick={() => alternarFavorito(espacoId)}
      aria-label={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      className="text-xl leading-none"
    >
      {favorito ? '★' : '☆'}
    </button>
  )
}

export default BotaoFavorito
