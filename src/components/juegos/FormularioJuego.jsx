import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { crearJuegoSchema } from '../../validators/juegos.validators'
import Input from '../common/Input'
import Select from '../common/Select'
import Boton from '../common/Boton'

const opcionesMoneda = [
  { valor: 'UYU', texto: 'Pesos uruguayos (UYU)' },
  { valor: 'USD', texto: 'Dólares (USD)' },
  { valor: 'EUR', texto: 'Euros (EUR)' }
]

const FormularioJuego = ({ valoresIniciales, categorias, guardar, textoBoton, imagenActual, generarDescripcion }) => {
  const [generando, setGenerando] = useState(false)
  const { register, handleSubmit, setValue, formState: { errors, isValid, isSubmitting } } =
    useForm({ resolver: joiResolver(crearJuegoSchema), mode: 'onChange', defaultValues: valoresIniciales })

  const completarConIA = async () => {
    setGenerando(true)
    const texto = await generarDescripcion()
    if (texto) {
      setValue('descripcionJuego', texto.slice(0, 200), { shouldValidate: true, shouldDirty: true })
    }
    setGenerando(false)
  }

  return (
    <form className="formulario-juego" onSubmit={handleSubmit(guardar)}>
      <Input
        label="Nombre:"
        id="juegoNombre"
        type="text"
        {...register('nombreJuego')}
        error={errors.nombreJuego?.message}
      />

      <div className="form__group">
        <label htmlFor="juegoDescripcion">Descripción:</label>
        <textarea id="juegoDescripcion" rows="4" {...register('descripcionJuego')} />
        {errors.descripcionJuego && <span className="mensaje-error">{errors.descripcionJuego.message}</span>}

        {generarDescripcion && (
          <Boton variante="secundario" onClick={completarConIA} disabled={generando}>
            {generando ? 'Generando...' : 'Generar descripción con IA'}
          </Boton>
        )}
      </div>

      <Input
        label="Precio:"
        id="juegoPrecio"
        type="number"
        step="any"
        {...register('precioJuego')}
        error={errors.precioJuego?.message}
      />

      <Select
        label="Moneda:"
        id="juegoMoneda"
        placeholder="Elegí una moneda"
        opciones={opcionesMoneda}
        {...register('monedaJuego')}
        error={errors.monedaJuego?.message}
      />

      <Input
        label="Edad mínima:"
        id="juegoEdad"
        type="number"
        {...register('edadMinima')}
        error={errors.edadMinima?.message}
      />

      <fieldset className="form__group">
        <legend>Categorías:</legend>
        {categorias.map(categoria => (
          <label key={categoria._id} className="formulario-juego__categoria">
            <input type="checkbox" value={categoria._id} {...register('categorias')} />
            {categoria.nombreCategoria}
          </label>
        ))}
        {errors.categorias && <span className="mensaje-error">{errors.categorias.message}</span>}
      </fieldset>

      {imagenActual && (
        <img className="formulario-juego__imagen" src={imagenActual} alt="Imagen actual del juego" />
      )}
      <Input
        label={imagenActual ? 'Cambiar imagen:' : 'Imagen:'}
        id="juegoImagen"
        type="file"
        accept="image/*"
        {...register('imagenJuego')}
      />

      <Boton type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? 'Guardando...' : textoBoton}
      </Boton>
    </form>
  )
}

export default FormularioJuego