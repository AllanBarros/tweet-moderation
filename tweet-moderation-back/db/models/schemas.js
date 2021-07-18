var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var tweetSchema = new Schema({
    usuario:String,
    texto: String,
    aprovado: Boolean
  });

var hashtagSchema = new Schema({
  nome: String,
  data_utilizada: Date,
  hashtags:[tweetSchema]
});


  var Hashtag = mongoose.model('Hashtag', hashtagSchema);

  module.exports = Hashtag;