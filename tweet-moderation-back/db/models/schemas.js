var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var tweetSchema = new Schema({
    usuario:String,
    texto: String,
    id_tweet: String,
    aprovado: Boolean
  });

var hashtagSchema = new Schema({
  nome: String,
  data_utilizada: Date,
  hashtags:[tweetSchema]
});


  var Hashtag = mongoose.model('Hashtag', hashtagSchema);
  var Tweets = mongoose.model('Tweets', tweetSchema);

  module.exports = {
    Hashtag:Hashtag,
    Tweets:Tweets
  }