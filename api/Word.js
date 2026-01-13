const initWord = {
  word: { type: String, required: true },
  translate: { type: String, required: true },
  wordType: { type: String, required: true },
}

const studyWord = {
  word: { type: String, required: true },
  translate: { type: String, required: true },
  wordType: { type: String, required: true },
  studyInterval: { type: Number, required: true, default: 1 },
  coefficient: { type: Number, required: true, default: 2.5 },
  nextShowDate: { type: Date, required: true },
}

module.exports = {
  initWord,
  studyWord,
}
