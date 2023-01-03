import { Box, Button, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { authorization } from '../../redux/slice/userSlice';
import { UserData } from '../../types/user';
import s from './Auth.module.scss';

type Props = {
    state: 'auth' | 'reg';
};

const index = ({ state }: Props) => {
    const dispatch = useAppDispatch();
    const [data, setData] = React.useState<UserData>({ login: '', password: '' });
    const changeData = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setData({ ...data, [key]: e.target.value });
    };

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();

        dispatch(authorization(data));
    };

    if (state === 'auth') {
        return (
            <div className={s.wrapper}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        maxWidth: '500px',
                        paddingX: '10px',
                    }}
                >
                    <Typography component='h1' variant='h5'>
                        Sign in
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='login'
                            label='Login'
                            name='login'
                            autoComplete='login'
                            autoFocus
                            value={data.login}
                            onChange={(e) => changeData(e, 'login')}
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            value={data.password}
                            onChange={(e) => changeData(e, 'password')}
                        />
                        <FormControlLabel
                            control={<Checkbox value='remember' color='primary' />}
                            label='Remember me'
                        />
                        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href='#' variant='body2'>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href='/reg' variant='body2'>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </div>
        );
    }

    if (state === 'reg') {
        return <div>Reg</div>;
    }
};

export default index;
