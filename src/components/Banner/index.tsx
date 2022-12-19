import React from 'react';
import banner from '../../assets/banner.png';
import s from './Banner.module.scss';

type Props = {};

const index = (props: Props) => {
    return (
        <div className={s.wrapper}>
            <img src={banner} alt='Баннер не прогрузился' />
        </div>
    );
};

export default index;
