import { CircularProgress } from '@mui/material';
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../../components/Auth';
import Reg from '../../components/Reg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { authorization } from '../../redux/slice/userSlice';
import { UserData } from '../../types/user';
import s from './Auth.module.scss';

type Props = {
    state: 'auth' | 'reg';
};

const Index = ({ state }: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { status } = useAppSelector((state) => state.user);

    const [data, setData] = React.useState<UserData>({ login: '', password: '', passConf: '' });

    const changeData = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setData({ ...data, [key]: e.target.value });
    };

    if (status === 'pending') {
        return (
            <div className={s.loader}>
                <CircularProgress color='primary' size='100px' />;
            </div>
        );
    }

    if (status === 'succeeded') {
        navigate('/');
        window.location.reload();
    }

    if (state === 'auth') {
        return <Auth changeData={changeData} data={data} />;
    }

    if (state === 'reg') {
        return <Reg changeData={changeData} data={data} />;
    }

    return (
        <div className={s.loader}>
            <CircularProgress color='primary' size='100px' />;
        </div>
    );
};

export default Index;
