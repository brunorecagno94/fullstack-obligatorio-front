import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../api/api';
import { subirImagen } from '../../api/subirImagen';
import FormularioJuego from '../../components/juegos/FormularioJuego';
import Loader from '../../components/common/Loader';

const PaginaEditarJuego = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [juego, setJuego] = useState(null);
  const categorias = useSelector(state => state.categoria.lista);

  useEffect(() => {
    api.get(`/juegos/${id}`)
      .then(r => setJuego(r.data))
      .catch(error => {
        toast.error(error.response?.data?.message || 'No se pudo cargar el juego');
        navigate('/juegos');
      });
  }, [id, navigate]);

  const guardar = async (datos) => {
    try {
      const { imagenJuego, ...cambios } = datos;
      if (imagenJuego?.[0]) {
        cambios.imagenJuego = await subirImagen(imagenJuego[0]);
      }
      const res = await api.patch(`/juegos/${id}`, cambios);
      toast.success(res.data.message);
      navigate('/juegos');
    } catch (error) {
      toast.error(error.response?.data?.message || 'No se pudo guardar el juego');
    }
  };

  const generarDescripcion = async () => {
    try {
      const res = await api.get(`/juegos/${id}/descripcion-ia`);
      if (!res.data.generadoPorIA) {
        toast.warning('La IA no está disponible en este momento');
        return null;
      }
      return res.data.descripcion;
    } catch (error) {
      toast.error(error.response?.data?.message || 'No se pudo generar la descripción');
      return null;
    }
  };

  if (!juego) return <Loader />;

  const valoresIniciales = {
    nombreJuego: juego.nombreJuego,
    descripcionJuego: juego.descripcionJuego,
    precioJuego: juego.precioJuego,
    monedaJuego: juego.monedaJuego,
    edadMinima: juego.edadMinima,
    categorias: juego.categorias.filter(categoria => categoria !== null).map(categoria => categoria._id)
  };

  return (
    <div className="pagina-editar-juego">
      <h2>Editar juego</h2>
      <FormularioJuego
        valoresIniciales={valoresIniciales}
        categorias={categorias}
        guardar={guardar}
        textoBoton="Guardar cambios"
        imagenActual={juego.imagenJuego}
        generarDescripcion={generarDescripcion}
      />
    </div>
  );
};

export default PaginaEditarJuego;