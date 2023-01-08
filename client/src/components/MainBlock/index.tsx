import { CircularProgress } from '@mui/material';
import React, { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { defaultStatus, fetchBlogs } from '../../redux/slice/blogsSlice';
import { Blog as IBlog } from '../../types/blog';
import Blog from '../Blog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from './MainBlock.module.scss';

type Props = {};

const index = (props: Props) => {
    const dispatch = useAppDispatch();
    const { blogs, status, error } = useAppSelector((state) => state.blogs);

    React.useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    React.useEffect(() => {
        if (status === 'succeeded') {
            dispatch(defaultStatus());
        }
    }, [status]);

    if (status === 'pending') {
        <div className={s.loader}>
            <CircularProgress color='primary' size='100px' />;
        </div>;
    }

    if (status === 'succeeded') {
        toast('Пост успешно удален', {
            type: 'success',
        });
    }

    if (error) {
        <h1>{error}</h1>;
    }

    return (
        <div className={s.wrapper}>
            {blogs.map((elem: IBlog) => (
                <Blog key={elem._id} blog={elem} />
            ))}
        </div>
    );
};

export default memo(index);
