// store.js
import { configureStore } from '@reduxjs/toolkit';
import verificationReducer from './auth'; // Import your existing reducer
import themeReducer from './theme'; // Import the new theme reducer

const store = configureStore({
  reducer: {
    verification: verificationReducer,
    theme: themeReducer, // Add the theme reducer
    // Add other reducers as needed
  },
});

export default store;
