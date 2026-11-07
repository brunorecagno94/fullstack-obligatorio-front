import JuegoAdmin from './JuegoAdmin'

const ListaJuegosAdmin = ({ juegos, eliminar }) => {
  return (
    <div className="lista-juegos">
      {juegos.map(juego => (
        <JuegoAdmin key={juego._id} {...juego} eliminar={eliminar} />
      ))}
    </div>
  )
}

export default ListaJuegosAdmin