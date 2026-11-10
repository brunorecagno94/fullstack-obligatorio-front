import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../api/api';
import { registroSchema } from '../../validators/auth.validators';
import { iniciarSesion } from '../../features/usuario.slice';
import Input from '../common/Input';
import Boton from '../common/Boton';
import Select from '../common/Select';
import axios from 'axios';

const RegistroForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } =
    useForm({ resolver: joiResolver(registroSchema), mode: 'onChange' });

  const ingresar = async (data) => {
    const datos = { ...data };
    if (datos.nombre === '') delete datos.nombre;
    if (datos.apellido === '') delete datos.apellido;
    if (datos.pais === '') delete datos.pais;

    try {
      const res = await api.post('/auth/registro', datos);
      dispatch(iniciarSesion(res.data));
      toast.success(`¡Bienvenido, ${res.data.usuario.nombreUsuario}!`);
      navigate('/juegos');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Ocurrió un error, intenta nuevamente');
    }
  };

  const [paises, setPaises] = useState([]);

  useEffect(() => {
    axios.get('https://cdn.jsdelivr.net/npm/i18n-iso-countries@7.14.0/langs/es.json')
      .then(r => {
        const nombres = Object.values(r.data.countries)
          .map(nombre => Array.isArray(nombre) ? nombre[0] : nombre)
          .sort((a, b) => a.localeCompare(b));
        setPaises(nombres);
      })
      .catch(() => toast.error('No se pudo cargar la lista de países'));
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(ingresar)}>
        <Input label="Nombre de usuario *:" type="text"
          {...register('nombreUsuario')} error={errors.nombreUsuario?.message} />
        <Input label="Email *:" type="email"
          {...register('email')} error={errors.email?.message} />

        <div className="auth__fila">
          <Input label="Contraseña *:" type="password"
            {...register('password')} error={errors.password?.message} />
          <Input label="Confirmar contraseña *:" type="password"
            {...register('repetirPassword')} error={errors.repetirPassword?.message} />
        </div>

        <div className="auth__fila">
          <Input label="Nombre:" type="text"
            {...register('nombre')} error={errors.nombre?.message} />
          <Input label="Apellido:" type="text"
            {...register('apellido')} error={errors.apellido?.message} />
        </div>

        <div className="auth__fila">
          <Input label="Fecha de nacimiento *:" type="date"
            {...register('fechaNacimiento')} error={errors.fechaNacimiento?.message} />
          <Select label="País:" placeholder="Elegí tu país"
            opciones={paises.map(pais => ({ valor: pais, texto: pais }))}
            {...register('pais')} error={errors.pais?.message} />
        </div>

        <p className="auth__nota">(*) Estos campos son obligatorios</p>

        <Boton type="submit" disabled={!isValid || isSubmitting}>Registrarse</Boton>
      </form>
      <p>¿Ya tenés una cuenta? <Link to="/login">Ingresá acá</Link></p>
    </>
  );
};

export default RegistroForm;