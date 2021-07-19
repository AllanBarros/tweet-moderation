const mongoose = require("mongoose");
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const index = require('../index')
const { Hashtag } = require('../db/models/schemas');

chai.use(chaiHttp);

let hash = new Hashtag({
    nome: 'teste',
    data_utilizada: Date.now(),
    hashtags: [
      {
        usuario: 'tt',
        texto: 'testando',
        id_tweet: '1417216851755487200',
        aprovado: true
      },
      {
        usuario: 'tt2',
        texto: 'testando2',
        id_tweet: '1417216851755487222',
        aprovado: false
      },
    ],
  });

describe('Tweets', () => {
    before((done) => {
        console.log(hash)
        hash.save({}, (err) => {
           done();
        });
    });

describe('/get tweets', () => {
    it('Deveria trazer todos os tweets relacionados a última hashtag', (done) => {
        chai.request(index)
            .get('/listar-tweets')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.gte(0);
                done();
            })
    })
})


describe('/get tweets aprovados', () => {
    it('Deveria trazer todos os tweets relacionados a última hashtag que foram aprovados', (done) => {
        chai.request(index)
            .get('/listar-tweets-aprovados')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eq(1);
                done();
            })
    })
})
})