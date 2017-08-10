var restify =require('restify');
const health = require('./healthCheck')
const translateText = require('./service/translateText')
const redis = require("redis")
var redisClient = redis.createClient({detect_buffers: true })

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
  console.log('%s listening at %s', server.url);
});


redisClient.on("error", function (err) {
    console.log("Redis Error " + err);
});

redisClient.on("ready", function (ready) {
    console.log("Success Redis connection! ");
});
