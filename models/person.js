const { v4: uuidv4 } = require('uuid');
const persons = require('../data/persons.json');
const { writeData } = require('../crud');

const getAll = () => {
  return Promise.resolve(persons);
};

const getById = (id) => {
  return Promise.resolve(persons.find(person => person.id === id));
};

const createItem = (data) => {
  return new Promise((resolve, reject) => {
    const newItem = { id: uuidv4(), ...data };
    persons.push(newItem);

    writeData('./data/persons.json', persons);
    resolve(newItem);
  });
};

const updateItem = (id, data) => {
  return new Promise((resolve, reject) => {
    const updatedIdx = persons.findIndex(person => person.id === id);

    persons[updatedIdx] = {id, ...data};

    writeData('./data/persons.json', persons);
    resolve(persons[updatedIdx]);
  });
};

const deleteItem = (id) => {
  return new Promise((resolve, reject) => {
    const updatedPersons = persons.filter(person => person.id !== id);

    writeData('./data/persons.json', updatedPersons);
    resolve();
  });
};


module.exports = {
  getAll,
  getById,
  createItem,
  updateItem,
  deleteItem,
};
