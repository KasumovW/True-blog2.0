import { Box, Typography, TextField, FormControlLabel, Checkbox, Button, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { authorization } from '../../redux/slice/userSlice';
import { UserData } from '../../types/user';

import s from './Auth.module.scss';

type Props = {
    changeData: Function;
    data: UserData;
};

const Index = ({ changeData, data }: Props) => {
    const dispatch = useAppDispatch();

    const handleAuth = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(authorization(data));
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
                    Sign in
                </Typography>
                <Box component='form' onSubmit={handleAuth} noValidate sx={{ mt: 1 }}>
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
                    <Button
                        disabled={!data.login || !data.password}
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to='/'>Forgot password?</Link>
                        </Grid>
                        <Grid item>
                            <Link to='/reg'>{"Don't have an account? Sign Up"}</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    );
};

export default Index;
