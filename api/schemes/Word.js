const { SPEECH_TYPES } = require('../helpers/constants.js');

const initWord = {
  word: { type: String, required: true, trim: true, minlength: 1, maxlength: 100 },
  translate: { type: String, required: true, trim: true, minlength: 1, maxlength: 200 },
  wordType: { type: String, required: true, enum: SPEECH_TYPES },
};

const studyWord = {
  word: { type: String, required: true, trim: true, minlength: 1, maxlength: 100 },
  translate: { type: String, required: true, trim: true, minlength: 1, maxlength: 200 },
  wordType: { type: String, required: true, enum: SPEECH_TYPES },
  studyInterval: { type: Number, required: true, default: 1, min: 0, max: 365 },
  coefficient: { type: Number, required: true, default: 2.5, min: 1.3, max: 90 },
  nextShowDate: { type: Date, required: true },
};

module.exports = {
  initWord,
  studyWord,
};
