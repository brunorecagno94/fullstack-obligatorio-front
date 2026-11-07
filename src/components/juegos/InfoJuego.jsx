import Tag from '../common/Tag'

const InfoJuego = ({ nombreJuego, descripcionJuego, categorias = [], imagenJuego }) => {
  const categoriasValidas = categorias.filter(categoria => categoria !== null);

  return (
    <>
      {imagenJuego
        ? <img className="juego__imagen" src={imagenJuego} alt={nombreJuego} />
        : <div className="juego__imagen juego__imagen--vacia">{nombreJuego}</div>}

      <div className="juego__tags">
        {categoriasValidas.map(categoria => (
          <Tag key={categoria._id} texto={categoria.nombreCategoria} />
        ))}
      </div>

      {/* Se muestra al pasar el mouse por la card (ver .juego:hover en App.css) */}
      <div className="juego__tooltip">
        <h3 className="juego__tooltip-nombre">{nombreJuego}</h3>
        <p className="juego__tooltip-descripcion">{descripcionJuego}</p>
      </div>
    </>
  )
}

export default InfoJuego
