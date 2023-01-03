import React from 'react';
import Banner from '../../components/Banner';
import LeftBar from '../../components/LeftBar';
import MainBlock from '../../components/MainBlock';
import s from './Main.module.scss';

type Props = {};

const Index = (props: Props) => {
    return (
        <div className={s.wrapper}>
            <LeftBar />

            <div className={s.container}>
                <Banner />
                <MainBlock />
            </div>
        </div>
    );
};

export default Index;
