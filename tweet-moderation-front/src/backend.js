import axios from 'axios';

const endereco_backend = 'http://localhost:3001'

const options = {
    headers: {'Content-Type': 'application/json'}
  }

export function POST(endpoint, valor) {
    axios.post(endereco_backend + endpoint,{
      valor
    }, options)
    .then((response) => {
      return response;
    }, (error) => {
      console.log(error);
    });
  }

  
export function GET(endpoint, saveSearch) {
  axios.get(endereco_backend + endpoint,{
  }, options)
  .then((response) => {
      return saveSearch(response.data)
  }, (error) => {
    console.log(error);
  });
}