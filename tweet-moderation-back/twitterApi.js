const axios = require('axios');

const options = {
    headers: {Authorization : 'Bearer AAAAAAAAAAAAAAAAAAAAAMUaRwEAAAAA6YgHmxgwv8isGP8ZPpShTkyKE50%3DNMGRVO41vfuX8FSuDCbTcbq4PM92KCArz5RZAbSJZBlHHqwhRG' }
  }
  
exports.get_tweets = function(hashtag) {
  return axios.get('https://api.twitter.com/1.1/search/tweets.json?q=%23' + hashtag, options)
  .then((response) => {
      return response.data
  }, (error) => {
    console.log(error);
  });
}