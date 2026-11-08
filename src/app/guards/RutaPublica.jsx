import { Outlet, Navigate } from 'react-router'
import { useSelector } from 'react-redux'
import { tokenVencido } from '../../utils/token.utils'

const RutaPublica = () => {
  const token = useSelector(state => state.usuario.token)

  if (token && !tokenVencido(token)) {
    return <Navigate to="/juegos" />
  }
  return <Outlet />
}

export default RutaPublica