import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import api from '../../api/api'
import { cambiarPlan } from '../../features/usuario.slice'
import InformeCuenta from '../../components/usuario/InformeCuenta'
import CambioPlan from '../../components/usuario/CambioPlan'

const PaginaUsuario = () => {
  const token = useSelector(state => state.usuario.token)
  const usuario = useSelector(state => state.usuario.usuario)
  const dispatch = useDispatch()

  const pasarAPremium = async () => {
    try {
      const res = await api.patch('/usuarios/upgrade', {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      dispatch(cambiarPlan('premium'))
      localStorage.setItem('usuario', JSON.stringify({ ...usuario, planUsuario: 'premium' }))
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response?.data?.message || 'No se pudo cambiar el plan')
    }
  }

  return (
    <div className="pagina-cuenta">
      <h2>Mi perfil</h2>
      <p>Usuario: {usuario.nombreUsuario}</p>
      <p>Plan: {usuario.planUsuario === 'premium' ? 'Premium' : 'Plus'}</p>
      <InformeCuenta plan={usuario.planUsuario} cantidad={usuario.juegosComprados.length} />
      {usuario.planUsuario === 'plus' && <CambioPlan pasarAPremium={pasarAPremium} />}
    </div>
  )
}

export default PaginaUsuario