const fs = require('fs');

const writeData = (fileName, content) => {
  fs.writeFileSync(fileName, JSON.stringify(content), 'utf8', (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const validateBody = ({ name, age, hobbies }) => {
  console.log(name, age, hobbies);
};

const getFormattedBody = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  writeData,
  validateBody,
  getFormattedBody,
};
