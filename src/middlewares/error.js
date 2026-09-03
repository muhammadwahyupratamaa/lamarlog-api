export function notFound(req, res) {
  res.status(404).json({ error: { message: 'Route not found' } });
}

export function errorHandler(error, req, res, next) { // eslint-disable-line no-unused-vars
  if (error.name === 'ZodError') return res.status(400).json({ error: { message: 'Validation failed', details: error.issues } });
  if (error.name === 'SequelizeUniqueConstraintError') return res.status(409).json({ error: { message: 'Resource already exists' } });
  console.error(error);
  res.status(error.status || 500).json({ error: { message: error.message || 'Internal server error' } });
}
