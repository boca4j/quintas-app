import { useReservas } from '../hooks/useReservas.js'
import Loading from '../components/Loading.jsx'
import MensagemErro from '../components/MensagemErro.jsx'
import ImagemEspaco from '../components/ImagemEspaco.jsx'
import { Link } from 'react-router-dom'

function calcularDias(inicio, fim) {
  const umDia = 1000 * 60 * 60 * 24
  return Math.round((new Date(fim) - new Date(inicio)) / umDia) + 1
}

function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-PT')
}

function formatarPreco(valor) {
  return valor.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })
}

function MinhasReservasPage() {
  const { reservas, loading, erro, recarregar } = useReservas()

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

      <ul className="mt-6 flex flex-col gap-4">
        {reservas.map((reserva) => {
          const dias = calcularDias(reserva.dataInicio, reserva.dataFim)
          const total = reserva.total ?? (reserva.espaco ? reserva.espaco.preco * dias : null)

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
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}


export default MinhasReservasPage