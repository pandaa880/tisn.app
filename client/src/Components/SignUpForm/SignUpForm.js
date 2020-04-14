import React, { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import { postUser } from '../../logic/api';
import { setUserSession } from '../../logic/auth';

import Style from '../Style/Style';

const SignUpForm = () => {
  const history = useHistory();
  const style = Style();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUpClick = () => {
    setLoading(true);
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
    } else {
      postUser({ name, email, password, dateOfBirth })
        .then((data) => {
          setUserSession(data.user);
          history.push('/');
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  };

  return (
    <Fragment>
      {loading && <LinearProgress />}
      <Box p={1}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h1">Sign up</Typography>
          </Grid>
          <Grid item>
            <TextField
              className={style.formInput}
              label="Name"
              variant="outlined"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              className={style.formInput}
              label="Email"
              variant="outlined"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              className={style.formInput}
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              className={style.formInput}
              type="password"
              label="Confirm password"
              variant="outlined"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              className={style.formInput}
              type="date"
              label="Date of birth"
              variant="outlined"
              value={dateOfBirth}
              onChange={(event) => setDateOfBirth(event.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSignUpClick()}
              disabled={
                loading ||
                !name ||
                !email ||
                !password ||
                !confirmPassword ||
                !dateOfBirth
              }
            >
              Sign up
            </Button>
          </Grid>
          <Grid item>
            <Link href="/log-in">Log in</Link>
            {' | '}
            <Link href="/">Home</Link>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default SignUpForm;