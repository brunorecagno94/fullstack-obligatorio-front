import Tag from '../common/Tag'

const InfoJuego = ({ nombreJuego, precioJuego, monedaJuego, categorias }) => {
  const categoriasValidas = categorias.filter(categoria => categoria !== null);

  return (
    <>
      <h3 className="juego__nombre">{nombreJuego}</h3>
      <p className="juego__precio">{monedaJuego} {precioJuego}</p>
      <div className="juego__tags">
        {categoriasValidas.map(categoria => (
          <Tag key={categoria._id} texto={categoria.nombreCategoria} />
        ))}
      </div>
    </>
  )
}

export default InfoJuego