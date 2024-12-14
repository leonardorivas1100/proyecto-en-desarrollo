import Joi from 'joi';

// Esquema de validación para la creación de un rol
export const createRolSchema = Joi.object({
  nombre: Joi.string().required().messages({
    'string.base': 'El nombre del rol debe ser una cadena de texto.',
    'string.empty': 'El nombre del rol no puede estar vacío.',
    'any.required': 'El nombre del rol es un campo obligatorio.'
  }),
});

// Esquema de validación para la actualización de un rol en la base de datos
export const updateRolSchema = Joi.object({
  nombre: Joi.string().optional().messages({
    'string.base': 'El nombre del rol debe ser una cadena de texto.',
    'string.empty': 'El nombre del rol no puede estar vacío.',
  }),
});

// Esquema de validación para obtener un rol especiificado por su nombre
export const getRolSchema = Joi.object({
  nombre: Joi.string().required().messages({
    'string.base': 'El nombre del rol debe ser una cadena de texto.',
    'any.required': 'El nombre del rol es obligatorio.'
  }),
});

// Esquema de validación para eliminar un rol 
export const deleteRolSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'El ID del rol debe ser una cadena de texto.',
    'any.required': 'El Id del rol es un campo obligatorio.'
  }),
});
