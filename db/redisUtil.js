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

module.exports = {
  get
}

