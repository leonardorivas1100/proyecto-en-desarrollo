import Joi from 'joi';

// Esquema de validación para la creación de un rol
export const createRolSchema = Joi.object({
  nombre: Joi.string().required().messages({
    'string.base': 'El nombre del rol debe ser una cadena de texto.',
    'any.required': 'El nombre del rol es un campo obligatorio.'
  }),
});

// Esquema de validación para la actualización de un rol
export const updateRolSchema = Joi.object({
  nombre: Joi.string().optional().messages({
    'string.base': 'El nombre del rol debe ser una cadena de texto.',
  }),
});

// Esquema de validación para obtener un rol especiificado por su Id
export const getRolSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'El ID del rol debe ser una cadena de texto.',
    'any.required': 'El ID del rol es obligatorio.'
  }),
});

// Esquema de validación para eliminar un rol por su número de identificación
export const deleteRolSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'El ID del rol debe ser una cadena de texto.',
    'any.required': 'El ID del rol es obligatori.'
  }),
});
