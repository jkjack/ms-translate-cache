var restify = require('restify')
const health = require('./healthCheck')
const translateText = require('./service/translateText')
const redis = require('./db/redisClient')

var server = restify.createServer()

server.get('/healthCheck', respond(health.getHealthCheck))
server.get('/translateText/:from/:to', respondAsync(translateText.cacheTranslate))

function respond (action) {
  return function (req, res, next) {
    let ctx = {}
    ctx.params = req.params
    ctx.headers = req.headers

    const result = action(ctx)
    res.send(200, JSON.stringify(result))
    return next()
  }
}

function respondAsync (action) {
  return function (req, res, next) {
    let ctx = {}
    ctx.params = req.params
    ctx.headers = req.headers
    
    action(ctx).then(result => {
      res.send(200, JSON.stringify(result))
    })  
    return next()
  }
}

server.listen(3000, function () {
  redis()
  console.log('%s listening at %s', server.url)
})
