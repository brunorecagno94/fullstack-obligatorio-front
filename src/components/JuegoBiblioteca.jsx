const JuegoBiblioteca = ({ nombreJuego, descripcionJuego }) => {
  return (
    <div className="juego-biblioteca">
      <h3 className="juego-biblioteca__nombre">{nombreJuego}</h3>
      <p className="juego-biblioteca__descripcion">{descripcionJuego}</p>
    </div>
  )
}

export default JuegoBiblioteca
