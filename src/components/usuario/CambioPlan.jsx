import Boton from '../common/Boton'

const CambioPlan = ({ pasarAPremium }) => {
  return (
    <section className="panel-perfil cambio-plan">
      <h3>¡Pasate a Premium!</h3>
      <p className="cambio-plan__bajada">Comprá todos los juegos que quieras, sin límite.</p>

      <div className="cambio-plan__comparacion">
        <div className="plan">
          <span className="plan__nombre">Plus</span>
          <span className="plan__actual">Tu plan actual</span>
          <ul className="plan__beneficios">
            <li>Hasta 4 juegos en tu biblioteca</li>
            <li>Acceso a toda la tienda</li>
          </ul>
        </div>

        <div className="plan plan--premium">
          <span className="plan__nombre">★ Premium</span>
          <ul className="plan__beneficios">
            <li>Juegos ilimitados</li>
            <li>Acceso a toda la tienda</li>
            <li>El cambio es inmediato</li>
          </ul>
          <Boton onClick={pasarAPremium}>Cambiar a Premium</Boton>
        </div>
      </div>
    </section>
  )
}

export default CambioPlan
