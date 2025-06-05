import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Container, Paper, Typography, Box } from '@mui/material';
import FruitForm from './components/FruitForm';
import FruitChart from './components/FruitChart';
import { FruitEntry } from './types';

function App() {
  const [entries, setEntries] = useState<FruitEntry[]>([]);

  const handleNewEntry = (entry: FruitEntry) => {
    setEntries([...entries, entry]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Fruit Consumption Tracker
          </Typography>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <FruitForm onSubmit={handleNewEntry} />
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}>
            <FruitChart entries={entries} />
          </Paper>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}

export default App; 