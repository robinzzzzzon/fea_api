function sanitizeQuery(query, allowedKeys) {
  const safe = {};

  for (const key of allowedKeys) {
    const value = query[key];

    if (typeof value === 'string' && value.length > 0) {
      safe[key] = value;
    }
  }

  return safe;
}

module.exports = { sanitizeQuery };
