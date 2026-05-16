const { SPEECH_TYPES } = require('../helpers/constants.js');

const initWord = {
  word: { type: String, required: true, trim: true, minlength: 1, maxlength: 100, index: true },
  translate: { type: String, required: true, trim: true, minlength: 1, maxlength: 200 },
  wordType: { type: String, required: true, enum: SPEECH_TYPES, index: true },
  wordCategory: { type: Number, enum: [1, 2, 3], default: 2, index: true },
};

const studyWord = {
  word: { type: String, required: true, trim: true, minlength: 1, maxlength: 100, index: true },
  translate: { type: String, required: true, trim: true, minlength: 1, maxlength: 200 },
  wordType: { type: String, required: true, enum: SPEECH_TYPES, index: true },
  wordCategory: { type: Number, enum: [1, 2, 3], default: 2, index: true },
  studyInterval: { type: Number, required: true, default: 1, min: 0, max: 365 },
  coefficient: { type: Number, required: true, default: 2.5, min: 1.3, max: 90 },
  nextShowDate: { type: Date, required: true, index: true },
};

module.exports = {
  initWord,
  studyWord,
};
