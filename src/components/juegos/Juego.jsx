import Tag from "../common/Tag"
import Boton from "../common/Boton"

const Juego = ({ _id, nombreJuego, precioJuego, monedaJuego, categorias, comprado, limiteAlcanzado, comprar }) => {
  const categoriasValidas = categorias.filter(categoria => categoria !== null);

  return (
    <div className="juego">
      <h3 className="juego__nombre">{nombreJuego}</h3>
      <p className="juego__precio">{monedaJuego} {precioJuego}</p>
      <div className="juego__tags">
        {categoriasValidas.map(categoria => (
          <Tag key={categoria._id} texto={categoria.nombreCategoria} />
        ))}
      </div>
      {comprado
        ? <span className="juego__comprado">En tu biblioteca</span>
        : <Boton onClick={() => comprar(_id)} disabled={limiteAlcanzado}>
            {limiteAlcanzado ? 'Límite alcanzado' : 'Comprar'}
          </Boton>}
    </div>
  )
}

export default Juego
