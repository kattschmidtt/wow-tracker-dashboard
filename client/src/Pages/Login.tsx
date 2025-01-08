import { Button, Card, CardContent, Grid, TextField } from '@mui/material';
import motherLogin from '/motherLogin.png';
import otherMotherReg from '/otherMotherReg.jpg';
import { useEffect, useState } from 'react';
import { useUserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

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
  const { login, isLoggedIn } = useUserContext();
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleView = () => {
    setIsRegistering(prevState => !prevState);
  }; 

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
    else {
      console.log('work on error handling')
    }
  }, [isLoggedIn]) 

  return (
    <Grid
      container 
      direction="column" 
      justifyContent="space-between" 
      alignItems="center" 
      sx={{ minHeight: '100vh', backgroundColor: '#36316b' }}>
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
            {isRegistering ?
              (
                <Button variant='contained' fullWidth>
                  <span className='login-text'>Register</span>
                </Button>
              ) : (
                <Button onClick={login} variant='contained' fullWidth>
                  <span className='login-text'>Login</span>
                </Button>
              )
            }
          </CardContent>
          <CardContent className="login-text"sx={{ textAlign: 'center', marginTop: '1rem', cursor: 'pointer', color: 'white', textDecoration: 'underline' }} onClick={toggleView}>
            {isRegistering ? 'Already have an account? Login here.' : 'New user? Register here.'}
          </CardContent>
        </Grid>
      </Card>
    </Grid>
    <span style={{
        position: 'fixed',
        fontSize: '.5rem',
        bottom: 0,
        width: '100%',
        backgroundColor: '#36316b',
        color: 'white',
        textAlign: 'center',
        padding: '1rem'}}>
      *All pictures belong to Blizzard Entertainment*
    </span>
    </Grid>
  );
};

export default Login;
