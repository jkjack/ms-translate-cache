var restify =require('restify');
const health = require('./healthCheck')

var server = restify.createServer();

server.get('/healthCheck', respond(health.getHealthCheck()))

function respond(method) {
  return function(req, res, next) {
    res.send(200, JSON.stringify(method))
    return next();
  }
}

server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});