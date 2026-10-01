function BarraFiltros({
    texto, 
    aoMudarTexto, 
    regioes, 
    regiao, 
    aoMudarRegiao, 
    tiposEspaco, 
    tipoEspaco, 
    aoMudarTipoEspaco,
    ordenacao,
    aoMudarOrdenacao,
    aoLimparFiltros
}) {
    return (
        <div className="barra-filtros">
            <label className="campo">
                <span className="label">Pesquisar</span>
                <input
                    type="text"
                    value={texto}
                    onChange={(e => aoMudarTexto(e.target.value))}
                    placeholder="Escreva um nome ou descrição..."
                    className="input" 
                />
            </label>

            <label className="campo">
                <span className="label">Região</span>
                <select
                    value={regiao}
                    onChange={(e => aoMudarRegiao(e.target.value))}
                    className="input" 
                >
                <option value="Todas">Todas</option>
                {regioes.map((region) => (
                    <option
                        key={region}
                        value={region}>
                            {region}
                        </option>
                ))}
                </select>
            </label>

            <label className="campo">
                <span className="label">Tipo de Espaço</span>
                <select
                    value={tipoEspaco}
                    onChange={(e => aoMudarTipoEspaco(e.target.value))}
                    className="input" 
                >
                <option value="Todos">Todos</option>
                {tiposEspaco.map((tipo) => (
                    <option
                        key={tipo}
                        value={tipo}>
                            {tipo}
                        </option>
                ))}
                </select>
            </label>

            <label className="campo">
                <span className="label">Ordenar por</span>
                <select
                    value={ordenacao}
                    onChange={(e => aoMudarOrdenacao(e.target.value))}
                    className="input" 
                >
                <option value="">Relevância</option>
                <option value="precoAsc">Preço Ascendente</option>
                <option value="precoDesc">Preço Descendente</option>
                <option value="avaliacao">Melhor Avaliação</option>
                </select>
            </label>

            <button
                type="button"
                onClick={aoLimparFiltros}
                className="btn-secundario"
            >
                Limpar Filtros
            </button>
        </div>
    )
}

export default BarraFiltros