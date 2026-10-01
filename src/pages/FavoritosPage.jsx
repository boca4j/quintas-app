import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { listarItens } from '../api/quintasApi.js'
import { useFavoritos } from '../hooks/useFavoritos.jsx'
import Loading from '../components/Loading.jsx'
import MensagemErro from '../components/MensagemErro.jsx'
import EspacoCard from '../components/EspacoCard.jsx'

function FavoritosPage() {
  const { favoritos, limparFavoritos } = useFavoritos()
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    listarItens()
      .then(setItens)
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false))
  }, [])

  const espacosFavoritos = useMemo(
    () => itens.filter((item) => favoritos.includes(Number(item.id))),
    [itens, favoritos],
  )

  function handleLimpar() {
    if (window.confirm('Remover todos os espaços dos favoritos?')) {
      limparFavoritos()
    }
  }

  if (loading) return <Loading mensagem="A carregar favoritos..." />
  if (erro) return <MensagemErro mensagem={erro} />

  if (espacosFavoritos.length === 0) {
    return (
      <div className="pagina">
        <h1>Favoritos</h1>
        <div className="estado-vazio mt-6">
          <p>Ainda não tens espaços favoritos.</p>
          <p className="subtitulo mt-1">Carrega na ☆ de um espaço para o guardares aqui.</p>
          <Link to="/" className="btn-primario mt-4">
            Ver espaços
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pagina">
      <div className="cabecalho-pagina">
        <h1>Favoritos</h1>
        <button type="button" onClick={handleLimpar} className="btn-secundario">
          Limpar favoritos
        </button>
      </div>

      <div className="grelha">
        {espacosFavoritos.map((espaco) => (
          <EspacoCard key={espaco.id} espaco={espaco} />
        ))}
      </div>
    </div>
  )
}

export default FavoritosPage