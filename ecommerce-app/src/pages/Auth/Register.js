import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/userActions';

const Register = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
    };
  }, [userInfo, props, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === rePassword) {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div className="form">
      <form onSubmit={(e) => submitHandler(e)}>
        <ul className="form-container">
          <li>
            <Typography component="h2" variant="h3">
              Create Account
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
              id="name"
              label="Name"
              type="name"
              name="name"
              autoComplete="name"
              onChange={(e) => setName(e.target.value)}
            />
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              type="password"
              name="password"
              autoComplete="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="repassword"
              label="Re-Enter Password"
              type="password"
              name="repassword"
              autoComplete="password"
              onChange={(e) => setRePassword(e.target.value)}
            />
          </li>
          <li>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="button primary"
              disabled={(!rePassword || !password) || (rePassword !== password)}
            >
              Register
            </Button>
          </li>
          <li>
            <Typography align="center" component="h4" variant="h5">
              Already have an account ?
            </Typography>
          </li>
          <li>
            <Link
              href={redirect === '/' ? 'signin' : `signin?redirect=${redirect}`}
              className="button secondary text-center"
            >
              Sign-in to your LAM Industries account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Register;
