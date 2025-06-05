import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import { format } from 'date-fns';
import { FruitFormProps } from '../types';

const FRUIT_OPTIONS = ['Apple', 'Banana', 'Orange', 'Mango', 'Pear'];

const FruitForm = ({ onSubmit }: FruitFormProps) => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [fruit, setFruit] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && fruit && quantity) {
      onSubmit({
        date: format(date, 'yyyy-MM-dd'),
        fruit,
        quantity: parseInt(quantity, 10),
      });
      setFruit('');
      setQuantity('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <DatePicker
            label="Date"
            value={date}
            onChange={(newDate) => setDate(newDate)}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Fruit</InputLabel>
            <Select
              value={fruit}
              label="Fruit"
              onChange={(e) => setFruit(e.target.value)}
              required
            >
              {FRUIT_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            inputProps={{ min: 1 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!date || !fruit || !quantity}
          >
            Add Entry
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FruitForm; 