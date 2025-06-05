import axios from 'axios';
import { FruitEntry } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  async getFruits(): Promise<string[]> {
    const response = await axios.get(`${API_BASE_URL}/fruits`);
    return response.data.fruits;
  },

  async getEntries(): Promise<FruitEntry[]> {
    const response = await axios.get(`${API_BASE_URL}/entries`);
    return response.data.entries;
  },

  async addEntry(entry: FruitEntry): Promise<void> {
    await axios.post(`${API_BASE_URL}/entries`, entry);
  },

  async getSummary(): Promise<{ [date: string]: { [fruit: string]: number } }> {
    const response = await axios.get(`${API_BASE_URL}/summary`);
    return response.data.summary;
  },
}; 