import createHttpError from 'http-errors';
export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsinc(req.body, {
      abortEarle: false,
    });
  } catch (err) {
    const error = createHttpError(404, 'Bad Request', {
      errors: err.details,
    });
    next(error);
  }
};
