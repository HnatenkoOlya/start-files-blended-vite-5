import { configureStore, combineReducers } from '@reduxjs/toolkit';
import currencySlice from './slice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const currencyPersistConfig = {
  key: 'currency',
  storage,
  whitelist: ['baseCurrency'],
};

const rootReducer = combineReducers({
  currency: persistReducer(currencyPersistConfig, currencySlice),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;