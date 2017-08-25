const redis = require('redis')

let redisClient

const init = () => {
  redisClient = redis.createClient({ detect_buffers: true })
  redisClient.on('error', function (err) {
    console.log('Redis Error ' + err)
  })

  redisClient.on('ready', function (ready) {
    console.log('Success Redis connection!')
  })
}

module.exports = () => {
  if (!redisClient) {
    return init()
  }
  return redisClient
}
