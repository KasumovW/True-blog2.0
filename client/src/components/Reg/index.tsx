import { Box, Typography, TextField, FormControlLabel, Checkbox, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserData } from '../../types/user';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from './Reg.module.scss';
import { registration } from '../../redux/slice/userSlice';
import { useAppDispatch } from '../../hooks/redux';

type Props = {
    changeData: Function;
    data: UserData;
};

const index = ({ changeData, data }: Props) => {
    const dispatch = useAppDispatch();
    const handleReg = (e: React.MouseEvent) => {
        e.preventDefault();

        if (data.password === data.passConf) {
            //@ts-ignore
            dispatch(registration(data));
        } else {
            toast('Пароли не совпадают', {
                type: 'error',
            });
        }
    };

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
                    Sign Up
                </Typography>
                <Box component='form' onSubmit={handleReg} noValidate sx={{ mt: 1 }}>
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
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        name='ConfirmPassword'
                        label='Confirm password'
                        type='password'
                        id='ConfirmPassword'
                        autoComplete='current-password'
                        value={data.passConf}
                        onChange={(e) => changeData(e, 'passConf')}
                    />
                    <FormControlLabel
                        control={<Checkbox value='remember' color='primary' />}
                        label='Remember me'
                    />
                    <Button
                        disabled={!data.login || !data.password || !data.passConf}
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to='/'>Forgot password?</Link>
                        </Grid>
                        <Grid item>
                            <Link to='/auth'>Sign In</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    );
};

export default index;
