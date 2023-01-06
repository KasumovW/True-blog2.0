import React from 'react';
import s from './Blog.module.scss';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import avatar from '../../assets/avatar.jpg';
import { Blog } from '../../types/blog';

type Props = {
    blog: Blog;
};

const imagePlug = 'https://www.study.ru/uploads/server/rS22pEaa0EpHMKAA.jpg'

const index = ({ blog }: Props) => {
    return (
        <div>
            <div className={s.blog_item}>
                <div className={s.blog_header}>
                    <img src={avatar} alt='Иконка не прогрузилась' />
                    <div>
                        <p>{blog.user.login}</p>
                        <p>20.12.2022</p>
                    </div>
                    <MoreHorizIcon className={s.edit} color='primary' />
                </div>
                <h1>{blog.title}</h1>
                <p>{blog.text}</p>
                <img
                    src={blog.image ? `http://localhost:5000/${blog.image}` : imagePlug}
                    alt='Картинка не прогрузилась'
                />
            </div>
        </div>
    );
};

export default index;
