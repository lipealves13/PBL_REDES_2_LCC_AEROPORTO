import React from 'react';
import FlightList from './components/FlightList';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
        <h1>Sistema de Reservas de Voos</h1>
        <FlightList />
      </div>
    </ThemeProvider>
  );
}

export default App;
