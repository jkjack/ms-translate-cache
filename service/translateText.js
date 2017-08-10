
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
  translateClient.translate(text, translateOptions, function (err, translation) {
    if (!err) {
      console.log('***OK***')
      console.log('TRANSLATED: ', translation)
      return translation
    }
    console.log(err)
  })
  return translated
}

module.exports = {
  cacheTranslate
}
