import React from 'react';
import s from './LeftBar.module.scss';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Cookies from 'js-cookie';
// import avatar from '../../assets/avatar.jpg';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

type Props = {};

const index = (props: Props) => {

    const token = Cookies.get('token');    
    const login = Cookies.get('login')
    const avatar: any = Cookies.get('avatar')

    return (
        <>
        {token ? 
        <div className={s.wrapper}>
            <div>
                <img src={`http://localhost:5000${avatar}`} alt='Picture didnt load' />
                <div>
                    <h3>
                        {login}
                        <BorderColorIcon color='primary' /> 
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
            </div>
            <Link to='/new-post'>
                <Button fullWidth variant='contained' sx={{ mt: 3 }} color='primary'>
                    Added new post
                </Button>
            </Link>
        </div>
        : null}
        </>
    );
};

export default index;
