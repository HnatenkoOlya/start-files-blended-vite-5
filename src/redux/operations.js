import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBaseCurrency = createAsyncThunk(
  'currency/fetchBaseCurrency',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/some-endpoint');
      return response.data.baseCurrency;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);