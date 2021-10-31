/**
 * actions.ts
 */

// Node Modules
import { createAction } from '@reduxjs/toolkit';

export const setIsSelecting = createAction(
  'SET_IS_SELECTING',
  (isSelecting: boolean) => ({
    payload: {
      isSelecting,
    },
  })
);
