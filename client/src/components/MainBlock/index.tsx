import { CircularProgress } from '@mui/material';
import React, { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchBlogs } from '../../redux/slice/blogsSlice';
import { Blog as IBlog } from '../../types/blog';
import Blog from '../Blog';
import s from './MainBlock.module.scss';

type Props = {};

const index = (props: Props) => {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    const { blogs, status, error } = useAppSelector((state) => state.blogs);

    if (status === 'pending') {
        <div className={s.loader}>
            <CircularProgress color='primary' size='100px' />;
        </div>;
    }

    if (error) {
        <h1>{error}</h1>;
    }

    console.log(status, error);

    return (
        <div className={s.wrapper}>
            {blogs.map((elem: IBlog) => (
                <Blog key={elem._id} blog={elem} />
            ))}
        </div>
    );
};

export default memo(index);
