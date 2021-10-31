/**
 * reducer.ts
 */

// Node Modules
import { createReducer } from '@reduxjs/toolkit';

// Actions
import { setIsSelecting } from './actions';

const INITIAL_STATE = {
  isSelecting: false,
};

const reducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(setIsSelecting, (state, action) => {
      state.isSelecting = action.payload.isSelecting;
    })
});

export default reducer;