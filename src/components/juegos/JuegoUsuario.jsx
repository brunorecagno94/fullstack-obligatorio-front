import Boton from '../common/Boton'
import InfoJuego from './InfoJuego'

const JuegoUsuario = ({ _id, nombreJuego, descripcionJuego, precioJuego, monedaJuego, categorias, imagenJuego, comprado, limiteAlcanzado, comprar }) => {
  return (
    <div className="juego">
      <InfoJuego
        nombreJuego={nombreJuego}
        descripcionJuego={descripcionJuego}
        categorias={categorias}
        imagenJuego={imagenJuego}
      />
      <div className="juego__acciones">
        {comprado
          ? <span className="juego__comprado">En tu biblioteca</span>
          : <Boton onClick={() => comprar(_id)} disabled={limiteAlcanzado}>
              <span className="juego__comprar">
                <span>{limiteAlcanzado ? 'Límite alcanzado' : 'Comprar'}</span>
                <span className="juego__comprar-precio">{monedaJuego} {precioJuego}</span>
              </span>
            </Boton>}
      </div>
    </div>
  )
}

export default JuegoUsuario
