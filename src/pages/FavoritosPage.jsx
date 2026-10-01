import { useEffect, useMemo, useState } from 'react'
import { listarItens } from '../api/quintasApi.js'
import { useFavoritos } from '../hooks/useFavoritos.jsx'
import Loading from '../components/Loading.jsx'
import MensagemErro from '../components/MensagemErro.jsx'
import EspacoCard from '../components/EspacoCard.jsx'

function FavoritosPage() {
  const { favoritos } = useFavoritos()
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

  if (loading) return <Loading mensagem="A carregar favoritos..." />
  if (erro) return <MensagemErro mensagem={erro} />

  return (
    <div className="pagina">
      <h1>Favoritos</h1>

      <div className="grelha mt-6">
        {espacosFavoritos.map((espaco) => (
          <EspacoCard key={espaco.id} espaco={espaco} />
        ))}
      </div>
    </div>
  )
}

export default FavoritosPage