const axios = require('axios');

const partners = [
  'http://lcc2:3002/flights/partner/flights',
  'http://lcc3:3003/flights/partner/flights',
];

const API_KEY = 'secretapikey123';

async function getPartnerFlights() {
  let allFlights = [];

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
