// store.js
import { configureStore } from '@reduxjs/toolkit';
import verificationReducer from '../store/auth';

const store = configureStore({
  reducer: {
    verification: verificationReducer,
    // Add other reducers as needed
  },
});

export default store;
