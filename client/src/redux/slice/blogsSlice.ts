import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

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

export const addBlog = createAsyncThunk('blogs/add', async (data: {title: string, text: string, image: File}, { rejectWithValue, dispatch }) => {
    
    console.log(data)

    try {

        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("text", data.text);
        formData.append("image", data.image);

        const response = await fetch('http://localhost:5000/posts', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            },
            body: formData,
        });

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
        
        builder.addCase(addBlog.pending, (state: any) => {
            state.status = 'pending';
            state.error = null;
        });
        builder.addCase(addBlog.fulfilled, (state: any, action) => {
            state.status = 'succeeded';
            state.error = null;
        });
        builder.addCase(addBlog.rejected, (state: any, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});

export const { getPosts } = blogSlice.actions;
