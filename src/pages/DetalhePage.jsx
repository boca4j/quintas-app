import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useItem } from '../hooks/useItem.jsx'
import { verificarDisponibilidade, criarReserva } from '../api/quintasApi.js'
import Loading from '../components/Loading.jsx'
import MensagemErro from '../components/MensagemErro.jsx'
import ImagemEspaco from '../components/ImagemEspaco.jsx'
import BotaoFavorito from '../components/BotaoFavorito.jsx'
import ReservaForm from '../components/ReservaForm.jsx'

export default function DetalhePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { item, loading, erro } = useItem(id)
  const [aSubmeter, setASubmeter] = useState(false)
  const [erroReserva, setErroReserva] = useState(null)
  const [sucesso, setSucesso] = useState(false)

  async function handleReservar(dados) {
    setASubmeter(true)
    setErroReserva(null)

    try {
      const { disponivel } = await verificarDisponibilidade(dados.itemId, {
        inicio: dados.dataInicio,
        fim: dados.dataFim,
        quantidade: dados.quantidade,
      })

      if (!disponivel) {
        setErroReserva('Sem disponibilidade para as datas escolhidas.')
        return
      }

      await criarReserva(dados)
      setSucesso(true)
      setTimeout(() => navigate('/minhas-reservas'), 1500)
    } catch (erroApi) {
      setErroReserva(erroApi.message)
    } finally {
      setASubmeter(false)
    }
  }

  if (loading) return <Loading mensagem="A carregar espaço..." />

  if (erro) {
    const mensagem = erro.status === 404 ? 'Espaço não encontrado.' : erro.message
    return <MensagemErro mensagem={mensagem} />
  }

  return (
    <div className="pagina max-w-3xl">
      <Link to="/" className="subtitulo hover:underline">
        ← Voltar à lista
      </Link>

      <section className="cartao mt-4 p-6">
        <div className="cartao-imagem mt-4 h-64 rounded-cartao">
          <ImagemEspaco src={item.imagem} alt={item.nome} />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-texto">{item.nome}</h1>
          <BotaoFavorito espacoId={Number(id)} />
        </div>

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
      </section>

      <section className="cartao mt-4 p-6">
        <h1 className="mb-4 text-2xl font-semibold text-texto">Faça aqui a sua reserva</h1>
        {sucesso ? (
          <p className="alerta-sucesso mt-6" role="status">
            Reserva criada com sucesso! A redirecionar para as suas reservas...
          </p>
        ) : (
          <div className="mt-6">
            <ReservaForm espaco={item} onSubmit={handleReservar} aSubmeter={aSubmeter} />
            <MensagemErro mensagem={erroReserva} />
          </div>
        )}
      </section>
    </div>
  )
}