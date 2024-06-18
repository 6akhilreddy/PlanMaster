import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { toast } from 'react-hot-toast';

const initialState = {
  isLoading: false,
  expenses: [],
  expense: {},
  expenseByCategory: {},
  expenseByMonth: {},
};

export const addExpense = createAsyncThunk(
  '/api/expense/(post)',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/expense/', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getAllExpenses = createAsyncThunk(
  '/api/expense/(get)',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/expense/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getExpenseDetails = createAsyncThunk(
  '/api/expense/:id(get)',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/expense/${payload.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteExpense = createAsyncThunk(
  '/api/expense/:id(delete)',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/expense/${payload}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateExpense = createAsyncThunk(
  '/api/expense/:id(patch)',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/expense/${payload.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getFilteredExpenses = createAsyncThunk(
  '/api/expense/filter(post)',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/expense/filter`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getExpensesByCategory = createAsyncThunk(
  '/api/expense/category/data(get)',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/expense/category/data', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getExpensesByMonth = createAsyncThunk(
  '/api/expense/monthly/data(get)',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/expense/monthly/data', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const expenseSlice = createSlice({
  name: 'expense',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addExpense.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addExpense.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.expenses = payload.allExpenses;
      toast.success(payload.message);
    });
    builder.addCase(addExpense.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.error);
    });

    builder.addCase(getAllExpenses.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllExpenses.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.expenses = payload.expenses;
    });
    builder.addCase(getAllExpenses.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.error);
    });
    builder.addCase(getExpenseDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getExpenseDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.expense = payload.expense;
      toast.success(payload.message);
    });
    builder.addCase(getExpenseDetails.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.error);
    });

    builder.addCase(deleteExpense.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteExpense.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.expenses = payload.allExpenses;
      toast.success(payload.message);
    });
    builder.addCase(deleteExpense.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.error);
    });

    builder.addCase(updateExpense.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateExpense.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.expenses = payload.allExpenses;
      toast.success(payload.message);
    });
    builder.addCase(updateExpense.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.error);
    });

    builder.addCase(getFilteredExpenses.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFilteredExpenses.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.filteredExpenses = payload.expenses;
      toast.success(payload.message);
    });
    builder.addCase(getFilteredExpenses.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.error);
    });

    builder.addCase(getExpensesByCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getExpensesByCategory.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.expenseByCategory = payload.expenses;
      toast.success(payload.message);
    });
    builder.addCase(getExpensesByCategory.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.error);
    });

    builder.addCase(getExpensesByMonth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getExpensesByMonth.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.expenseByMonth = payload.expenses;
      toast.success(payload.message);
    });
    builder.addCase(getExpensesByMonth.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.error);
    });
  },
});

export default expenseSlice.reducer;
