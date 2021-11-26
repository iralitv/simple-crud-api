const http = require('http');
const url = require('url');
require('dotenv').config();

const { getPersons, getPerson, createPerson, updatePerson, deletePerson } = require('./services/person');

const server = http.createServer(async (req, res) => {

  let parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');

  if (path === 'persons' && req.method === 'GET') {
    getPersons(req, res);
  } else if (path.match(/persons\/([0-9]+)/) && req.method === 'GET') {
    const id = req.url.split('/')[2];
    getPerson(req, res, id);
  } else if (path === 'persons' && req.method === 'POST') {
    createPerson(req, res);
  } else if (path.match(/persons\/([0-9]+)/) && req.method === 'PUT') {
    const id = req.url.split('/')[2];
    updatePerson(req, res, id);
  } else if (path.match(/persons\/([0-9]+)/) && req.method === 'DELETE') {
    const id = req.url.split('/')[2];
    deletePerson(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Page not found' }));
  }
});

const PORT = process.env.PORT || '8080';

server.listen(PORT, () => console.log(`server is starting listen ${PORT} port`));
