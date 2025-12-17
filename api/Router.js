const Router = require('express')
const WordController = require('./WordController')

const router = new Router()

const objectId = '([0-9a-fA-F]{24})';

/**
 * INIT
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
 * STUDY
 * /words/study
 * /words/study/:id
 */
router
  .route('/words/study')
  .get(WordController.getStudyList)
  .post(WordController.addStudyWord)
  .delete(WordController.deleteAllStudyWords)

router
  .route(`/words/study/:id${objectId}`)
  .get(WordController.getStudyWord)
  .put(WordController.updateStudyWord)
  .delete(WordController.deleteStudyWord)

module.exports = {
  router,
}
