const axios = require('axios');

const partners = [
  'http://lcc1:3101/flights/partner/flights',
  'http://lcc2:3102/flights/partner/flights',
];

const API_KEY = 'secretapikey123';

async function getPartnerFlights() {
  let allFlights = [];
  console.log(partners); 

  for (let url of partners) {
    try {
      const response = await axios.get(url, {
        headers: { 'x-api-key': API_KEY },
      });
      allFlights = allFlights.concat(response.data);
    } catch (error) {
      console.error(`Erro ao acessar ${url}:`, error.message);
    }
  }

  return allFlights;
}

module.exports = { getPartnerFlights };
