const http = require('http');

const routes = require('./routes');

const server = http.createServer(routes);   // do not run the function 'routes', simply pass it to listener

server.listen(3000);