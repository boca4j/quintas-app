import { useReservas } from '../hooks/useReservas.js'
import Loading from '../components/Loading.jsx'
import MensagemErro from '../components/MensagemErro.jsx'

function MinhasReservasPage() {
  const { reservas, loading, erro, recarregar } = useReservas()

  if (loading) return <Loading mensagem="A carregar reservas..." />
  if (erro) return <MensagemErro mensagem={erro} onTentarNovamente={recarregar} />

  return (
    <div className="pagina">
      <h1>As minhas reservas</h1>

      <ul className="mt-6 flex flex-col gap-2">
        {reservas.map((reserva) => (
          <li key={reserva.id}>
            {reserva.espaco?.nome ?? `Espaço #${reserva.itemId}`}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MinhasReservasPage