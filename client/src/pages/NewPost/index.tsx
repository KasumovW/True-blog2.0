import React from 'react';
import { TextField, Button } from '@mui/material';
import { addBlog, editBlog } from '../../redux/slice/blogsSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '../../hooks/redux';
import s from './NewPost.module.scss';
import { useParams } from 'react-router-dom';

type Props = {
    state: 'edit' | 'add';
};

export interface Post {
    title: string;
    text: string;
    image: null | any;
}

const index = ({ state }: Props) => {
    const { id } = useParams();
    console.log(id);

    const [post, setPost] = React.useState<Post>({ title: '', text: '', image: null });

    const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.files && setPost({ ...post, image: e.target.files[0] });
    };

    const changePost = (e: React.ChangeEvent<HTMLInputElement>, title: string) => {
        setPost({ ...post, [title]: e.target.value });
    };

    const dispatch = useAppDispatch();

    const handlePost = () => {
        if (!post.title || !post.text) {
            if(state !== 'edit') {
                toast('Заполните все поля', {
                    type: 'warning',
                });
            }
        } else {
            state === 'edit' ? dispatch(editBlog({ post, id })) : dispatch(addBlog(post));
        }
    };

    console.log(post);

    return (
        <div className={s.wrapper}>
            <h1>Добавление нового поста</h1>
            <form>
                <h3>Заголовок нового поста</h3>
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='title'
                    label='Введите текст заголовка...'
                    name='title'
                    autoComplete='title'
                    autoFocus
                    value={post.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => changePost(e, 'title')}
                />
                <h3>Описание нового поста</h3>
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='text'
                    label='Введите описание нового поста...'
                    name='text'
                    autoComplete='text'
                    autoFocus
                    multiline
                    minRows={7}
                    value={post.text}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => changePost(e, 'text')}
                />
            </form>
            <label htmlFor='image' className={s.banner}>
                <h3>Прикрепить изображение</h3>
                {post.image ? (
                    <img src={URL.createObjectURL(post.image)} alt='Картинка не загрузилась' />
                ) : (
                    <div className={s.dumb} title='Добавить изображение'></div>
                )}
                <input
                    onChange={imageHandler}
                    id='image'
                    className='hidden'
                    type='file'
                    accept='.jpg, .jpeg, .png,'
                />
            </label>
            <div className={s.addButtonCover}>
                <Button className={s.addButton} variant='contained' onClick={handlePost}>
                    Добавить пост
                </Button>
            </div>
        </div>
    );
};

export default index;
