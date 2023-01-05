import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    blogs: [],

    //'pending' | 'succeeded' | 'failed' | null
    status: null,
    error: null,
};

export const fetchBlogs = createAsyncThunk('blogs/fetch', async (_, { rejectWithValue, dispatch }) => {
    try {
        const response = await fetch('http://localhost:5000/posts');

        if (!response.ok) {
            throw new Error('Посты с сервера не получены, проблета ответа сервера!');
        }

        const newData = await response.json();
        dispatch(getPosts(newData));
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        getPosts: (state, action) => {
            state.blogs = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBlogs.pending, (state: any) => {
            state.status = 'pending';
            state.error = null;
        });
        builder.addCase(fetchBlogs.fulfilled, (state: any, action) => {
            state.status = 'succeeded';
            state.error = null;
        });
        builder.addCase(fetchBlogs.rejected, (state: any, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});

export const { getPosts } = blogSlice.actions;
