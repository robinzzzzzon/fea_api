const mongoose = require('mongoose')
const DeckScheme = require('../schemes/Deck.js')

const InitDeckSchema = new mongoose.Schema(DeckScheme.initDeck)
const InitDeckListModel = mongoose.model('InitDeck', InitDeckSchema)

module.exports = {
  // ------- INIT DECKS ---------
  async addInitDeck(req, res) {
    try {
      const addedDeck = await InitDeckListModel.create(req.body)
      res.json(addedDeck)
    } catch (e) {
      res.status(500).json(e.message)
    }
  },

  async addInitDeckList(req, res) {
    try {
      const { deckList } = req.body;

      const modifiedDeckList = deckList.map(el => { 
        return { dataName: el.dataName, color: el.color }
       })

      const initDecks = await InitDeckListModel.insertMany(modifiedDeckList, { ordered: false });
    
      return res.status(201).json({ added: initDecks.length });
    } catch (e) {
      res.status(500).json(e.message)
    }
  },

  async getInitDecks(req, res) {
    let getDecks = null
    try {
      if (!req.query) {
        getDecks = await InitDeckListModel.find()
      } else {
        getDecks = await InitDeckListModel.find(req.query)
      }

      return res.json(getDecks)
    } catch (e) {
      res.status(500).json(e.message)
    }
  },

  async updateInitDeck(req, res) {
    try {
      const updatedDeck = await InitDeckListModel.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
      })
      return res.json(updatedDeck)
    } catch (e) {
      res.status(500).json(e.message)
    }
  },
}
