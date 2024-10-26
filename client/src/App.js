import React from 'react';
import FlightList from './components/FlightList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Cor primária personalizada
    },
    secondary: {
      main: '#dc004e', // Cor secundária personalizada
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
      <Typography variant="h3" component="h3" gutterBottom>
        Sistema de Reservas de Voos
      </Typography>
        <FlightList />
      </div>
    </ThemeProvider>
  );
}

export default App;
