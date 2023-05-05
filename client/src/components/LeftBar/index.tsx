import React from 'react';
import s from './LeftBar.module.scss';
import Cookies from 'js-cookie';
// import avatar from '../../assets/avatar.jpg';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import LockIcon from '@mui/icons-material/Lock';

type Props = {};

const index = (props: Props) => {
    const token = Cookies.get('token'),
        id = Cookies.get('userId'),
        login = Cookies.get('login'),
        avatar: any = Cookies.get('avatar');

    return (
        <div className={s.wrapper}>
            {!token && (
                <div className={s.lock} title='Нужно авторизоваться'>
                    <Link to='/auth'>
                        <LockIcon color='primary' />
                    </Link>
                </div>
            )}
            <div>
                <Link to={`/profile/${id}`}>
                    <img
                        src={
                            avatar
                                ? `http://localhost:5000/${avatar}`
                                : 'https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon.png'
                        }
                        alt='Picture didnt load'
                    />
                    <div>
                        <h3>
                            {login ? login : 'Name '}
                            <BorderColorIcon />
                        </h3>
                        <p>
                            Frontend developer - работа в компании "ZeroLab".
                            <br />
                            <br />
                            Стек технологий:
                            <br />- JavaScript / TypeScript
                        </p>
                        <a href=''>Read more</a>
                    </div>
                </Link>
            </div>
            <Link to='/new-post'>
                <Button fullWidth variant='contained' sx={{ mt: 3 }} color='primary'>
                    Add new post
                </Button>
            </Link>
        </div>
    );
};

export default index;
