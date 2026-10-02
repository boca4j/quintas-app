import { Link } from 'react-router-dom'

export default function NaoEncontrada() {
  return (
    <div className="pagina text-center">
      <h1>404</h1>
      <p className="mt-2 text-texto-suave">Página não encontrada.</p>
      <Link to="/" className="btn-primario mt-6 inline-flex">
        Voltar à lista
      </Link>
    </div>
  )
}