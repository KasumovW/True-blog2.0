import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { blogSlice } from './slice/blogsSlice';
import { userSlice } from './slice/userSlice';

const rootReducer = combineReducers({
    user: userSlice.reducer,
    blogs: blogSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
