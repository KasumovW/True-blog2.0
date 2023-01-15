import React,{ useState } from 'react';
import s from './Blog.module.scss';
import { Link } from 'react-router-dom';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';


import { Blog } from '../../types/blog';
import { useAppDispatch } from '../../hooks/redux';
import { removeBlog } from '../../redux/slice/blogsSlice';
import { likeBlog } from '../../redux/slice/userSlice';
import Cookies from 'js-cookie';


type Props = {
    blog: Blog;
};

const imagePlug = 'https://www.study.ru/uploads/server/rS22pEaa0EpHMKAA.jpg';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const index = ({ blog }: Props) => {
    const dispatch = useAppDispatch();
    const userId = Cookies.get('userId');
    const token = Cookies.get("token");

    const [isLiked, setIsLiked] = useState<boolean>(!!blog.likes.find((item) => item === userId)),
          [likesAmount, setLikesAmount] = useState<number>(blog.likes.length),
          [full, setFull] = useState<boolean>(false),
          [open, setOpen] = React.useState(false);


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

    const condition = full ? undefined : 400

    const handleFull = () => {
        setFull(!full)
    }


    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };


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
                <p className={s.blog_text} dangerouslySetInnerHTML={{__html: blog.text.slice(0, condition).split("\n").join("<br />").toString()}}></p>
                {blog.text.length > 400 && <span onClick={handleFull} className={s.read_more}>{full ? "Скрыть" : "Читать дальше"}</span>}
                {blog.image && (
                    <img src={`http://localhost:5000/${blog.image}`} alt='Картинка не прогрузилась' />
                )}

                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Вы не авторизованы"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Для того чтобы поставить лайк необходимо авторизоваться
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Link to={"/auth"}><Button>Авторизоваться</Button></Link>
                    </DialogActions>
                </Dialog>

                <div className={s.likeWrapper}>
                    { 
                        isLiked ?
                        <><span>{likesAmount}</span><FavoriteIcon onClick={handleLike} fontSize='large' color='primary'/></>
                        :
                        <><span>{likesAmount}</span><FavoriteBorderIcon onClick={token ? handleLike : handleClickOpen} fontSize='large' color='primary'/></>
                    }
                </div>
            </div>
        </div>
    );
};

export default index;
