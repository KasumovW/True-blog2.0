import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../types/user';
import Cookies from 'js-cookie';

const initialState = {
    login: '',
    password: '',
    token: Cookies.get('token') || null,
    watchingUser: undefined,

    //'pending' | 'succeeded' | 'failed' | null
    status: null,
    error: null,
};

export const authorization = createAsyncThunk(
    'user/auth',
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
            dispatch(changeToken(newData));
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const registration = createAsyncThunk('user/reg', async (data: UserData, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:5000/users/registration', {
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
            throw new Error('Вы не смогли зарегистрироваться, ошибка сервера!');
        }

        const newData = await response.json();
        console.log(newData);
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const getUserByID = createAsyncThunk('user/getUser', async (userID: string, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:5000/users/${userID}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Вы не смогли зарегистрироваться, ошибка сервера!');
        }

        return await response.json();
        // console.log(newData);
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

const setError = (state: { status: string; error: Error }, action: { payload: any }) => {
    state.status = 'failed';
    state.error = action.payload;
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeToken: (_, action) => {
            console.log(action.payload)

            const {login, avatar, posts, likes} = action.payload

            Cookies.set("login", login)
            Cookies.set("avatar", avatar)
            Cookies.set("posts", posts)
            Cookies.set("likes", likes)
            Cookies.set('token', action.payload.token);
        },
        logout: (state) => {
            state.token = null;
            Cookies.remove('token');
        },
    },
    extraReducers: {
        //@ts-ignore
        [authorization.pending]: (state: { status: string; error: null }) => {
            state.status = 'pending';
            state.error = null;
        },
        //@ts-ignore
        [authorization.fulfilled]: (state: any, action: any) => {
            state.status = 'succeeded';
            state.error = null;
        },
        //@ts-ignore
        [authorization.rejected]: setError,

        //@ts-ignore
        [registration.pending]: (state: { status: string; error: null }) => {
            state.status = 'pending';
            state.error = null;
        },
        //@ts-ignore
        [registration.fulfilled]: (state: any, action: any) => {
            state.status = 'succeeded';
            state.error = null;
        },
        //@ts-ignore
        [registration.rejected]: setError,

        //@ts-ignore
        [getUserByID.pending]: (state: { status: string; error: null }) => {
            state.status = 'pending';
            state.error = null;
        },
        //@ts-ignore
        [getUserByID.fulfilled]: (state: any, action: any) => {
            state.status = 'succeeded';
            state.watchingUser = action.payload;
            state.error = null;
        },
        //@ts-ignore
        [getUserByID.rejected]: setError,
    },
});

export const { changeToken, logout } = userSlice.actions;
