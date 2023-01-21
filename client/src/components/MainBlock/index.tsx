import React, { memo } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { defaultStatus, fetchBlogs } from '../../redux/slice/blogsSlice';

import { Blog as IBlog } from '../../types/blog';
import Blog from '../Blog';

import { toast } from 'react-toastify';

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
            </div>
            {filteredBlogs.map((elem: IBlog) => (
                <Blog key={elem._id} blog={elem} />
            ))}
            {!filteredBlogs.length && (
                <div className={s.nothing}>
                    <svg
                        width='110'
                        height='94'
                        viewBox='0 0 110 94'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M38.7847 35.1189L34.6252 32.1187C33.029 30.9674 30.8115 31.263 29.5726 32.7922V32.7922C28.2828 34.3841 28.5278 36.7201 30.1197 38.0099L31.443 39.082M43.4758 39.4492L45.7642 41.3448C47.3373 42.6478 47.5684 44.9741 46.2826 46.5612V46.5612C45.0362 48.0996 42.8045 48.395 41.2008 47.2337L38.4238 45.2229'
                            stroke='#4B4B4B'
                            stroke-width='3'
                        />
                        <path
                            d='M37.3413 35.1189L39.1962 33.3065L40.4469 32.0558C41.87 30.6327 44.1773 30.6327 45.6004 32.0558V32.0558C47.0037 33.4591 47.026 35.7274 45.6506 37.1581L42.7541 40.1709M32.8171 38.7275L29.8884 42.206C28.6585 43.6669 28.7509 45.826 30.1013 47.1763V47.1763C31.5819 48.6569 33.9979 48.6048 35.4133 47.0617L38.4238 43.7794'
                            stroke='#4B4B4B'
                            stroke-width='3'
                        />
                        <path
                            d='M75.5596 31.5267L69.1095 26.4892C67.437 25.183 65.0356 25.4102 63.6378 27.0069L62.1767 28.6758C60.7215 30.338 60.8893 32.865 62.5515 34.3202L65.1849 36.6257M81.8259 37.7704L85.7524 41.284C87.386 42.7458 87.5386 45.2502 86.0946 46.8996L84.6097 48.5958C83.21 50.1946 80.8045 50.4199 79.1322 49.1089L74.5257 45.4974'
                            stroke='#4B4B4B'
                            stroke-width='3'
                        />
                        <path
                            d='M73.5611 31.4503L76.2253 29.039L78.7928 26.6604C80.4134 25.1591 82.9442 25.2557 84.4455 26.8763L85.8577 28.4007C87.3382 29.9987 87.2676 32.4877 85.699 33.9993L80.7885 38.7315M67.1062 36.2074L62.1898 41.6139C60.7927 43.1502 60.8036 45.5001 62.2148 47.0234L63.6774 48.6022C65.2248 50.2724 67.8523 50.316 69.4542 48.6981L74.602 43.4988'
                            stroke='#4B4B4B'
                            stroke-width='3'
                        />
                        <path
                            d='M21.768 16H89.0851C94.0584 16 97.8264 20.4896 96.9639 25.3875L86.4859 84.8875C85.8125 88.7116 82.4902 91.5 78.6071 91.5H31.4976C27.5776 91.5 24.2351 88.6596 23.6025 84.791L13.8729 25.291C13.0767 20.4221 16.8344 16 21.768 16Z'
                            stroke='#4B4B4B'
                            stroke-width='4'
                        />
                        <rect
                            x='1.7297'
                            y='39.9035'
                            width='13'
                            height='26'
                            rx='2.5'
                            transform='rotate(-9.62593 1.7297 39.9035)'
                            stroke='#4B4B4B'
                            stroke-width='3'
                        />
                        <path
                            d='M82 14.5L82 10C82 5.58172 78.4183 2 74 2L38 2C33.5817 2 30 5.58172 30 10L30 14.5'
                            stroke='#4B4B4B'
                            stroke-width='4'
                        />
                        <rect
                            x='-1.72243'
                            y='1.23824'
                            width='13'
                            height='26'
                            rx='2.5'
                            transform='matrix(-0.98689 -0.161395 -0.161395 0.98689 106.248 37.3206)'
                            stroke='#4B4B4B'
                            stroke-width='3'
                        />
                        <path
                            d='M43.4932 72.5H67.5068C67.8266 72.5 68.0643 72.7962 67.9949 73.1085L66.8838 78.1085C66.8329 78.3372 66.63 78.5 66.3957 78.5H44.6043C44.37 78.5 44.1671 78.3372 44.1162 78.1085L43.0051 73.1085C42.9357 72.7962 43.1734 72.5 43.4932 72.5Z'
                            stroke='#4B4B4B'
                            stroke-width='3'
                        />
                    </svg>
                    К сожалению по вашему запросу ничего не найдено
                </div>
            )}
        </div>
    );
};

export default memo(index);
