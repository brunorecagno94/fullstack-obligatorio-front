import LoginForm from '../../components/auth/LoginForm'
import logo from '../../assets/logo-estim.png'

const PaginaLogin = () => {
  return (
    <div className="auth pagina-login">
      <div className="auth__tarjeta">
        <header className="auth__encabezado">
          <img className="auth__logo" src={logo} alt="Estim" />
          <h2>Iniciar sesión</h2>
        </header>
        <LoginForm />
      </div>
    </div>
  )
}

export default PaginaLogin
