import {useItens} from '../hooks/useItens.jsx'
import EspacoCard from '../components/EspacoCard.jsx'
import Loading from '../components/Loading.jsx'
import MensagemErro from '../components/MensagemErro.jsx'
import {useMemo, useState} from 'react'
import BarraFiltros from '../components/BarraFiltros.jsx'
import {
  filtrarPorTexto,
  filtrarPorRegiao,
  filtrarPorTipo,
  ordenarItens,
  regioesDisponiveis,
  tiposDisponiveis,
} from '../utils/filtros.js'

export default function ListaEspacosPage() {
  const {itens, loading, erro} = useItens()
  const [texto, setTexto] = useState('')
  const [regiao, setRegiao] = useState('Todas')
  const [tipo, setTipo] = useState('Todos')
  const [ordenacao, setOrdenacao] = useState('')

  const regioes = useMemo(() => regioesDisponiveis(itens), [itens])
  const tipos = useMemo(() => tiposDisponiveis(itens), [itens])

  //useMemo - memoriza o resultado e so volta a calcular quando algum item da lista alterar. Evita o re-render
  const visiveis = useMemo(() => {
    let resultado = filtrarPorTexto(itens, texto)
    resultado = filtrarPorRegiao(resultado, regiao)
    resultado = filtrarPorTipo(resultado, tipo)
    resultado = ordenarItens(resultado, ordenacao)
    return resultado
  }, [itens, texto, regiao, tipo, ordenacao]) //dependencias - lista dos item que se mudarem, obriga a recalcular

  function aoLimparFiltros() {
    setTexto('')
    setRegiao('Todas')
    setTipo('Todos')
    setOrdenacao('')
  }

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

      <BarraFiltros 
        texto={texto}
        aoMudarTexto={setTexto}
        regiao={regiao}
        aoMudarRegiao={setRegiao}
        regioes={regioes}
        tipoEspaco={tipo}
        aoMudarTipoEspaco={setTipo}
        tiposEspaco={tipos}
        ordenacao={ordenacao}
        aoMudarOrdenacao={setOrdenacao}
        aoLimparFiltros={aoLimparFiltros}
      >
      </BarraFiltros>

      {visiveis.length === 0 ? (
        <div className="estado-vazio">
          Nenhum espaço corresponde à pesquisa.
        </div>
      ) : (
        <div className="grelha">
          {visiveis.map((espaco) => (
            <EspacoCard key={espaco.id} espaco={espaco} />
          ))}
        </div>
      )}
    </div>
  )
}
