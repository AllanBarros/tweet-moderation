const mongoose = require('./db');
const { Hashtag } = require('./models/schemas');
const api = require('../twitterApi');

function comparador(outroArray) {
    return function (atual) {
        return outroArray.filter(function (outro) {
            return String(atual.id) == outro.id_tweet
        }).length == 0;
    }
}

function parser(resultado){
    let jsonData = JSON.stringify(resultado)
    let parsed_result = JSON.parse(jsonData)
    return parsed_result
}


function hashtag_create(hashtag, resultado_busca) {

    let tweets = []
    resultado_busca.statuses.map(tweet => {
        return tweets.push({ usuario: tweet.user.name, texto: tweet.full_text, id_tweet: tweet.id, aprovado: false })
    })
    console.log('Resultado da busca do twitter');
    console.log(resultado_busca);
    return Hashtag.create({ nome: hashtag, data_utilizada: Date.now(), hashtags: tweets })
        .then(res => {
        console.log('Nova hashtag criada');
        console.log(res._doc)
          return parser(res._doc)
        }).catch((error) => {
            console.log('Erro ao criar nova hashtag');
            return error
        })
}

exports.create = function (data) {
    return api.get_tweets(data['valor'])
        .then(resultado => {
            console.log('tweets localizados para hashtag');
            console.log(resultado);
            return hashtag_create(data['valor'], resultado)
        })
        .catch(error => {
            return error
        })
}

exports.find_tweets = () => {
    return ultima_hashtag(false, false)
}

exports.find_approved_tweets = () => {
    return ultima_hashtag(true, false)
}

exports.aprovar_tweets = (data) => {

    let updates = data.valor.map(e => {
        return Hashtag.updateMany({ 'hashtags._id': e }, { 'hashtags.$.aprovado': true })
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    })

    return Promise.all(updates).then(res => {
        return res
    })
        .catch(err => {
            return err
        })

}

exports.atualizar_lista = () => {
    console.log('Iniciando atualização de tweets')
    let ultima = ultima_hashtag(false, true)
        .then(resultado => {
            console.log('Ultima hashtag');
            console.log(resultado[0][0].nome);
            return api.get_tweets(resultado[0][0].nome)
                .then(result => {
                    console.log('Novos tweets');
                    console.log(result)
                    return adicionar_subdocumento(resultado[0][0], result)
                })
                .catch(error => {
                    console.log('Erro na busca de novos tweets');
                    console.log(error)
                    return error
                })
        })
        .catch(err => {
            console.log('Erro na busca de novos tweets 2');
            console.log(err)
            return err
        })


}

function ultima_hashtag(status, atualizar) {
    var ultimo = null;
    if (atualizar) {
    ultimo = Hashtag.aggregate([
        {
          $sort: {
            data_utilizada: -1
          },
          
        },
        {
          $limit: 1
        },
        {
          $project: {
            nome: "$nome",
            hashtags: {
              $filter: {
                input: "$hashtags",
                as: "item",
                cond:{},
              },
            }
          }
        }
      ])
        .then(res => {
            return parser(res)
        }).catch((error) => {
            return error
        })
    }
    else{
        ultimo = Hashtag.aggregate([
            {
              $sort: {
                data_utilizada: -1
              },
              
            },
            {
              $limit: 1
            },
            {
              $project: {
                nome: "$nome",
                hashtags: {
                  $filter: {
                    input: "$hashtags",
                    as: "item",
                    cond: {
                      $eq: ["$$item.aprovado", status]
                    },
                  },
                }
              }
            }
          ])
            .then(res => {
                return parser(res)
            }).catch((error) => {
                return error
            })
    }
    return Promise.all([ultimo]).then(res => {
        return res
    })
        .catch(err => {
            return err
        })

}

function adicionar_subdocumento(ultima, lista) {

    let tweets_atuais = ultima.hashtags
    let tweets_atualizados = lista.statuses
    let tweets = []

    let result = tweets_atualizados.filter(comparador(tweets_atuais));
    if (result.length > 0) {

        result.map(tweet => {
            return tweets.push({ usuario: tweet.user.name, texto: tweet.full_text, id_tweet: tweet.id, aprovado: false })
        })
        console.log('lista de novos subdocumentos:');
        console.log(tweets);
        return Hashtag.updateOne({ '_id': ultima._id }, { $push: { 'hashtags': tweets } })
            .then(res => {
                console.log('Subdocumentos criados');
                console.log(res);
                return parser(res)
            }).catch((error) => {
                console.log('Erro ao criar subdocumentos');
                console.log(error);
                return error
            })
    } else {
        return
    }
}