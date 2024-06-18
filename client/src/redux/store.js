import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice.js';
import expenseReducer from './slice/expenseSlice.js';
const store = configureStore({
  reducer: {
    user: userReducer,
    expense: expenseReducer,
  },
});

export default store;
