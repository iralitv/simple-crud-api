const Person = require('../models/person');
const { validateBody, getFormattedBody } = require('../crud');

const getPersons = async (req, res) => {
  try {
    const persons = await Person.getAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(persons));
  } catch (error) {
    console.log(error);
  }
};

const getPerson = async (req, res, id) => {
  try {
    const person = await Person.getById(id);

    if (person) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(person));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Person not found' }));
    }
  } catch (error) {
    console.log(error);
  }
};

const createPerson = async (req, res) => {
  try {
    const body = await getFormattedBody(req);

    const { name, age, hobbies } = JSON.parse(body);
    const validationMessage = validateBody({ name, age, hobbies });

    const data = {
      name,
      age,
      hobbies,
    };

    const newItem = await Person.createItem(data);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newItem));
  } catch (error) {
    console.log(error);
  }
};

const updatePerson = async (req, res, id) => {
  try {
    const item = await Person.getById(id);

    if (item) {
      const body = await getFormattedBody(req);

      const { name, age, hobbies } = JSON.parse(body);
      const validationMessage = validateBody({ name, age, hobbies });
  
      const data = {
        name: name || item.name,
        age: age || item.age,
        hobbies: hobbies || item.hobbies,
      };
  
      const updatedItem = await Person.updateItem(id, data);
  
      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updatedItem));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Person not found' }));
    }
  } catch (error) {
    console.log(error);
  }
};

const deletePerson = async (req, res, id) => {
  try {
    const person = await Person.getById(id);

    if (person) {
      await Person.deleteItem(id);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `Person ${person.name} - ${person.id} has been deleted`}));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Person not found' }));
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
};
