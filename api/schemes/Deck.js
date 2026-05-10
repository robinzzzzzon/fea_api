const { SPEECH_TYPES } = require('../helpers/constants.js');

const initDeck = {
  dataName: { type: String, required: true, enum: SPEECH_TYPES, index: true },
  tone: { type: Number, required: true, min: 1, max: 6 },
};

module.exports = {
  initDeck,
};
