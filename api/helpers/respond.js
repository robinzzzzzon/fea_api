function ok(res, body) {
  return res.status(200).json(body);
}

function created(res, body) {
  return res.status(201).json(body);
}

function notFound(res, message = 'Not found') {
  return res.status(404).json({ error: message });
}

function badRequest(res, message = 'Bad request') {
  return res.status(400).json({ error: message });
}

function serverError(res, error) {
  console.error(error);
  return res.status(500).json({ error: 'Internal server error' });
}

function handleError(res, error) {
  if (error.name === 'CastError') return badRequest(res, 'Invalid id');
  if (error.name === 'ValidationError') return badRequest(res, error.message);
  return serverError(res, error);
}

module.exports = { ok, created, notFound, badRequest, serverError, handleError };
