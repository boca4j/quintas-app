import {useItens} from '../hooks/useItens.jsx'
import EspacoCard from '../components/EspacoCard.jsx'

export default function ListaEspacosPage() {
  const {itens} = useItens()

  return (
    <div className="pagina">
      <div className="cabecalho-pagina">
        <div>
          <h1 className="text-3xl font-bold text-texto">Espaços</h1>
          <p className="subtitulo">Encontre o espaço ideal para o seu evento.</p>
        </div>
      </div>

      <div className="grelha">
        {itens.map((espaco) => (
          <EspacoCard key={espaco.id} espaco={espaco} />
        ))}
      </div>
    </div>
  )
}
