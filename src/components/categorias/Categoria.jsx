import Boton from '../common/Boton'

const Categoria = ({ _id, nombreCategoria, editar, eliminar }) => {
  return (
    <div className="categoria">
      <span className="categoria__nombre">{nombreCategoria}</span>
      <div className="categoria__acciones">
        <Boton variante="secundario" onClick={() => editar({ _id, nombreCategoria })}>Editar</Boton>
        <Boton variante="peligro" onClick={() => eliminar(_id, nombreCategoria)}>Eliminar</Boton>
      </div>
    </div>
  )
}

export default Categoria