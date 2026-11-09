import { Link } from 'react-router';
import Boton from '../common/Boton';
import InfoJuego from './InfoJuego';

const JuegoAdmin = ({ _id, nombreJuego, descripcionJuego, categorias, imagenJuego, eliminar }) => {
  return (
    <div className="juego">
      <InfoJuego
        nombreJuego={nombreJuego}
        descripcionJuego={descripcionJuego}
        categorias={categorias}
        imagenJuego={imagenJuego}
      />
      <div className="juego__acciones">
        <Link to={`/juegos/${_id}`} className="btn btn-secundario">Editar</Link>
        <Boton variante="peligro" onClick={() => eliminar(_id, nombreJuego)}>Eliminar</Boton>
      </div>
    </div>
  );
};

export default JuegoAdmin;
