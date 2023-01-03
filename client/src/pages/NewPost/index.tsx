import React from 'react';
import { TextField } from '@mui/material';

import s from './NewPost.module.scss';

import image_pickker from '../../assets/avatar-picker.svg';

type Props = {};

interface Post {
    title: string;
    description: string;
    image: null | any;
}

const index = (props: Props) => {
    const [post, setPost] = React.useState<Post>({ title: '', description: '', image: null });

    const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.files && setPost({ ...post, image: e.target.files[0] });
    };

    const changePost = (e: React.ChangeEvent<HTMLInputElement>, title: string) => {
        setPost({ ...post, [title]: e.target.value });
    };

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
                    id='description'
                    label='Введите описание нового поста...'
                    name='description'
                    autoComplete='description'
                    autoFocus
                    multiline
                    minRows={7}
                    value={post.description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => changePost(e, 'description')}
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
        </div>
    );
};

export default index;
