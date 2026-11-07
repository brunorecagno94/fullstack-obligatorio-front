import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { categoriaSchema } from '../../validators/categorias.validators'
import Input from '../common/Input'
import Boton from '../common/Boton'

const ModalCategoria = ({ categoria, guardar, cerrar }) => {
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } =
    useForm({
      resolver: joiResolver(categoriaSchema),
      mode: 'onChange',
      defaultValues: { nombreCategoria: categoria ? categoria.nombreCategoria : '' }
    })

  return (
    <div className="modal">
      <div className="modal__contenido">
        <h3>{categoria ? 'Editar categoría' : 'Nueva categoría'}</h3>
        <form onSubmit={handleSubmit(guardar)}>
          <Input
            label="Nombre:"
            id="categoriaNombre"
            type="text"
            {...register('nombreCategoria')}
            error={errors.nombreCategoria?.message}
          />
          <div className="modal__acciones">
            <Boton type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </Boton>
            <Boton variante="secundario" onClick={cerrar}>Cancelar</Boton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalCategoria