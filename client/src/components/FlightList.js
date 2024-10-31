import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';

function FlightList() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengerName, setPassengerName] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3101/flights/allflights')
      .then((response) => {
        setFlights(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Erro ao carregar voos.');
        setLoading(false);
      });
  }, []);

  const handleReserve = (flight) => {
    setSelectedFlight(flight);
  };

  const handleSubmitReservation = () => {
    if (!passengerName) {
      alert('Por favor, insira o nome do passageiro.');
      return;
    }

    axios
      .post('http://localhost:3101/reservations', {
        flightId: selectedFlight.id,
        passengerName: passengerName,
      })
      .then((response) => {
        alert('Reserva realizada com sucesso! ID da reserva: ' + response.data.id);
        setSelectedFlight(null);
        setPassengerName('');
      })
      .catch((error) => {
        alert('Erro ao realizar reserva.');
      });
  };

  if (loading) {
    return <Typography>Carregando voos...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Voos Disponíveis
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Origem</TableCell>
              <TableCell>Destino</TableCell>
              <TableCell>Companhia</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flights.map((flight) => (
              <TableRow key={flight.id}>
                <TableCell>{flight.id}</TableCell>
                <TableCell>{flight.origin}</TableCell>
                <TableCell>{flight.destination}</TableCell>
                <TableCell>{flight.airline}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleReserve(flight)}
                  >
                    Reservar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={Boolean(selectedFlight)} onClose={() => setSelectedFlight(null)}>
        <DialogTitle>Reservar Voo ID: {selectedFlight?.id}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedFlight?.origin} - {selectedFlight?.destination} ({selectedFlight?.airline})
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Nome do Passageiro"
            type="text"
            fullWidth
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedFlight(null)}>Cancelar</Button>
          <Button onClick={handleSubmitReservation} variant="contained" color="primary">
            Confirmar Reserva
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FlightList;
