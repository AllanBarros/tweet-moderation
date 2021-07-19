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

    return Hashtag.create({ nome: hashtag, data_utilizada: Date.now(), hashtags: tweets })
        .then(res => {
          return parser(res._doc)
        }).catch((error) => {
            return error
        })
}

exports.create = function (data) {
    return api.get_tweets(data['valor'])
        .then(resultado => {
            return hashtag_create(data['valor'], resultado)
        })
        .catch(error => {
            return error
        })
}

exports.find_tweets = () => {
    return ultima_hashtag()
}

exports.find_approved_tweets = () => {
    return Hashtag.aggregate([
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
            hashtags: {
              $filter: {
                input: "$hashtags",
                as: "item",
                cond: {
                  $eq: ["$$item.aprovado",true]
                },
              },
            }
          }
        }
      ]).then(res => {
        return parser(res)
    }).catch((error) => {
        return error
    })
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

    let ultima = ultima_hashtag()
        .then(resultado => {
            return api.get_tweets(resultado[0].nome)
                .then(result => {
                    return adicionar_subdocumento(resultado[0], result)
                })
                .catch(error => {
                    return error
                })
        })
        .catch(err => {
            return err
        })


}

function ultima_hashtag() {
    let ultimo = Hashtag.findOne().sort('-data_utilizada')
        .then(res => {
            return parser(res._doc)
        }).catch((error) => {
            return error
        })

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

        return Hashtag.updateOne({ '_id': ultima._id }, { $push: { 'hashtags': tweets } })
            .then(res => {
                return parser(res._doc)
            }).catch((error) => {
                return error
            })
    } else {
        return
    }
}