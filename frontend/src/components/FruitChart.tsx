import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Typography } from '@mui/material';
import { FruitChartProps, FruitEntry } from '../types';

const FruitChart = ({ entries }: FruitChartProps) => {
  const chartData = useMemo(() => {
    const dataByDate: { [key: string]: { [key: string]: number } } = {};
    
    // Group entries by date and fruit
    entries.forEach((entry) => {
      if (!dataByDate[entry.date]) {
        dataByDate[entry.date] = {};
      }
      if (!dataByDate[entry.date][entry.fruit]) {
        dataByDate[entry.date][entry.fruit] = 0;
      }
      dataByDate[entry.date][entry.fruit] += entry.quantity;
    });

    // Convert to chart format
    return Object.entries(dataByDate)
      .map(([date, fruits]) => ({
        date,
        ...fruits,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [entries]);

  const fruits = useMemo(() => {
    const uniqueFruits = new Set<string>();
    entries.forEach((entry) => uniqueFruits.add(entry.fruit));
    return Array.from(uniqueFruits);
  }, [entries]);

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00C49F'];

  if (entries.length === 0) {
    return (
      <Typography variant="body1" align="center">
        No data available. Add some entries to see the chart.
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h6" gutterBottom align="center">
        Fruit Consumption Over Time
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {fruits.map((fruit, index) => (
            <Line
              key={fruit}
              type="monotone"
              dataKey={fruit}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default FruitChart; 