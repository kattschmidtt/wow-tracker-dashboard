import { Card, CardContent, Grid } from '@mui/material';

const Login = () => {
  return (
    <Grid container direction='column' justifyContent='center' alignItems='center' sx={{ minHeight: '100vh'}}>
      <Card>
        <Grid container>
          <Grid item>
            <CardContent>
              login
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Login;