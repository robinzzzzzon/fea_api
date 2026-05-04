const mongoose = require('mongoose');
const DeckScheme = require('../schemes/Deck.js');
const respond = require('../helpers/respond.js');
const { sanitizeQuery } = require('../helpers/sanitizeQuery.js');

const InitDeckSchema = new mongoose.Schema(DeckScheme.initDeck);
const InitDeckListModel = mongoose.model('InitDeck', InitDeckSchema);

module.exports = {
  // ------- INIT DECKS ---------
  async addInitDeck(req, res) {
    try {
      const addedDeck = await InitDeckListModel.create(req.body);
      return respond.created(res, addedDeck);
    } catch (error) {
      return respond.handleError(res, error);
    }
  },

  async addInitDeckList(req, res) {
    try {
      const { deckList } = req.body;

      const modifiedDeckList = deckList.map(el => {
        return { dataName: el.dataName, tone: el.tone };
      });

      const initDecks = await InitDeckListModel.insertMany(modifiedDeckList);

      return respond.created(res, { added: initDecks.length });
    } catch (error) {
      return respond.handleError(res, error);
    }
  },

  async getInitDecks(req, res) {
    try {
      const filter = sanitizeQuery(req.query, ['dataName']);
      const getDecks = await InitDeckListModel.find(filter);

      return respond.ok(res, getDecks);
    } catch (error) {
      return respond.handleError(res, error);
    }
  },

  async updateInitDeck(req, res) {
    try {
      const updatedDeck = await InitDeckListModel.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedDeck) return respond.notFound(res, 'Deck not found');

      return respond.ok(res, updatedDeck);
    } catch (error) {
      return respond.handleError(res, error);
    }
  },
};
