
import MessageReducer from '../features/messageSlice';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from '../features/authslice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // only persist auth
};

const rootReducer = combineReducers({
  auth: authReducer,
  message: MessageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) => gDM({ serializableCheck: false }),
});

export const persistor = persistStore(store);