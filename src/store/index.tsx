import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import * as redusers from './exports'


export const store = configureStore({
    reducer: { ...redusers }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;


