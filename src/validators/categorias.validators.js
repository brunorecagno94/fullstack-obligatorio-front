import Joi from 'joi';

export const categoriaSchema = Joi.object({
  nombreCategoria: Joi.string().trim().max(30).required().messages({
    'any.required': 'El nombre de la categoría es obligatorio',
    'string.empty': 'El nombre de la categoría no puede estar vacío',
    'string.max': 'El nombre de la categoría no puede tener más de {#limit} caracteres'
  })
});