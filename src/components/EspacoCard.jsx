import ImagemEspaco from './ImagemEspaco.jsx'
import BotaoFavorito from './BotaoFavorito.jsx'
import { Link } from 'react-router-dom'

export default function EspacoCard ({espaco}) {
    return (
        <div className="cartao-interativo">
           <div className="cartao-imagem">
                <ImagemEspaco src={espaco.imagem} alt={espaco.nome} />
           </div>

           <div className="cartao-corpo">
                <div className="flex items-center justify-between">
                    <Link to={`/espacos/${espaco.id}`}>
                        <h3 className="hover:underline">{espaco.nome}</h3>
                    </Link>
                    
                    <BotaoFavorito espacoId={Number(espaco.id)} />
                </div>
                <p className="subtitulo">
                    <span className="badge">{espaco.categoria}</span>
                    {espaco.localizacao}
                </p>
                <div className="flex items-center justify-between">
                    <span className="preco">{espaco.precoDia}€ / dia</span>
                    <span className="avaliacao">★ {espaco.avaliacao}</span>
                </div>
           </div> 
        </div>
    )
}