import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Espaços', end: true },
  { to: '/minhas-reservas', label: 'As minhas reservas', curto: 'Reservas' },
  { to: '/favoritos', label: 'Favoritos' },
]

const linkClasses = ({ isActive }) =>
  `whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ${
    isActive ? 'bg-primaria-600 text-white' : 'text-texto hover:bg-areia-100'
  }`

function Navbar() {
  return (
    <nav className="sticky top-0 z-10 border-b border-areia-200 bg-white px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <NavLink to="/" className="whitespace-nowrap text-lg font-semibold text-texto">
          Quintas &amp; Eventos
        </NavLink>

        <div className="flex flex-wrap gap-1 sm:gap-2">
          {LINKS.map(({ to, label, curto, end }) => (
            <NavLink key={to} to={to} end={end} aria-label={label} className={linkClasses}>
              {curto ? (
                <>
                  <span className="sm:hidden">{curto}</span>
                  <span className="hidden sm:inline">{label}</span>
                </>
              ) : (
                label
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar