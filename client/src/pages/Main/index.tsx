import React from 'react';
import Banner from '../../components/Banner';
import LeftBar from '../../components/LeftBar';
import MainBlock from '../../components/MainBlock';
import s from './Main.module.scss';

//@ts-ignore
import Fade from 'react-reveal/Fade';

type Props = {};

const Index = (props: Props) => {
    return (
        <div className={s.wrapper}>
            <Fade left>
                <LeftBar />
            </Fade>

            <div className={s.container}>
                <Fade right>
                    <Banner />
                </Fade>
                <MainBlock />
            </div>
        </div>
    );
};

export default Index;
