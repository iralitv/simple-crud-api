const fs = require('fs');

const writeData = (fileName, content) => {
  fs.writeFileSync(fileName, JSON.stringify(content), 'utf8', (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const validateBody = ({ name, age, hobbies }) => {
  return new Promise((resolve, reject) => {
    if (!name) {
      resolve({ message: "name is required field" });
    }

    if (typeof name !== 'string') {
      resolve({ message: "name must be a string" });
    }

    if (!age) {
      resolve({ message: "age is required field" });
    }

    if (typeof age !== 'number') {
      resolve({ message: "age must be a number" });
    }

    if (!hobbies) {
      resolve({ message: "hobbies is required field" });
    }

    if (!Array.isArray(hobbies)) {
      resolve({ message: "hobbies must be an array" });
    } else if (hobbies.length) {
      const areFieldsString = hobbies.every(item => typeof item === 'string');
      if (!areFieldsString) {
        resolve({ message: "hobbies item must be a string" });
      }
    }

    resolve();
  })
};

const validateId = (id) => {
  return new Promise((resolve, reject) => {
    if (id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)) {
      resolve();
    } else {
      resolve({ message: `the person's id ${id} isn't valid` })
    }
  })
}

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
  validateId,
  getFormattedBody,
};
