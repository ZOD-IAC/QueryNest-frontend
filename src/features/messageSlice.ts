// src/features/messageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  messageType: 'info', // "success", "error", "warning"
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    showMessage: (state, action) => {
      state.message = action.payload.message || '';
      state.messageType = action.payload.messageType || 'info';
    },
    clearMessage: () => initialState,
  },
});

export const { showMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
