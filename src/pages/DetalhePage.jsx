import { useParams } from 'react-router-dom'
import { useItem } from '../hooks/useItem.jsx'
import Loading from '../components/Loading.jsx'
import MensagemErro from '../components/MensagemErro.jsx'
import ImagemEspaco from '../components/ImagemEspaco.jsx'

export default function DetalhePage() {
  const { id } = useParams()
  const { item, loading, erro } = useItem(id)

  if (loading) return <Loading mensagem="A carregar espaço..." />

  if (erro) {
    const mensagem = erro.status === 404 ? 'Espaço não encontrado.' : erro.message
    return <MensagemErro mensagem={mensagem} />
  }

  return (
    <div className="pagina max-w-3xl">
      <div className="cartao-imagem h-64 rounded-cartao">
        <ImagemEspaco src={item.imagem} alt={item.nome} />
      </div>

      <h1 className="mt-4 text-3xl font-bold text-texto">{item.nome}</h1>

      <p className="subtitulo">
        <span className="badge">{item.categoria}</span>
        {item.localizacao}
      </p>

      <p className="mt-2 text-texto">{item.descricao}</p>

      <div className="mt-4 flex items-center gap-4">
        <span className="preco">{item.precoDia}€ / dia</span>
        <span className="avaliacao">★ {item.avaliacao}</span>
        <span className="subtitulo">{item.capacidade} pessoas</span>
      </div>
    </div>
  )
}