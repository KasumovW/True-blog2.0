import React from 'react';
import s from './MainBlock.module.scss';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import avatar from '../../assets/avatar.jpg';

type Props = {};

const index = (props: Props) => {
    return (
        <div className={s.wrapper}>
            <div className={s.blog_item}>
                <div className={s.blog_header}>
                    <img src={avatar} alt='Иконка не прогрузилась' />
                    <div>
                        <p>Zubayra</p>
                        <p>20.12.2022</p>
                    </div>
                    <MoreHorizIcon className={s.edit} color='primary' />
                </div>
                <h1>Урок в Англомании</h1>
                <p>
                    Сегодня был в англомании, как обычно в 18:30, пришел на 20 реньше, урок начале на 10 минут
                    раньше. Встретелись с Джабраилам как и договаривалис, померили размеры футболки подошел и
                    я заказал себе сшить такую же в красном цвете. Сказал будет готово в течени 3-4 дней,
                    будем ждать.
                </p>
                <img
                    src='https://www.study.ru/uploads/server/rS22pEaa0EpHMKAA.jpg'
                    alt='Картинка не прогрузилась'
                />
            </div>
        </div>
    );
};

export default index;
