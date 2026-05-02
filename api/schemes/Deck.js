const initDeck = {
  dataName: { type: String, required: true },
  tone: { type: Number, required: true, min: 1, max: 6 },
};

module.exports = {
  initDeck,
};
