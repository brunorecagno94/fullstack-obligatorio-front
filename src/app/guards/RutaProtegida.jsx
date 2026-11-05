import { Outlet, Navigate } from 'react-router'
import { useSelector } from 'react-redux'

const RutaProtegida = ({ rol }) => {
  const token = useSelector(state => state.usuario.token)
  const usuario = useSelector(state => state.usuario.usuario)

  if (!token) {
    return <Navigate to="/login" />
  }
  if (rol && usuario.rol !== rol) {
    return <Navigate to="/juegos" />
  }
  return <Outlet />
}

export default RutaProtegida