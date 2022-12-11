import React from 'react';
import LeftBar from '../../components/LeftBar';
import MainBlock from '../../components/MainBlock';
import s from './Main.module.scss';

type Props = {};

const Main = (props: Props) => {
    return (
        <div className={s.wrapper}>
            <LeftBar />
            <MainBlock />
        </div>
    );
};

export default Main;
