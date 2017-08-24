const expect = require('chai').expect
const sinon = require('sinon')
const redisUtils = require('../db/redisUtil')

describe('[Test IN PROGRESS] Cache translate Tests', () => {
    before(function(){
        sinon
        .stub(redisUtils, 'get')
        .yields(null, null, "traducao");
    });  
    it.skip('Get a translate saved on redis', () => {
        expect('a').to.equal(redisUtils.get('cache-translate','dog'))
    })

    it.skip('Get a translate from Google Translate API', () => {
        expect('a').to.equal('a')
    })
})