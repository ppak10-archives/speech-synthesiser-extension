/**
 * actions.ts
 * Redux actions for selection components.
 */

// Node Modules
import { createAction } from '@reduxjs/toolkit';

// Enums
import { SelectionEditorStatus } from './enum';

export const setEditorStatus = createAction(
  'SELECTION/SET_EDITOR_STATUS',
  (editorStatus: SelectionEditorStatus) => ({
    payload: {
      editorStatus,
    },
  })
);
