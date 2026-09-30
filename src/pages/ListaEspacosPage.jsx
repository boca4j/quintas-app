import {useItens} from '../hooks/useItens.jsx'
import EspacoCard from '../components/EspacoCard.jsx'
import Loading from '../components/Loading.jsx'
import MensagemErro from '../components/MensagemErro.jsx'

export default function ListaEspacosPage() {
  const {itens, loading, erro} = useItens()

  if (loading) {
    return <Loading mensagem="A carregar espaços..." />
  }

  if (erro) {
    return <MensagemErro mensagem={erro} />
  }

  return (
    <div className="pagina">
      <div className="cabecalho-pagina">
        <div>
          <h1 className="text-3xl font-bold text-texto">Espaços</h1>
          <p className="subtitulo">Encontre o espaço ideal para o seu evento.</p>
        </div>
      </div>

      {itens.length === 0 ? (
        <div classeName="estado-vazio">
          Nenhum espaço encontrado.
        </div>
      ) : (
        <div className="grelha">
          {itens.map((espaco) => (
            <EspacoCard key={espaco.id} espaco={espaco} />
          ))}
        </div>
      )}
    </div>
  )
}
