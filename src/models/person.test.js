const persons = require('../data/persons.json');
const { getAll, getById, createItem } = require('./person');

describe('test person models functions', () => {
  test('get list of all persons', () => {
    expect(getAll()).resolves.toMatchObject(persons);
  });
  test('get person by id', () => {
    const personId = '6b96a9bb-3530-4899-a7f7-d02d425889ba';
    const person = persons.find(person => person.id === personId)
    if (person) {
      expect(getById(personId)).resolves.toMatchObject(person);
    } else {
      expect(getById(personId)).resolves.toBeUndefined();
    }
  });
  test('create person', () => {
    const data = {
      "name": "test name",
      "age": 12,
      "hobbies": ["write", "scream"]
    };

    expect(createItem(data)).resolves.toMatchObject(
      expect.objectContaining(data)
    );
    const lastPerson = persons[persons.length - 1];
    expect(lastPerson.name).toBe(data.name);
  });
});