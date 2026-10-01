import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { listarItens } from '../api/quintasApi.js'
import { useFavoritos } from '../hooks/useFavoritos.jsx'
import Loading from '../components/Loading.jsx'
import MensagemErro from '../components/MensagemErro.jsx'

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

      <ul className="mt-6 flex flex-col gap-2">
        {espacosFavoritos.map((espaco) => (
          <li key={espaco.id}>
            <Link to={`/espacos/${espaco.id}`}>{espaco.nome}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FavoritosPage