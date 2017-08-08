var restify =require('restify');
const health = require('./healthCheck')
const translateText = require('./service/translateText')

var server = restify.createServer();

server.get('/healthCheck', respond(health.getHealthCheck))
server.get('/translateText/:from/:to', respond(translateText.cacheTranslate))

function respond(action) {
  return function(req, res, next) {
    let ctx = {}
    ctx.params = req.params
    ctx.headers = req.headers

    const result = action(ctx)

    res.send(200, JSON.stringify(result))
    return next();
  }
}

server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});
