import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import './App.css'
import ContainerPage from './pages/ContainerPage'
import PaginaJuegos from './pages/juegos/PaginaJuegos'
import PaginaBiblioteca from './pages/biblioteca/PaginaBiblioteca'
import PaginaNoEncontrada from './pages/PaginaNoEncontrada'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContainerPage />}>
          <Route index element={<Navigate to="/juegos" />} />
          <Route path="juegos" element={<PaginaJuegos />} />
          <Route path="biblioteca" element={<PaginaBiblioteca />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
