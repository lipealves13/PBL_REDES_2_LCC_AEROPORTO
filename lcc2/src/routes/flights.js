const express = require('express');
const router = express.Router();
const { getPartnerFlights } = require('../utils/partnerFlights');
const authenticate = require('../middleware/auth');
const flights = require('../data/flightsData'); 

// Endpoint GET /flights - Obter todos os voos
router.get('/', (req, res) => {
  res.json(flights);
});

// Endpoint GET /partner/flights - Obter voos disponíveis para parceiros
router.get('/partner/flights', authenticate, (req, res) => {
  res.json(flights);
});

// Endpoint GET /all-flights - Obter voos próprios e dos parceiros
router.get('/allflights', async (req, res) => {
  try {
    const partnerFlights = await getPartnerFlights();
    const allFlights = flights.concat(partnerFlights);
    res.json(allFlights);
  } catch (error) {
    res.status(500).send('Erro ao obter voos dos parceiros');
  }
});

// Endpoint GET /flights/:id - Obter detalhes de um voo
router.get('/:id', (req, res) => {
  const flight = flights.find(f => f.id == req.params.id);
  if (flight) {
    res.json(flight);
  } else {
    res.status(404).send('Voo não encontrado');
  }
});

module.exports = router;
