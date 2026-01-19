const Router = require('express')
const WordController = require('./controllers/WordController')
const DeckController = require('./controllers/DeckController')

const router = new Router()

const objectId = '([0-9a-fA-F]{24})';

/**
 * INIT DECK
 * /deck/init
 * /deck/init/:id
 */
router
  .route(`/decks/init`)
  .get(DeckController.getInitDecks)
  .post(DeckController.addInitDeck)

router.route(`/decks/init/all`).post(DeckController.addInitDeckList)

router
  .route(`/decks/init/:id${objectId}`)
  .put(DeckController.updateInitDeck)

/**
 * INIT WORD
 * /words/init
 * /words/init/:id
 */
router
  .route(`/words/init`)
  .get(WordController.getInitList)
  .post(WordController.addNewWord)
  .delete(WordController.deleteAllInitWords)

router
  .route(`/words/init/:id${objectId}`)
  .get(WordController.getInitWord)
  .put(WordController.updateInitWord)
  .delete(WordController.deleteInitWord)

/**
 * STUDY WORD
 * /words/study
 * /words/study/deck
 * /words/study/:id
 */
router
  .route('/words/study')
  .get(WordController.getStudyList)
  .post(WordController.addStudyWord) // single adding
  .delete(WordController.deleteAllStudyWords)

router.post('/words/study/deck', WordController.addStudyDeck); // multiple adding

router
  .route(`/words/study/:id${objectId}`)
  .get(WordController.getStudyWord)
  .put(WordController.updateStudyWord)
  .delete(WordController.deleteStudyWord)

module.exports = {
  router,
}
