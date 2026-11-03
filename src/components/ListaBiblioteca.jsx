import JuegoBiblioteca from "./JuegoBiblioteca"

const ListaBiblioteca = ({ juegos }) => {
  return (
    <div className="lista-biblioteca">
      {juegos.map(juego => (
        <JuegoBiblioteca key={juego._id} {...juego} />
      ))}
    </div>
  )
}

export default ListaBiblioteca
