import { NavLink } from 'react-router-dom'

const linkClasses = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium ${
    isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
  }`

function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 px-6 py-3">
      <NavLink to="/" className="text-lg font-semibold text-gray-900">
        Quintas &amp; Eventos
      </NavLink>
      <div className="flex gap-2">
        <NavLink to="/" end className={linkClasses}>
          Espaços
        </NavLink>
        <NavLink to="/minhas-reservas" className={linkClasses}>
          As minhas reservas
        </NavLink>
        <NavLink to="/favoritos" className={linkClasses}>
          Favoritos
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
