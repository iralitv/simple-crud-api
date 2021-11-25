const http = require('http');
const url = require('url');
require('dotenv').config();

const { getPersons } = require('./services/person');

const server = http.createServer(async (req, res) => {

  let parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');

  if (path === 'persons') {
    await getPersons(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Page not found' }));
  }
});

const PORT = process.env.PORT || '8080';

server.listen(PORT, () => console.log(`server is starting listen ${PORT} port`));
