/**
 * enums.ts
 * Enums used within background script.
 */

export enum MenuItemId {
  Main = 'MAIN',
  ReadSelection = 'READ_SELECTION',
  SelectFromPage = 'SELECT_FROM_PAGE',
}

// May use string values here if debugging becomes difficult using ints.
export enum MessageType {
  SynthesizeText,
  ToggleSelectFromPage,
  SelectionEditorStatusSelecting,
  SelectionEditorStatusIdle,
  SelectionEditorStatusEditing,
}
