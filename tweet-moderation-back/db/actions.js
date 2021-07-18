const mongoose = require('./db');
const Hashtag = require('./models/schemas');
const api = require('../twitterApi');


function hashtag_create(hashtag, resultado_busca) {
    
    let tweets = []
    resultado_busca.statuses.map(tweet => {
        return tweets.push({usuario:tweet.user.name, texto:tweet.text, aprovado:false})
    })
    
    return Hashtag.create({nome:hashtag, data_utilizada:Date.now(),hashtags:tweets})
    .then(res => {
        let jsonData = JSON.stringify(res._doc)
        let parsed_result = JSON.parse(jsonData)
        return parsed_result
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
 return Hashtag.findOne().sort('-data_utilizada')
 .then(res => {
    let jsonData = JSON.stringify(res._doc)
    let parsed_result = JSON.parse(jsonData)
    return parsed_result
}).catch((error) => {
    return error
})
}