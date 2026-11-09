import { useState } from 'react';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../api/api';
import { cambiarPlan } from '../../features/usuario.slice';
import EncabezadoPerfil from '../../components/usuario/EncabezadoPerfil';
import InformeCuenta from '../../components/usuario/InformeCuenta';
import CambioPlan from '../../components/usuario/CambioPlan';
import ModalConfirmacion from '../../components/common/ModalConfirmacion';

const PaginaUsuario = () => {
  const usuario = useSelector(state => state.usuario.usuario);
  const dispatch = useDispatch();
  const [confirmandoPlan, setConfirmandoPlan] = useState(false);

  const cantidadJuegos = usuario.juegosComprados.length;

  const pasarAPremium = async () => {
    try {
      const res = await api.patch('/usuarios/upgrade');
      dispatch(cambiarPlan('premium'));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'No se pudo cambiar el plan');
    }
    setConfirmandoPlan(false);
  };

  return (
    <div className="pagina-perfil">
      <EncabezadoPerfil nombreUsuario={usuario.nombreUsuario} plan={usuario.planUsuario} />

      <div className="pagina-perfil__fila">
        <InformeCuenta plan={usuario.planUsuario} cantidad={cantidadJuegos} />

        <section className="panel-perfil acceso-biblioteca">
          <h3>Mi biblioteca</h3>
          <p>
            Tenés <strong>{cantidadJuegos}</strong> {cantidadJuegos === 1 ? 'juego' : 'juegos'} en tu biblioteca.
          </p>
          <Link to="/biblioteca" className="btn btn-secundario">Ver biblioteca</Link>
        </section>
      </div>

      {usuario.planUsuario === 'plus' && (
        <CambioPlan pasarAPremium={() => setConfirmandoPlan(true)} />
      )}

      {confirmandoPlan && (
        <ModalConfirmacion
          titulo="Pasar a Premium"
          mensaje="Vas a cambiar tu plan a Premium y vas a poder comprar juegos sin límite. Este cambio no se puede deshacer."
          textoConfirmar="Confirmar cambio"
          varianteConfirmar="principal"
          confirmar={pasarAPremium}
          cancelar={() => setConfirmandoPlan(false)}
        />
      )}
    </div>
  );
};

export default PaginaUsuario;
