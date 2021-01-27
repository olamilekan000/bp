const path = require('path');
const lineReader = require('line-reader');

const fileReader = (fileName, query) => new Promise((resolve, reject) => {
  if (!fileName) throw new Error('You need to select a file');
  const pathToFile = path.join(__dirname, `../files/${fileName}`);

  const words = [];

  lineReader.eachLine(pathToFile, (line, last) => {
    const q = new RegExp(query, 'ig');

    if (line.search(q) > 0) {
      words.push(line.trim().toLowerCase());
    }

    if (last) {
      resolve(words);
    }
  });
});

module.exports = fileReader;
