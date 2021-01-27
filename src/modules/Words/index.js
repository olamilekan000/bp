const fileReader = require('../../helpers/file-reader');
const WordSearchRequestHandler = require('./words-request-handler');

const fileReaderHelper = fileReader;
const wordSearcher = new WordSearchRequestHandler({ fileReader: fileReaderHelper });

module.exports = wordSearcher;
