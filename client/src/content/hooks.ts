/**
 * hooks.ts
 * Hooks commonly used within content script.
 */

// Node Modules
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

// Types
import type { RootState, AppDispatch } from './store';

// React Redux
export const useAppDispatch = (): Dispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;