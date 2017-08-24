
var translate = require('@google-cloud/translate')
const redisUtils = require('../db/redisUtil')

var translateClient = translate({
  projectId: 'ms-cache-translate',
  keyFilename: './path/to/keyfile.json'
})

const getWordFromCache = (word) => {
  return redisUtils.get('cache-translate', word)
}

const cacheTranslate = async (ctx) => {
  const translated = {
    originLanguage: ctx.params.from,
    destinyLanguage: ctx.params.to,
    text: ctx.headers.text
  }

  let translateOptions = {
    from: translated.originLanguage, // pt
    to: translated.destinyLanguage // en
  }

  const cacheValue = await getWordFromCache(translated.text)

  if (cacheValue) {
    translated.text = cacheValue
    return translated
  }
  return await getFromTranslate(translated, translateOptions)
}


const getFromTranslate = (translated, translateOptions) => {
  return new Promise((resolve, reject) => {
    translateClient.translate(translated.text, translateOptions, function (err, translation) {
      if (!err) {
        translated.text = translation
        return resolve(translated)
      }
      console.log(err)
      reject(err)
    })
  })
}

module.exports = {
  cacheTranslate
}
