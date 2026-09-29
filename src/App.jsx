import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ListaEspacosPage from './pages/ListaEspacosPage.jsx'
import DetalhePage from './pages/DetalhePage.jsx'
import MinhasReservasPage from './pages/MinhasReservasPage.jsx'
import FavoritosPage from './pages/FavoritosPage.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListaEspacosPage />} />
        <Route path="/espacos/:id" element={<DetalhePage />} />
        <Route path="/minhas-reservas" element={<MinhasReservasPage />} />
        <Route path="/favoritos" element={<FavoritosPage />} />
      </Routes>
    </>
  )
}

export default App
