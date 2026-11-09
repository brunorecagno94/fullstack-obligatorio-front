import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../api/api';
import { subirImagen } from '../../api/subirImagen';
import FormularioJuego from '../../components/juegos/FormularioJuego';

const valoresIniciales = {
  nombreJuego: '',
  descripcionJuego: '',
  precioJuego: '',
  monedaJuego: 'UYU',
  edadMinima: '',
  categorias: []
};

const PaginaCrearJuego = () => {
  const navigate = useNavigate();
  const categorias = useSelector(state => state.categoria.lista);

  const guardar = async (datos) => {
    try {
      const { imagenJuego, ...juego } = datos;
      if (imagenJuego?.[0]) {
        juego.imagenJuego = await subirImagen(imagenJuego[0]);
      }
      const res = await api.post('/juegos', juego);;
      toast.success(res.data.message);
      navigate('/juegos');
    } catch (error) {
      toast.error(error.response?.data?.message || 'No se pudo crear el juego');
    }
  };

  return (
    <div className="pagina-nuevo-juego">
      <h2>Agregar juego</h2>
      <FormularioJuego
        valoresIniciales={valoresIniciales}
        categorias={categorias}
        guardar={guardar}
        textoBoton="Crear juego"
      />
    </div>
  );
};

export default PaginaCrearJuego;