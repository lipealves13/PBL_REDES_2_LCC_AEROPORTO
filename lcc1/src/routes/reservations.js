const express = require('express');
const router = express.Router();
const axios = require('axios');
const { getPartnerFlights } = require('../utils/partnerFlights');
const flights = require('../data/flightsData'); 
const API_KEY = 'secretapikey123';

// Dados simulados de reservas
let reservations = [];

// Endpoint POST /reservations - Criar uma nova reserva
router.post('/', async (req, res) => {
  const { flightId, passengerName } = req.body;

  // Verificar se o voo pertence à LCC1
  let flight = flights.find(f => f.id == flightId);

  if (flight) {
    // Criar reserva localmente
    const reservation = {
      id: reservations.length + 1,
      flightId,
      passengerName,
    };
    reservations.push(reservation);
    res.status(201).json(reservation);
    flights[flightId].seatsAvailable = flights[flightId].seatsAvailable - 1; 
  } else {
    // Obter voos dos parceiros
    const partnerFlights = await getPartnerFlights();
    flight = partnerFlights.find(f => f.id == flightId);

    if (flight) {
      // Identificar o parceiro pelo campo 'airline'
      let partnerUrl = null;

      if (flight.airline === 'LCC2') {
        partnerUrl = 'http://lcc2:3102/reservations';
      } else if (flight.airline === 'LCC3') {
        partnerUrl = 'http://lcc3:3103/reservations';
      }

      if (partnerUrl) {
        try {
          // Fazer requisição para o parceiro criar a reserva
          const response = await axios.post(
            partnerUrl,
            { flightId, passengerName },
            { headers: { 'x-api-key': API_KEY } }
          );
          res.status(201).json(response.data);
        } catch (error) {
          res.status(500).send('Erro ao criar reserva no parceiro');
        }
      } else {
        res.status(404).send('Voo não encontrado nos parceiros');
      }
    } else {
      res.status(404).send('Voo não encontrado');
    }
  }
});

// Endpoint GET /reservations/:id - Obter detalhes de uma reserva
router.get('/:id', (req, res) => {
  const reservation = reservations.find(r => r.id == req.params.id);
  if (reservation) {
    res.json(reservation);
  } else {
    res.status(404).send('Reserva não encontrada');
  }
});

module.exports = router;
