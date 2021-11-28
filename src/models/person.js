const { v4: uuidv4 } = require('uuid');
const persons = require('../data/persons.json');
const { writeData } = require('../crud');

const DATA_PATH = './src/data/persons.json';

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

    writeData(DATA_PATH, persons);
    resolve(newItem);
  });
};

const updateItem = (id, data) => {
  return new Promise((resolve, reject) => {
    const updatedIdx = persons.findIndex(person => person.id === id);

    persons[updatedIdx] = {id, ...data};

    writeData(DATA_PATH, persons);
    resolve(persons[updatedIdx]);
  });
};

const deleteItem = (id) => {
  return new Promise((resolve, reject) => {
    const updatedPersons = persons.filter(person => person.id !== id);

    writeData(DATA_PATH, updatedPersons);
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
