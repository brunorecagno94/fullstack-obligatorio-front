const EncabezadoPerfil = ({ nombreUsuario, plan }) => {
  const esPremium = plan === 'premium'

  return (
    <section className="perfil-encabezado">
      <div className="perfil-encabezado__avatar" aria-hidden="true">
        {nombreUsuario.charAt(0).toUpperCase()}
      </div>
      <div>
        <h2 className="perfil-encabezado__nombre">{nombreUsuario}</h2>
        <span className={esPremium ? 'insignia-plan insignia-plan--premium' : 'insignia-plan'}>
          {esPremium ? '★ Premium' : 'Plus'}
        </span>
      </div>
    </section>
  )
}

export default EncabezadoPerfil
