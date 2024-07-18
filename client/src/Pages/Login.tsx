import { Button, Card, CardContent, Grid, TextField } from '@mui/material';
import motherLogin from '/motherLogin.png';
import otherMotherReg from '/otherMotherReg.jpg';
import { useState } from 'react';

const textFieldStyles = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
    '& input': {
      color: 'white',
      '::placeholder': {
        color: 'white',
      }
    }
  },
  '& .MuiInputLabel-root': {
    color: 'white',
  }
};

const Login = () => {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const toggleView = () => {
    setIsRegistering(prevState => !prevState);
  };

  return (
    <Grid container justifyContent='center' alignItems='center' sx={{ minHeight: '100vh', backgroundColor: '#36316b' }}>
      <Card sx={{ background: '#271a38', display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
        <Grid item xs={12} sm={6} container justifyContent='center' alignItems='center' sx={{ transition: 'transform 0.5s ease-in-out', transform: isRegistering ? 'translateX(100%)' : 'translateX(0)' }}>
          {isRegistering ? (
            <img
            src={otherMotherReg}
            alt="Other Mother Registration"
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: '100%',
              transition: 'transform 0.5s ease-in-out',
              transform: isRegistering ? 'translateX(0%)' : 'translateX(100%)',
            }} />
          )
          : (
            <img
            src={motherLogin}
            alt="Mother Login"
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: '100%',
              transition: 'transform 0.5s ease-in-out',
              transform: isRegistering ? 'translateX(100%)' : 'translateX(0%)',
            }} />
          )
          }
        </Grid>
        <Grid item xs={12} sm={6} container direction='column' justifyContent='center' sx={{ bg: '#271a38', transition: 'transform 0.5s ease-in-out', transform: isRegistering ? 'translateX(-100%)' : 'translateX(0)', overflow: 'hidden' }}>
          <h2 className='login-text' style={{ color: 'white' }}>World of Warcraft <br/>Tracker Dashboard</h2>
          <CardContent>
            <TextField
              id='username'
              label='Email/Username'
              variant='outlined'
              fullWidth
              margin='normal'
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ style: { color: 'white' } }}
              sx={textFieldStyles}
            />
          </CardContent>
          <CardContent>
            <TextField
              id='password'
              label='Password'
              variant='outlined'
              type='password'
              fullWidth
              margin='normal'
              InputLabelProps={{
                style: { color: 'white' },
              }}
              inputProps={{
                style: { color: 'white' },
              }}
              sx={textFieldStyles}
            />
          </CardContent>
          <CardContent>
            <Button variant='contained' fullWidth>{isRegistering ? (<span className='login-text'>Register</span>) : (<span className='login-text'>Login</span>)}</Button>
          </CardContent>
          <CardContent className="login-text"sx={{ textAlign: 'center', marginTop: '1rem', cursor: 'pointer', color: 'white', textDecoration: 'underline' }} onClick={toggleView}>
            {isRegistering ? 'Already have an account? Login here.' : 'New user? Register here.'}
          </CardContent>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Login;
