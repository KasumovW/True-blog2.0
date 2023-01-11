import { useState } from 'react';
import s from './Blog.module.scss';
import { Link } from 'react-router-dom';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { Blog } from '../../types/blog';
import { useAppDispatch } from '../../hooks/redux';
import { removeBlog } from '../../redux/slice/blogsSlice';
import { likeBlog } from '../../redux/slice/userSlice';
import Cookies from 'js-cookie';


type Props = {
    blog: Blog;
};

const imagePlug = 'https://www.study.ru/uploads/server/rS22pEaa0EpHMKAA.jpg';

const index = ({ blog }: Props) => {
    const dispatch = useAppDispatch();
    const userId = Cookies.get('userId');

    const [isLiked, setIsLiked] = useState<boolean>(!!blog.likes.find((item) => item === userId)),
          [likesAmount, setLikesAmount] = useState<number>(blog.likes.length)

    const handleRemove = () => {
        dispatch(removeBlog(blog._id));
        console.log(blog._id);
    };

    const handleLike = () => {
        setIsLiked(!isLiked)
        if(isLiked) {
            dispatch(likeBlog({id: blog._id, reqType: "unlike"}))
            setLikesAmount(likesAmount - 1)
        } else {
            dispatch(likeBlog({id: blog._id, reqType: "like"}))
            setLikesAmount(likesAmount + 1)
        }
    }

    return (
        <div className={s.blog_wrapper}>
            <div className={s.blog_item}>
                <div className={s.blog_header}>
                    <Link style={{ display: 'flex' }} to={`/profile/${blog.user._id}`}>
                        <img
                            src={blog.user.avatar && `http://localhost:5000/${blog.user.avatar}`}
                            alt='Иконка не прогрузилась'
                        />
                        <div>
                            <p>{blog.user.login}</p>
                            <p>20.12.2022</p>
                        </div>
                    </Link>
                    {blog.user._id === userId && (
                        <div className={s.dropDown}>
                            <MoreHorizIcon className={s.edit} color='primary' />
                            <div className={s.dropDownContent}>
                                <Link to={`/change-post/${blog._id}`}>
                                    <p>
                                        Изменить <EditIcon />
                                    </p>
                                </Link>
                                <p onClick={handleRemove}>
                                    Удалить <DeleteIcon />
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <Link to={`/post/${blog._id}`}>
                    <h1 className={s.blog_title}>{blog.title}</h1>
                </Link>
                <p className={s.blog_text}>{blog.text}</p>
                {blog.image && (
                    <img src={`http://localhost:5000/${blog.image}`} alt='Картинка не прогрузилась' />
                )}
                <div className={s.likeWrapper}>
                    {
                        isLiked ?
                        <><span>{likesAmount}</span><FavoriteIcon onClick={handleLike} fontSize='large' color='primary'/></>
                        :
                        <><span>{likesAmount}</span><FavoriteBorderIcon onClick={handleLike} fontSize='large' color='primary'/></>
                    }
                </div>
            </div>
        </div>
    );
};

export default index;
