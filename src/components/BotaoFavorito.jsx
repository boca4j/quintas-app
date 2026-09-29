import { useFavoritos } from '../hooks/useFavoritos.jsx'

function BotaoFavorito({ espacoId }) {
  const { eFavorito, alternarFavorito } = useFavoritos()
  const favorito = eFavorito(espacoId)
  const texto = favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'

  function handleClick(evento) {
    evento.preventDefault()
    evento.stopPropagation()
    alternarFavorito(espacoId)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={favorito}
      aria-label={texto}
      title={texto}
      className={`btn-icone transition hover:scale-110 ${favorito ? '' : 'text-areia-500'}`}
    >
      {favorito ? '★' : '☆'}
    </button>
  )
}

export default BotaoFavorito