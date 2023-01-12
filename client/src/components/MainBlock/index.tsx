import { CircularProgress } from '@mui/material';
import React, { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { defaultStatus, fetchBlogs } from '../../redux/slice/blogsSlice';
import { Blog as IBlog } from '../../types/blog';
import Blog from '../Blog';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchIcon from '@mui/icons-material/Search';

import s from './MainBlock.module.scss';

type Props = {};

const index = (props: Props) => {
    const dispatch = useAppDispatch();
    const { blogs, status, error } = useAppSelector((state) => state.blogs);
    console.log(blogs);

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

    if (error) {
        <h1>{error}</h1>;
    }

    if (status === 'succeeded') {
        toast('Пост успешно удален', {
            type: 'success',
        });
    }

    const [search, setSearch] = React.useState<string>('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const filteredBlogs = blogs.filter((blog) => {
        return blog.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    });

    return (
        <div className={s.wrapper}>
            <div className={s.search}>
                <div className={s.container}>
                    <SearchIcon color='primary' />
                    <input type='text' value={search} onChange={handleChange} />
                </div>
            </div>{' '}
            {filteredBlogs.map((elem: IBlog) => (
                <Blog key={elem._id} blog={elem} />
            ))}
        </div>
    );
};

export default memo(index);
