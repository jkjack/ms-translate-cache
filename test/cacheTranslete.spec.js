const expect = require('chai').expect
const sinon = require('sinon')
const redisUtils = require('../db/redisUtil')
const translateText = require('../service/translateText')

describe('Cache translate Tests', async () => {
    before(function(){
        const redis = sinon.stub(redisUtils, 'get')
        const googleApi = sinon.stub(translateText, 'getFromTranslate' )
        redis.withArgs('cache-translate','pt-en-gato').returns('traducao')
        redis.withArgs('cache-translate','pt-en-cachorro').returns({})
        redis.withArgs('cache-translate','pt-en-cachorro').returns('traducao google')
    })
    const getCacheTranslateParamsObj =  (from, to, text) => {
        return {
            params: { from, to },
            headers: { text }
        }
    }
    
    it('Get a translate saved on redis', async () => {
        const ctx = getCacheTranslateParamsObj('pt', 'en', 'gato')
        const result = JSON.stringify(await translateText.cacheTranslate(ctx))
        expect(result).to.equal('{"originLanguage":"pt","destinyLanguage":"en","text":"traducao"}')
    })

    it('Get a translate from Google Translate API', async () => {
        const ctx = getCacheTranslateParamsObj('pt', 'en', 'cachorro')
        const result = JSON.stringify(await translateText.cacheTranslate(ctx))
        expect(result).to.equal('{"originLanguage":"pt","destinyLanguage":"en","text":"traducao google"}')
    })

    it('Get a error from a big text to translate', async () => {
        const ctx = getCacheTranslateParamsObj('pt', 'en', `This big text should not be accept by the API,
         because it requires a lot of words to be translate at Google API`)
        const result = JSON.stringify(await translateText.cacheTranslate(ctx))
        expect(result).to.equal('{"error":"Text is too big"}')
    })
})