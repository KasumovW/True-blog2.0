import React from 'react';
import s from './LeftBar.module.scss';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import avatar from '../../assets/avatar.jpg';

type Props = {};

const index = (props: Props) => {
    return (
        <div className={s.wrapper}>
            <img src={avatar} alt='Picture didnt load' />
            <div>
                <h3>
                    <BorderColorIcon color='primary' /> Zubayra Kasumow
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
    );
};

export default index;
