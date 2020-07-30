import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../redux/actions/userActions';

const Signin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
    };
  }, [userInfo, redirect, props]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <div className="form">
      <form onSubmit={(e) => submitHandler(e)}>
        <ul className="form-container">
          <li>
            <Typography component="h2" variant="h3">
              Sign-in
            </Typography>
          </li>
          <li>
            { loading && <div>Loading...</div> }
            { error && <div>{error}</div> }
          </li>
          <li>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              type="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="button primary"
            >
              Sign In
            </Button>
          </li>
          <li>
            <Typography align="center" component="h4" variant="h5">
              New to LAM Industries ?
            </Typography>
          </li>
          <li>
            <Link href={redirect === '/' ? 'register' : `register?redirect=${redirect}`} className="button secondary text-center">
              Create your LAM Industries account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Signin;
