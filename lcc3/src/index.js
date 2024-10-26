const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3003; 

app.use(bodyParser.json());
app.use(cors());

// Importar rotas
const flightsRoutes = require('./routes/flights');
const reservationsRoutes = require('./routes/reservations');

// Usar rotas
app.use('/flights', flightsRoutes);
app.use('/reservations', reservationsRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`LCC1 server is running on port ${port}`);
});
