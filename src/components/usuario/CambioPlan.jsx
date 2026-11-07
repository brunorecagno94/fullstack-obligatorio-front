import Boton from '../common/Boton'

const CambioPlan = ({ pasarAPremium }) => {
  return (
    <div className="cambio-plan">
      <h3>¡Pasate a Premium!</h3>
      <p>Comprá todos los juegos que quieras, sin límite.</p>
      <Boton onClick={pasarAPremium}>Cambiar a Premium</Boton>
    </div>
  )
}

export default CambioPlan