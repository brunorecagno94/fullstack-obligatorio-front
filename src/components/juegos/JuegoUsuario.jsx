import Boton from '../common/Boton'
import InfoJuego from './InfoJuego'

const JuegoUsuario = ({ _id, nombreJuego, precioJuego, monedaJuego, categorias, comprado, limiteAlcanzado, comprar }) => {
  return (
    <div className="juego">
      <InfoJuego nombreJuego={nombreJuego} precioJuego={precioJuego} monedaJuego={monedaJuego} categorias={categorias} />
      {comprado
        ? <span className="juego__comprado">En tu biblioteca</span>
        : <Boton onClick={() => comprar(_id)} disabled={limiteAlcanzado}>
            {limiteAlcanzado ? 'Límite alcanzado' : 'Comprar'}
          </Boton>}
    </div>
  )
}

export default JuegoUsuario