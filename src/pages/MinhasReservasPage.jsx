import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReservas } from '../hooks/useReservas.jsx'
import Loading from '../components/Loading.jsx'
import MensagemErro from '../components/MensagemErro.jsx'
import ImagemEspaco from '../components/ImagemEspaco.jsx'
import { calcularDias } from '../utils/datas.js'

function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-PT')
}

function formatarPreco(valor) {
  return valor.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })
}

function MinhasReservasPage() {
  const { reservas, loading, erro, recarregar, cancelar } = useReservas()
  const [aCancelar, setACancelar] = useState(null)
  const [erroCancelar, setErroCancelar] = useState(null)

  async function handleCancelar(reserva) {
    const nomeEspaco = reserva.espaco?.nome ?? 'este espaço'
    if (!window.confirm(`Cancelar a reserva de ${nomeEspaco}?`)) return

    setACancelar(reserva.id)
    setErroCancelar(null)
    try {
      await cancelar(reserva.id)
    } catch (e) {
      setErroCancelar(e.message)
    } finally {
      setACancelar(null)
    }
  }

  if (loading) return <Loading mensagem="A carregar reservas..." />
  if (erro) return <MensagemErro mensagem={erro} onTentarNovamente={recarregar} />
  if (reservas.length === 0) {
    return (
      <div className="pagina">
        <h1>As minhas reservas</h1>
        <div className="estado-vazio mt-6">
          <p>Ainda não tens reservas.</p>
          <Link to="/" className="btn-primario mt-4">
            Ver espaços
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pagina">
      <h1>As minhas reservas</h1>

      {erroCancelar && (
        <div className="mt-4">
          <MensagemErro mensagem={erroCancelar} />
        </div>
      )}

      <ul className="mt-6 flex flex-col gap-4">
        {reservas.map((reserva) => {
          const dias = calcularDias(reserva.dataInicio, reserva.dataFim)
          const total = reserva.total ?? (reserva.espaco ? reserva.espaco.precoDia * dias : null)

          return (
            <li key={reserva.id} className="cartao flex flex-col sm:flex-row">
              <div className="h-40 sm:h-auto sm:w-48 shrink-0">
                <ImagemEspaco src={reserva.espaco?.imagem} alt={reserva.espaco?.nome ?? 'Espaço'} />
              </div>

              <div className="cartao-corpo flex-1">
                <h3>{reserva.espaco?.nome ?? `Espaço #${reserva.itemId}`}</h3>

                <dl className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="subtitulo">Datas</dt>
                    <dd>
                      {formatarData(reserva.dataInicio)}
                      {reserva.dataFim !== reserva.dataInicio && ` a ${formatarData(reserva.dataFim)}`}
                      {` (${dias} ${dias === 1 ? 'dia' : 'dias'})`}
                    </dd>
                  </div>
                  <div>
                    <dt className="subtitulo">Convidados</dt>
                    <dd>{reserva.quantidade}</dd>
                  </div>
                  <div>
                    <dt className="subtitulo">Nome</dt>
                    <dd>{reserva.nome}</dd>
                  </div>
                  <div>
                    <dt className="subtitulo">Email</dt>
                    <dd>{reserva.email}</dd>
                  </div>
                </dl>

                {total !== null && (
                  <p className="preco mt-2">Total: {formatarPreco(total)}</p>
                )}

                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleCancelar(reserva)}
                    disabled={aCancelar === reserva.id}
                    className="btn-perigo"
                  >
                    {aCancelar === reserva.id ? 'A cancelar...' : 'Cancelar reserva'}
                  </button>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}


export default MinhasReservasPage