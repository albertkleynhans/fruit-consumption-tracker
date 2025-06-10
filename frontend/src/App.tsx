import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Container, Paper, Typography, Box } from '@mui/material';
import FruitForm from './components/FruitForm';
import FruitChart from './components/FruitChart';
import { FruitEntry } from './types';
import { api } from './services/api';

function App() {
  const [entries, setEntries] = useState<FruitEntry[]>([]);

  // Load existing entries when component mounts
  useEffect(() => {
    const loadEntries = async () => {
      try {
        const data = await api.getEntries();
        setEntries(data);
      } catch (error) {
        console.error('Error loading entries:', error);
      }
    };
    loadEntries();
  }, []);

  const handleNewEntry = async (entry: FruitEntry) => {
    try {
      await api.addEntry(entry);
      const updatedEntries = await api.getEntries();
      setEntries(updatedEntries);
    } catch (error) {
      console.error('Error adding entry:', error);
    }
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