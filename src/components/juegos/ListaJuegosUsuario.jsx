import Juego from "./Juego"

const ListaJuegos = ({ juegos }) => {
  return (
    <div className="lista-juegos">
      {juegos.map(juego => (
        <Juego key={juego._id} {...juego} />
      ))}
    </div>
  )
}

export default ListaJuegos
