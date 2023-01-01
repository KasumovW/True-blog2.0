import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { UserData } from '../../types/user';

const initialState = {
    login: '',
    password: '',
    token: Cookies.get('token') || null,
};

export const authorization = createAsyncThunk(
    'todos/postTodos',
    async (data: UserData, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch('http://localhost:5000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: data.login,
                    password: data.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Вы не смогли авторизоватся, ошибка сервера!');
            }

            const newData = await response.json();
            Cookies.set('token', newData.token);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUserData: (state, action) => {
            state.login = action.payload.login;
            state.password = action.payload.password;
        },
    },
});
