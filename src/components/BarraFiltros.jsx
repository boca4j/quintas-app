function BarraFiltros({texto, aoMudarTexto}) {
    return (
        <div className="barra-filtros">
            <label className="campo">
                <span className="label">Pesquisar</span>
                <input
                    type="text"
                    value={value}
                    onChange={(e => aoMudarTexto(e.target.value))}
                    placeholder="Escreva um nome ou descrição..."
                    className="input" 
                />
            </label>
        </div>
    )
}

export default BarraFiltros