const persons = require('../data/persons.json');

const getAll = () => {
  return Promise.resolve(persons);
};


module.exports = {
  getAll,
};
