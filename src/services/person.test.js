const server = require('./../../server.js');
const supertest = require('supertest');
const requestWithSuperTest = supertest(server);

const persons = require('../data/persons.json');

describe('Person Endpoints', () => {
  test('GET /person should show all persons', async () => {
    const res = await requestWithSuperTest.get('/person');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(JSON.parse(res.text)).toMatchObject(persons);
  });
  test('GET /person/:id should show corresponding person', async () => {
    const personId = '6b96a9bb-3530-4899-a7f7-d02d425889ba';
    const res = await requestWithSuperTest.get(`/person/${personId}`);

    const person = persons.find(person => person.id === personId)
    if (person) {
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(JSON.parse(res.text)).toMatchObject(person);
    } else {
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(JSON.parse(res.text)).toMatchObject({ message: 'Person not found' });
    }
  });
  test('POST /person should create a new person', async () => {
    const data = {
      "name": "test routes name",
      "age": 12,
      "hobbies": ["write routes", "scream on routes"]
    };

    const res = await requestWithSuperTest
      .post('/person')
      .send(data);

    expect(res.status).toEqual(201);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(JSON.parse(res.text)).toMatchObject(
      expect.objectContaining(data)
    );
  });
  test('server should return code 500 at creating person with invalid data', async () => {
    const data = `{
      "name": "test routes name",
      age: 12,
      "hobbies": ["write routes", "scream on routes"]
    }`;

    const res = await requestWithSuperTest
      .post('/person')
      .send(data);

    expect(res.status).toEqual(500);
    expect(res.type).toEqual(expect.stringContaining('json'));
  });
});