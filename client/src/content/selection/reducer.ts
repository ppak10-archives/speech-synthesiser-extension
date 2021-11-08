/**
 * reducer.ts
 */

// Node Modules
import { createReducer } from '@reduxjs/toolkit';

// Actions
import { setEditorStatus } from './actions';

// Enums
import { SelectionEditorStatus } from './enums';

const INITIAL_STATE = {
  editorStatus: SelectionEditorStatus.Idle,
};

const reducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(setEditorStatus, (state, action) => {
      state.editorStatus = action.payload.editorStatus;
    })
});

export default reducer;