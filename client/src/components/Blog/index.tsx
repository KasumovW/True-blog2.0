import React from 'react';
import s from './Blog.module.scss';
import { Link } from 'react-router-dom';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Blog } from '../../types/blog';
import { useAppDispatch } from '../../hooks/redux';
import { removeBlog } from '../../redux/slice/blogsSlice';

type Props = {
    blog: Blog;
};

const imagePlug = 'https://www.study.ru/uploads/server/rS22pEaa0EpHMKAA.jpg';

const index = ({ blog }: Props) => {
    const dispatch = useAppDispatch();

    const handleRemove = () => {
        dispatch(removeBlog(blog._id));
        console.log(blog._id);
    };

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
                    <div className={s.dropDown}>
                        <MoreHorizIcon className={s.edit} color='primary' />
                        <div className={s.dropDownContent}>
                            <p>
                                Изменить <EditIcon />
                            </p>
                            <p onClick={handleRemove}>
                                Удалить <DeleteIcon />
                            </p>
                        </div>
                    </div>
                </div>
                <h1 className={s.blog_title}>{blog.title}</h1>
                <p className={s.blog_text}>{blog.text}</p>
                {blog.image && (
                    <img src={`http://localhost:5000/${blog.image}`} alt='Картинка не прогрузилась' />
                )}
            </div>
        </div>
    );
};

export default index;
