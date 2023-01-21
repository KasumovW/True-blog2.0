import React, { memo } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { defaultStatus, fetchBlogs } from '../../redux/slice/blogsSlice';

import { Blog as IBlog } from '../../types/blog';
import Blog from '../Blog';

import { toast } from 'react-toastify';

//@ts-ignore
import Fade from 'react-reveal/Fade';

import { CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash.debounce';

import s from './MainBlock.module.scss';

type Props = {};

const index = (props: Props) => {
    const dispatch = useAppDispatch();
    const { blogs, status, error } = useAppSelector((state) => state.blogs);

    React.useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    //Status
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

    //Debounce
    const [value, setValue] = React.useState<string>('');
    const [search, setSearch] = React.useState<string>('');

    const updateSearchValue = React.useCallback(
        debounce((text: string) => {
            console.log(`debounce ${text}`);
            setSearch(text);
        }, 500),
        []
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        updateSearchValue(e.target.value);
    };

    //Filter data
    const filteredBlogs = blogs.filter((blog) => {
        return blog.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    });

    return (
        <div className={s.wrapper}>
            <div className={s.search}>
                <div className={s.container}>
                    <SearchIcon color='primary' />
                    <input type='text' value={value} onChange={handleChange} />
                </div>
            </div>{' '}
            {filteredBlogs.map((elem: IBlog) => (
                <Fade opposite bottom>
                    <Blog key={elem._id} blog={elem} />
                </Fade>
            ))}
            {!filteredBlogs.length && (
                <div className={s.nothing}>К сожалению по вашему запросу нечего не найдено</div>
            )}
        </div>
    );
};

export default memo(index);
