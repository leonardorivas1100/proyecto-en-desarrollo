import Joi from 'joi';

// Esquema de validación para la creación de un usuario
export const createUserSchema = Joi.object({
  numeroIdentificacion: Joi.string().required().messages({
    'string.base': 'El numero de identificacion del usuario debe ser una cadena de texto.',
    'string.empty': 'El numero de identificacion del usuario no puede estar vacío.',
    'any.required': 'El numero de identificacion del usuario es un campo obligatorio.'
  }),
  nombres: Joi.string().required().messages({
    'string.base': 'Los nombres del usuario deben ser una cadena de texto.',
    'string.empty': 'Los nombres del usuario no pueden estar vacíos.',
    'any.required': 'Los nombres del usuario es un campo obligatorio.'
  }),
  apellidos: Joi.string().required().messages({
    'string.base': 'Los apellidos del usuario deben ser una cadena de texto.',
    'string.empty': 'Los apellidos del usuario no pueden estar vacíos.',
    'any.required': 'Los apellidos del usuario es un campo obligatorio.'
  }),
  telefono: Joi.string().required().messages({
    'string.base': 'El numero telefonico del usuario debe ser una cadena de texto.',
    'string.empty': 'El numero telefonico del usuario no puede estar vacío.',
    'any.required': 'El numero telefonico del usuario es un campo obligatorio.'
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'El correo electrónico del usuario debe ser una cadena de texto.',
    'string.empty': 'El correo electrónico del usuario no puede estar vacío.',
    'string.email': 'El correo electrónico debe ser válido.',
    'any.required': 'El correo electrónico del usuario es un campo obligatorio.'
  }),
  password: Joi.string()
  .min(8)
  .max(30)
  .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{8,30}$')) // Ajusta el patrón según tus requisitos
  .required().messages({
    'string.base': 'La contraseña del usuario debe ser una cadena de texto.',
    'string.empty': 'La contraseña del usuario no puede estar vacía.',
    'string.min': 'La contraseña debe tener al menos 8 caracteres.',
    'string.max': 'La contraseña no puede tener más de 30 caracteres.',
    'string.pattern.base': 'La contraseña debe contener al menos una letra, un número y un símbolo.',
    'any.required': 'La contraseña del usuario es un campo obligatorio.'
}),
  nombre_rol: Joi.string().required().messages({
    'string.base': 'El nombre del rol del usuario debe ser una cadena de texto.',
    'string.empty': 'El nombre del rol del usuario no puede estar vacío.',
    'any.required': 'El nombre del rol del usuario es un campo obligatorio.'
  }),
});



// Esquema de validación para la actualizacion de un usuario
export const updateUserSchema = Joi.object({
  numeroIdentificacion: Joi.string().optional().messages({
    'string.base': 'El numero de identificacion del usuario debe ser una cadena de texto.',
    'string.empty': 'El numero de identificacion del usuario no puede estar vacío.',
    'any.required': 'El numero de identificacion del usuario es un campo obligatorio.'
  }),
  nombres: Joi.string().optional().messages({
    'string.base': 'Los nombres del usuario deben ser una cadena de texto.',
    'string.empty': 'Los nombres del usuario no pueden estar vacíos.',
    'any.required': 'Los nombres del usuario es un campo obligatorio.'
  }),
  apellidos: Joi.string().optional().messages({
    'string.base': 'Los apellidos del usuario deben ser una cadena de texto.',
    'string.empty': 'Los apellidos del usuario no pueden estar vacíos.',
    'any.required': 'Los apellidos del usuario es un campo obligatorio.'
  }),
  telefono: Joi.string().optional().messages({
    'string.base': 'El numero telefonico del usuario debe ser una cadena de texto.',
    'string.empty': 'El numero telefonico del usuario no puede estar vacío.',
    'any.required': 'El numero telefonico del usuario es un campo obligatorio.'
  }),
  email: Joi.string().email().optional().messages({
    'string.base': 'El correo electrónico del usuario debe ser una cadena de texto.',
    'string.empty': 'El correo electrónico del usuario no puede estar vacío.',
    'string.email': 'El correo electrónico debe ser válido.',
    'any.required': 'El correo electrónico del usuario es un campo obligatorio.'
  }),
  password: Joi.string()
  .min(8)
  .max(30)
  .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{8,30}$')) // Ajusta el patrón según tus requisitos
  .optional().messages({
    'string.base': 'La contraseña del usuario debe ser una cadena de texto.',
    'string.empty': 'La contraseña del usuario no puede estar vacía.',
    'string.min': 'La contraseña debe tener al menos 8 caracteres.',
    'string.max': 'La contraseña no puede tener más de 30 caracteres.',
    'string.pattern.base': 'La contraseña debe contener al menos una letra, un número y un símbolo.',
    'any.required': 'La contraseña del usuario es un campo obligatorio.'
}),
  nombre_rol: Joi.string().optional().messages({
    'string.base': 'El nombre del rol del usuario debe ser una cadena de texto.',
    'string.empty': 'El nombre del rol del usuario no puede estar vacío.',
    'any.required': 'El nombre del rol del usuario es un campo obligatorio.'
  }),
});

// Esquema de validación para obtener un rol especiificado por su nombre
export const getUserSchema = Joi.object({
  numeroIdentificacion: Joi.string().optional().messages({
    'string.base': 'El numero de indentificacion del usuario que se desea buscar debe ser una cadena de texto.',
  }),
});

// Esquema de validación para eliminar un rol 
export const deleteRolSchema = Joi.object({
  nombre: Joi.string().required().messages({
    'string.base': 'El nombre del rol debe ser una cadena de texto.',
    'any.required': 'El nombre del rol es un campo obligatorio.'
  }),
});
