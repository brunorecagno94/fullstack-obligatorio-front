import { Outlet, Navigate } from 'react-router'
import { useSelector } from 'react-redux'

const RutaPublica = () => {
  const token = useSelector(state => state.usuario.token)

  if (token) {
    return <Navigate to="/juegos" />
  }
  return <Outlet />
}

export default RutaPublica
