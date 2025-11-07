import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authslice';
import MessageReducer from '../features/messageSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: MessageReducer,
  },
});

export default store;
