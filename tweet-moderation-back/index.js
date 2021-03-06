const express = require('express');
const app = express();
const port = 3001;
const hash = require('./db/actions');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.get('/listar-tweets-aprovados', (req, res, next) => {
  let ultimo_tweet = hash.find_approved_tweets()
  .then((result) =>{
    console.log('Lista de tweets aprovados');
    console.log(result[0][0].hashtags)
    return res.status(200).send(result[0][0].hashtags)
  })
  .catch((error) => {
    console.log('Erro ao pegar lista de aprovados');
    console.log(erro)
    return res.status(500).send(error)
  })
  })


app.get('/listar-tweets', (req, res, next) => {
  let ultimo_tweet = hash.find_tweets()
  .then((result) =>{
    console.log('Lista de tweets');
    console.log(result[0][0].hashtags)
    return res.status(200).send(result[0][0].hashtags)
  })
  .catch((error) => {
    console.log('Erro ao pegar lista');
    console.log(erro)
    return res.status(500).send(error)
  })
  })

app.post('/hashtag', (req, res, next) => {
  hash.create(req.body)
  .then((result) =>{
    console.log('Hashtag');
    console.log(result)
    return res.status(201).send(result)
  })
  .catch((error) => {
    console.log('Erro ao crari hashtag');
    console.log(erro)
    return res.status(500).send(error)
  })
})  

app.post('/aprovar-tweets', (req, res, next) => {
  hash.aprovar_tweets(req.body)
  .then((result) =>{
    console.log('Aprovados');
    console.log(result)
    return res.status(201).send(result)
  })
  .catch((error) => {
    console.log('Erro ao Aprovador');
    console.log(erro)
    return res.status(500).send(error)
  })
}) 


setInterval(hash.atualizar_lista, 180000);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;