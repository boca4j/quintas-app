import { useParams } from 'react-router-dom'
import { useItem } from '../hooks/useItem.jsx'
import Loading from '../components/Loading.jsx'
import MensagemErro from '../components/MensagemErro.jsx'

export default function DetalhePage() {
  const { id } = useParams()
  const { item, loading, erro } = useItem(id)

  if (loading) return <Loading />

  if (erro) {
    const mensagem = erro.status === 404 ? 'Espaço não encontrado.' : erro.message
    return <MensagemErro mensagem={mensagem} />
  }

  return <div className="p-6">{item.nome}</div>
}

