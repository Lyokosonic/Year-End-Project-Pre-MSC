import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CheckoutSteps from '../../components/CheckoutSteps';
import { savePayment } from '../../redux/actions/cartActions';

const Payment = (props) => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push('placeorder');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <Typography component="h2" variant="p">
                Payment
              </Typography>
            </li>
            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="paymentMethod">
                  Paypal
                </label>
              </div>
            </li>
            <li>
              <Button
                type="submit"
                className="button primary"
                variant="contained"
                disabled={!paymentMethod}
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

export default Payment;
