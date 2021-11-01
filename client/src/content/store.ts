/**
 * store.ts
 * Redux store for content script.
 */

// Node Modules
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import selectionReducer from './selection/reducer';

const store = configureStore({
  reducer: {
    selection: selectionReducer,
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
