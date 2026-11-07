import Boton from '../common/Boton'
import InfoJuego from '../juegos/InfoJuego'

const JuegoBiblioteca = ({ _id, nombreJuego, descripcionJuego, categorias, imagenJuego, quitar }) => {
  return (
    <div className="juego">
      <InfoJuego
        nombreJuego={nombreJuego}
        descripcionJuego={descripcionJuego}
        categorias={categorias}
        imagenJuego={imagenJuego}
      />
      <div className="juego__acciones">
        <Boton variante="peligro" onClick={() => quitar(_id, nombreJuego)}>
          Quitar de la biblioteca
        </Boton>
      </div>
    </div>
  )
}

export default JuegoBiblioteca
