function BarraFiltros({texto, aoMudarTexto, regioes, regiao, aoMudarRegiao}) {
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
                {regioes.map((region) => {
                    <option
                        key={region}
                        value={region}>
                            {region}
                        </option>
                })}
                </select>
            </label>
        </div>
    )
}

export default BarraFiltros