// verificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'pending',
};

const verificationSlice = createSlice({
  name: 'verification',
  initialState,
  reducers: {
    setVerificationStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setVerificationStatus } = verificationSlice.actions;
export default verificationSlice.reducer;
