import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../../components/CheckoutSteps';
import { saveShipping } from '../../redux/actions/cartActions';

const Shipping = (props) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({
      address, city, postalCode, country,
    }));
    props.history.push('payment');
  };

  useEffect(() => {
    if (userInfo.address) {
      setAddress(userInfo.address.address);
      setCity(userInfo.address.city);
      setPostalCode(userInfo.address.postalCode);
      setCountry(userInfo.address.country);
    }
    return () => {};
  }, [userInfo.address]);

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <Typography component="h2" variant="p">
                Shipping
              </Typography>
            </li>
            <li>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="address"
                label="Address"
                type="text"
                name="address"
                value={address}
                autoComplete="address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </li>
            <li>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="city"
                label="City"
                type="text"
                name="city"
                value={city}
                autoComplete="city"
                onChange={(e) => setCity(e.target.value)}
              />
            </li>
            <li>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="postalCode"
                label="Postal Code"
                type="text"
                name="postalCode"
                value={postalCode}
                autoComplete="postalCode"
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </li>
            <li>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="country"
                label="Country"
                type="text"
                name="country"
                value={country}
                autoComplete="country"
                onChange={(e) => setCountry(e.target.value)}
              />
            </li>
            <li>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="button primary"
              >
                Continue
              </Button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
