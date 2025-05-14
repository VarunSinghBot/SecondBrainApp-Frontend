import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index.ts';

const store = configureStore({
  reducer: rootReducer, // Combine your reducers here
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;