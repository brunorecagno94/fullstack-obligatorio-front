import JuegoBiblioteca from './JuegoBiblioteca';

const ListaBiblioteca = ({ juegos, quitar }) => {
  return (
    <div className="lista-juegos">
      {juegos.map(juego => (
        <JuegoBiblioteca key={juego._id} {...juego} quitar={quitar} />
      ))}
    </div>
  );
};

export default ListaBiblioteca;
