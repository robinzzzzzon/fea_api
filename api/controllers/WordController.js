const mongoose = require('mongoose');
const WordScheme = require('../schemes/Word.js');
const srs = require('../helpers/srs.js');
const respond = require('../helpers/respond.js');

const InitSchema = new mongoose.Schema(WordScheme.initWord);
const StudySchema = new mongoose.Schema(WordScheme.studyWord);
const InitListModel = mongoose.model('AllWord', InitSchema);
const StudyListModel = mongoose.model('StudyWord', StudySchema);

module.exports = {
  // ------- INIT WORDS ---------
  async addNewWord(req, res) {
    try {
      const addedWord = await InitListModel.create(req.body);
      return respond.created(res, addedWord);
    } catch (error) {
      return respond.handleError(res, error);
    }
  },

  async getInitList(req, res) {
    try {
      const getWords = req.query
        ? await InitListModel.find(req.query)
        : await InitListModel.find();

      return respond.ok(res, getWords);
    } catch (error) {
      return respond.handleError(res, error);
    }
  },

  async getInitWord(req, res) {
    try {
      const getWord = await InitListModel.findById(req.params.id);

      if (!getWord) return respond.notFound(res, 'Word not found');

      return respond.ok(res, getWord);
    } catch (error) {
      return respond.handleError(res, error);
    }
  },

  async updateInitWord(req, res) {
    try {
      const updatedWord = await InitListModel.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
      });

      if (!updatedWord) return respond.notFound(res, 'Word not found');

      return respond.ok(res, updatedWord);
    } catch (error) {
      return respond.handleError(res, error);
    }
  },

  async deleteInitWord(req, res) {
    try {
      const deletedWord = await InitListModel.findByIdAndDelete(req.params.id);

      if (!deletedWord) return respond.notFound(res, 'Word not found');

      return respond.ok(res, deletedWord);
    } catch (error) {
      return respond.handleError(res, error);
    }
  },

  async deleteAllInitWords(req, res) {
    try {
      const result = await InitListModel.deleteMany({});

      return respond.ok(res, {
        deletedCount: result.deletedCount,
        acknowledged: result.acknowledged,
      });
    } catch (error) {
      return respond.handleError(res, error);
    }
  },

  // --------- STUDY WORDS ------------
  async addStudyWord(req, res) {
    try {
      req.body.nextShowDate = new Date();

      const addedWord = await StudyListModel.create(req.body);

      return respond.created(res, addedWord);
    } catch (error) {
      return respond.handleError(res, error);
    }
  },

  async addStudyDeck(req, res) {
    try {
      const { wordList } = req.body;

      const modifiedWordList = wordList.data.map(el => {
        return { word: el.word, translate: el.translate, wordType: el.wordType, nextShowDate: new Date() };
      });

      const studyWords = await StudyListModel.insertMany(modifiedWordList, { ordered: false });

      return respond.created(res, { added: studyWords.length });
    } catch (error) {
      return respond.handleError(res, error);
    }
  },

  async getStudyList(req, res) {
    try {
      const getWords = req.query
        ? await StudyListModel.find(req.query)
        : await StudyListModel.find();

      return respond.ok(res, getWords);
    } catch (error) {
      return respond.handleError(res, error);
    }
  },

  async getStudyWord(req, res) {
    try {
      const getWord = await StudyListModel.findById(req.params.id);

      if (!getWord) return respond.notFound(res, 'Study word not found');

      return respond.ok(res, getWord);
    } catch (error) {
      return respond.handleError(res, error);
    }
  },

  async updateStudyWord(req, res) {
    try {
      const modifiedWord = srs.calculateStudyProgress({ studyWord: req.body, resolution: req.body.resolution });

      const updatedWord = await StudyListModel.findByIdAndUpdate(modifiedWord._id, modifiedWord, { new: true });

      if (!updatedWord) return respond.notFound(res, 'Study word not found');

      return respond.ok(res, updatedWord);
    } catch (error) {
      return respond.handleError(res, error);
    }
  },

  async deleteStudyWord(req, res) {
    try {
      const deletedWord = await StudyListModel.findByIdAndDelete(req.params.id);

      if (!deletedWord) return respond.notFound(res, 'Study word not found');

      return respond.ok(res, deletedWord);
    } catch (error) {
      return respond.handleError(res, error);
    }
  },

  async deleteAllStudyWords(req, res) {
    try {
      const result = await StudyListModel.deleteMany({});

      return respond.ok(res, {
        deletedCount: result.deletedCount,
        acknowledged: result.acknowledged,
      });
    } catch (error) {
      return respond.handleError(res, error);
    }
  },
};
