import RegistroForm from '../../components/auth/RegistroForm';
import logo from '../../assets/logo-estim.png';

const PaginaRegistro = () => {
  return (
    <div className="auth pagina-registro">
      <div className="auth__tarjeta auth__tarjeta--ancha">
        <header className="auth__encabezado">
          <img className="auth__logo" src={logo} alt="Estim" />
          <h2>Crear cuenta</h2>
        </header>
        <RegistroForm />
      </div>
    </div>
  );
};

export default PaginaRegistro;
