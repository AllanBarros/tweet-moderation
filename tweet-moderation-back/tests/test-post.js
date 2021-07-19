const chai = require('chai');
const chaiHttp = require('chai-http');
const index = require('../index')

chai.use(chaiHttp);

describe('/post busca por hashtag', () => {
    it('Deveria gravar buscar pela hashtag e trazer até 15 tweets encontrados', (done) => {
        chai.request(index)
            .post('/hashtag')
            .send({'valor':'exo'})
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                done();
            })
    })
})