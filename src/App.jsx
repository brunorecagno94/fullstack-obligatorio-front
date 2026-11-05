import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import store from './store/store'
import RutaProtegida from './app/guards/RutaProtegida'
import ContainerPage from './pages/ContainerPage'
import PaginaLogin from './pages/auth/PaginaLogin'
import PaginaRegistro from './pages/auth/PaginaRegistro'
import PaginaJuegos from './pages/juegos/PaginaJuegos'
import PaginaBiblioteca from './pages/biblioteca/PaginaBiblioteca'
import PaginaNoEncontrada from './pages/PaginaNoEncontrada'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PaginaLogin />} />
          <Route path="/registro" element={<PaginaRegistro />} />
          <Route element={<RutaProtegida />}>
            <Route path="/" element={<ContainerPage />}>
              <Route index element={<Navigate to="/juegos" />} />
              <Route path="juegos" element={<PaginaJuegos />} />
              <Route element={<RutaProtegida rol="usuario" />}>
                <Route path="biblioteca" element={<PaginaBiblioteca />} />
              </Route>
              <Route path="*" element={<PaginaNoEncontrada />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Provider>
  )
}

export default App
