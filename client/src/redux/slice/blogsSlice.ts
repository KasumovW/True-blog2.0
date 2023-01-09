import { authorization } from './userSlice';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { Blog } from '../../types/blog';
import { Post } from '../../pages/NewPost';

type ChangePost = {
    post: Post;
    id: string | undefined;
};

const initialState = {
    blogs: [],
    watchingBlog: null,

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

export const getPostById = createAsyncThunk('blogs/getOne', async (postID: string | undefined, { rejectWithValue, dispatch }) => {
    try {
        if(!postID) {
            return "ID не найден"
        }
        const response = await fetch(`http://localhost:5000/posts/${postID}`);

        if (!response.ok) {
            throw new Error('Посты с сервера не получены, проблета ответа сервера!');
        }

        return await response.json();
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});


export const addBlog = createAsyncThunk('blogs/add', async (data: Post, { rejectWithValue, dispatch }) => {
    console.log(data);

    try {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('text', data.text);
        formData.append('image', data.image);

        const response = await fetch('http://localhost:5000/posts', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Посты с сервера не получены, проблета ответа сервера!');
        }

        const newData = await response.json();
        console.log(newData);
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const removeBlog = createAsyncThunk(
    'remove/blog',
    async (id: string, { rejectWithValue, dispatch }) => {
        try {
            console.log(id);

            const response = await fetch(`http://localhost:5000/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Не удалось удалить блог');
            }

            const newData = await response.json();
            console.log(newData);
            dispatch(deletePost(id));
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const editBlog = createAsyncThunk(
    'edit/blog',
    async ({ post, id }: ChangePost, { rejectWithValue, dispatch }) => {
        try {
            console.log(post);

            const formData = new FormData();

            if(post.title) {
                formData.append('title', post.title);
            }
            if (post.text) {
                formData.append('text', post.text);
            }
            formData.append('image', post.image);

            const response = await fetch(`http://localhost:5000/posts/${id}/`, {
                method: 'PATCH',
                //@ts-ignore
                headers: {
                    authorization: `Bearer ${Cookies.get('token')}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Не удалось изменить пост');
            }

            const newData = await response.json();
            dispatch(changePost(post));
            console.log(newData);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        getPosts: (state, action) => {
            state.blogs = action.payload;
        },
        deletePost: (state, action) => {
            state.blogs = state.blogs.filter((element: Blog) => element._id !== action.payload);
        },
        changePost: (state, action) => {
            state.blogs.map((elem: Blog) =>
                elem._id === action.payload.id
                    ? {
                          ...elem,
                          title: action.payload.title,
                          text: action.payload.text,
                          image: action.payload.image,
                      }
                    : elem
            );
        },
        defaultStatus: (state) => {
            state.status = null;
        },
        removeWatchingBlog: (state) => {
            state.watchingBlog = null;
        }
    },
    extraReducers: (builder) => {
        //Получение
        builder.addCase(fetchBlogs.pending, (state: any) => {
            state.status = 'pending';
            state.error = null;
        });
        builder.addCase(fetchBlogs.fulfilled, (state: any) => {
            state.status = null;
            state.error = null;
        });
        builder.addCase(fetchBlogs.rejected, (state: any, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });

        //Получение одного поста
        builder.addCase(getPostById.pending, (state: any) => {
            state.status = 'pending';
            state.error = null;
        });
        builder.addCase(getPostById.fulfilled, (state: any, action) => {
            state.status = null;
            state.watchingBlog = action.payload;
            state.error = null;
        });
        builder.addCase(getPostById.rejected, (state: any, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });

        //Добавление
        builder.addCase(addBlog.pending, (state: any) => {
            state.status = 'pending';
            state.error = null;
        });
        builder.addCase(addBlog.fulfilled, (state: any) => {
            state.status = 'succeeded';
            state.error = null;
        });
        builder.addCase(addBlog.rejected, (state: any, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });

        //Удаление
        builder.addCase(removeBlog.pending, (state: any) => {
            state.status = 'pending';
            state.error = null;
        });
        builder.addCase(removeBlog.fulfilled, (state: any) => {
            state.status = 'succeeded';
            state.error = null;
        });
        builder.addCase(removeBlog.rejected, (state: any, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });

        //Изменение
        builder.addCase(editBlog.pending, (state: any) => {
            state.status = 'pending';
            state.error = null;
        });
        builder.addCase(editBlog.fulfilled, (state: any) => {
            state.status = 'succeeded';
            state.error = null;
        });
        builder.addCase(editBlog.rejected, (state: any, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});

export const { getPosts, deletePost, changePost, defaultStatus, removeWatchingBlog } = blogSlice.actions;
