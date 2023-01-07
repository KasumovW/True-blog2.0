import React from 'react';
import s from './Blog.module.scss';
import { Link } from 'react-router-dom';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import avatar from '../../assets/avatar.jpg';
import { Blog } from '../../types/blog';

type Props = {
    blog: Blog;
};

const imagePlug = 'https://www.study.ru/uploads/server/rS22pEaa0EpHMKAA.jpg'

const index = ({ blog }: Props) => {
    return (
        <div className={s.blog_wrapper}>
            <div className={s.blog_item}>
                <div className={s.blog_header}>
                    <Link style={{display: "flex"}} to={`/profile/${blog.user._id}`}>
                        <img src={blog.user.avatar && `http://localhost:5000${blog.user.avatar}`} alt='Иконка не прогрузилась' />
                        <div>
                            <p>{blog.user.login}</p>
                            <p>20.12.2022</p>
                        </div>
                    </Link>
                    <MoreHorizIcon className={s.edit} color='primary' />
                </div>
                <h1 className={s.blog_title}>{blog.title}</h1>
                <p className={s.blog_text}>{blog.text}</p>
                {blog.image && <img
                    src={`http://localhost:5000/${blog.image}`}
                    alt='Картинка не прогрузилась'
                />}
            </div>
        </div>
    );
};

export default index;
