const validator = require('../../middlewares/validator');
const WordSearchControllers = require('../../modules/Words/words-controllers');

const wordSearchRoute = (Router) => {
  const router = Router();

  router.route('/').get(WordSearchControllers.searchWord);
  router.use('*', (_, res) => res.status(404).json({
    message: 'Not found',
  }));

  return router;
};

module.exports = wordSearchRoute;
