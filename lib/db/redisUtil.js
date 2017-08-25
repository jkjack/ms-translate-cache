const redisCli = require('./redisClient')

const get = (hash, key) => {
  return new Promise((resolve, reject) => {
    redisCli().hget(hash, key, (err, entity) => {
      if (err) {
        console.log(`Fail hget hash: ${hash}, key: ${key}`, { scope: 'Redis' })
        reject(entity)
      }
      console.log('Resultado redis: ', entity)
      resolve(entity)
    })
  })
}

const set = (hash, key, value) => {
  return new Promise((resolve, reject) => {
    redisCli().hset(hash, key, value, (err, entity) => {
      if (err) {
        console.log(`Fail hset hash: ${hash}, key: ${key}, value: ${value} `, { scope: 'Redis' })
        reject(entity)
      }
      resolve(entity)
    })
  })
}

module.exports = {
  get,
  set
}
