import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listMyOrders } from '../redux/actions/orderActions';
import { logout, update } from '../redux/actions/userActions';

const Profile = (props) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    props.history.push('/signin');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({
      userId: userInfo._id,
      email,
      name,
      password,
      address: {
        address,
        city,
        postalCode,
        country,
      },
    }));
  };

  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
      if (userInfo.address) {
        setAddress(userInfo.address.address);
        setCity(userInfo.address.city);
        setPostalCode(userInfo.address.postalCode);
        setCountry(userInfo.address.country);
      }
    }
    dispatch(listMyOrders());
    return () => {};
  }, [dispatch, userInfo]);

  return (
    <div className="profile">
      <div className="profile-info">
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <Typography component="h2" variant="h3">
                  User Profile
                </Typography>
              </li>
              <li>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {success && <div>Profile Saved Successfully.</div>}
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
                  value={name}
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
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </li>
              <li>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </li>
              <li>
                <Typography component="h2" variant="p">
                  User Location
                </Typography>
              </li>
              <li>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="address"
                  label="Address"
                  type="text"
                  name="address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </li>
              <li>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="city"
                  label="City"
                  type="text"
                  name="city"
                  onChange={(e) => setCity(e.target.value)}
                />
              </li>
              <li>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                  type="text"
                  name="postalCode"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </li>
              <li>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="country"
                  label="Country"
                  type="text"
                  name="country"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </li>
              <li>
                <Button
                  type="submit"
                  variant="contained"
                  className="button primary"
                >
                  Update
                </Button>
              </li>
              <li>
                <Button
                  type="button"
                  variant="contained"
                  className="button secondary full-width"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div className="profile-orders content-margined">
        {
          loadingOrders ? (
            <div>Loading...</div>
          ) : (
            errorOrders ? (
              <div>{errorOrders}</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.isPaid.toString()}</td>
                        <td>
                          <Link to={`/order/${order._id}`}>DETAILS</Link>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            )
          )
        }
      </div>
    </div>
  );
};

export default Profile;
