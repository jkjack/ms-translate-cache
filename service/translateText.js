
const cacheTranslate = (ctx) => {
    const originLanguage = ctx.params.from
    const destinyLanguage = ctx.params.to
    const text = ctx.headers.text
    const translated = {
        text,
        originLanguage,
        destinyLanguage
    }
    return translated
}

module.exports = {
    cacheTranslate
}