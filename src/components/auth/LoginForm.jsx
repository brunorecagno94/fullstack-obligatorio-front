import { useNavigate, Link } from 'react-router'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import api from '../../api/api'
import { loginSchema } from '../../validators/auth.validators'
import { iniciarSesion } from '../../features/usuario.slice'
import Input from '../common/Input'
import Boton from '../common/Boton'

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } =
    useForm({ resolver: joiResolver(loginSchema)})

  const ingresar = async (data) => {
    try {
      const res = await api.post('/auth/login', data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('usuario', JSON.stringify(res.data.usuario));
      dispatch(iniciarSesion(res.data));
      toast.success(`¡Bienvenido, ${res.data.usuario.nombreUsuario}!`);
      navigate('/juegos');
    } catch (error) {
      toast.error(error.response?.data?.message || 'No se pudo iniciar sesión');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(ingresar)}>
        <Input label="Usuario:" id="loginUsuario" type="text"
          {...register('nombreUsuario')} error={errors.nombreUsuario?.message} />
        <Input label="Contraseña:" id="loginPassword" type="password"
          {...register('password')} error={errors.password?.message} />
        <Boton type="submit" disabled={!isValid || isSubmitting}>Ingresar</Boton>
      </form>
      <p>¿No tenés cuenta? <Link to="/registro">Registrate acá</Link></p>
    </>
  )
}

export default LoginForm