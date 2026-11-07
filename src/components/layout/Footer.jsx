import logo from '../../assets/logo-estim.png'

const Footer = () => {
  return (
    <footer className="footer">
      <img className="footer__logo" src={logo} alt="Estim" />
      <div className="footer__texto">
        <p>© 2026 Estim. Todos los derechos reservados.</p>
        <p>Obligatorio de Desarrollo Full Stack · Universidad ORT Uruguay</p>
      </div>
    </footer>
  )
}

export default Footer
