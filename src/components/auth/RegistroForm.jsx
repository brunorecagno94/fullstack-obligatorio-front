import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import api from '../../api/api'
import { registroSchema } from '../../validators/auth.validators'
import { iniciarSesion } from '../../features/usuario/usuario.slice'
import Input from '../common/Input'
import Boton from '../common/Boton'
import Select from '../common/Select'
import axios from 'axios'

const RegistroForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } =
    useForm({ resolver: joiResolver(registroSchema), mode: 'onChange' })

  const ingresar = async (data) => {
    const datos = { ...data }
    if (datos.nombre === '') delete datos.nombre;
    if (datos.apellido === '') delete datos.apellido;
    if (datos.pais === '') delete datos.pais;

    try {
      const res = await api.post('/auth/registro', datos);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('usuario', JSON.stringify(res.data.usuario));
      dispatch(iniciarSesion(res.data));
      toast.success(`¡Bienvenido, ${res.data.usuario.nombreUsuario}!`);
      navigate('/juegos');
    } catch (error) {
      toast.error(error.response?.data?.message || 'No se pudo iniciar sesión');
    }
  }

  const [paises, setPaises] = useState([])

  useEffect(() => {
    axios.get('https://cdn.jsdelivr.net/npm/i18n-iso-countries@7.14.0/langs/es.json')
      .then(r => {
        const nombres = Object.values(r.data.countries)
          .map(nombre => Array.isArray(nombre) ? nombre[0] : nombre)
          .sort((a, b) => a.localeCompare(b))
        setPaises(nombres)
      })
      .catch(() => setPaises([]))
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit(ingresar)}>
        <Input label="Nombre de usuario *:" id="loginUsuario" type="text"
          {...register('nombreUsuario')} error={errors.nombreUsuario?.message} required />
        <Input label="Contraseña *:" id="loginPassword" type="password"
          {...register('password')} error={errors.password?.message} required />
        <Input label="Confirmar Contraseña *:" id="loginRepetirPassword" type="password"
          {...register('repetirPassword')} error={errors.repetirPassword?.message} required />
        <Input label="Email *:" id="loginEmail" type="email"
          {...register('email')} error={errors.email?.message} required />
        <Input label="Nombre:" id="loginNombre" type="text"
          {...register('nombre')} error={errors.nombre?.message} />
        <Input label="Apellido:" id="loginApellido" type="text"
          {...register('apellido')} error={errors.apellido?.message} />
        <Input label="Fecha de Nacimiento *:" id="loginFechaNacimiento" type="date"
          {...register('fechaNacimiento')} error={errors.fechaNacimiento?.message} required />
        <Select label="País:" id="registroPais" placeholder="Elegí tu país"
          opciones={paises.map(pais => ({ valor: pais, texto: pais }))}
          {...register('pais')} error={errors.pais?.message} />

        <p>(*) Estos campos son obligatorios</p>

        <Boton type="submit" disabled={!isValid || isSubmitting}>Registrarse</Boton>
      </form>
      <p>¿Ya tenés una cuenta? <a href="/login">Ingresá acá</a></p>
    </>
  )
}

export default RegistroForm