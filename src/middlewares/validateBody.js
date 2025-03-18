import createHttpError from 'http-errors';
export const validateBody = (schema) => async (req, res, next) => {
  try {
    console.log(req.body);

    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    console.log('!before catch');
    next();
  } catch (err) {
    const error = createHttpError(404, 'Bad Request', {
      errors: err.details,
    });
    console.log('!err', error);
    next(error);
  }
};
