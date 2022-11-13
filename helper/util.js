const util = require('util');
const fs = require('fs');


const writeFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const appendFile = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeFile(file, parsedData);
    }
  });
};

const readFile = util.promisify(fs.readFile);

module.exports = {readFile, writeFile, appendFile};