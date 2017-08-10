
var translate = require('@google-cloud/translate')

var translateClient = translate({
  projectId: 'ms-cache-translate',
  keyFilename: './path/to/keyfile.json'
})

const cacheTranslate = (ctx) => {
  const originLanguage = ctx.params.from
  const destinyLanguage = ctx.params.to
  const text = ctx.headers.text
  const translated = {
    originLanguage,
    destinyLanguage,
    text
  }

  let translateOptions = {
    from: originLanguage, // pt
    to: destinyLanguage // en
  }
  return new Promise((resolve, reject) => {
    translateClient.translate(text, translateOptions, function (err, translation) {
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
