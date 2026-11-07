import Categoria from './Categoria'

const ListaCategorias = ({ categorias, editar, eliminar }) => {
  return (
    <div className="lista-categorias">
      {categorias.map(categoria => (
        <Categoria
          key={categoria._id}
          {...categoria}
          editar={editar}
          eliminar={eliminar}
        />
      ))}
    </div>
  )
}

export default ListaCategorias