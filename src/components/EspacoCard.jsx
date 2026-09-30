import ImagemEspaco from './ImagemEspaco.jsx'

export default function EspacoCard ( {espaco} ) {
    return (
        <div className="cartao-interativo">
           <div className="cartao-imagem">
                <ImagemEspaco src={espaco.imagem} alt={espaco.nome} />
           </div>

           <div className="cartao-corpo">
                <h3>{espaco.nome}</h3>
                <p className="subtitulo">
                    <span className="badge">{espaco.categoria}</span>
                    {espaco.regiao}
                </p>
                <div className="flex items-center justify-between">
                    <span className="preco">{espaco.precoDia}€ / dia</span>
                    <span className="avaliacao">★ {espaco.avaliacao}</span>
                </div>
           </div> 
        </div>
    )
}