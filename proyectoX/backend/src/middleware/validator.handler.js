export const validatorHandler = (schema, property = 'body') => {
    return (req, res, next) => {
      const data = req[property];
      const { error } = schema.validate(data, { abortEarly: false });
      if (error) {
        return res.status(400).json({
          message: "Error de validación",
          details: error.details.map((err) => err.message),
        });
      }
      next();
    };
  };
  