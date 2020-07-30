/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { removeFromCart, addToCart } from '../redux/actions/cartActions';

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();

  const removeFromCartHandler = (productID) => {
    dispatch(removeFromCart(productID));
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <Typography component="h2" variant="h3">
              Shopping Cart
            </Typography>
            <Typography align="right" component="h4" variant="p">
              Price
            </Typography>
          </li>
          {
            cartItems.length === 0 ? (
              <Typography component="h4" variant="h5">
                Cart is empty
              </Typography>
            ) : (
              Array.from(cartItems).map((item) => (
                <li key={item.product}>
                  <div className="cart-image">
                    <img src={item.image} alt="product" />
                  </div>
                  <div className="cart-info">
                    <div className="cart-info-name-container">
                      <Link className="cart-info-name" href={`/product/${item.product}`}>
                        {item.name}
                      </Link>
                    </div>
                    <div>
                      Qty:
                      {' '}
                      <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                        {[...Array(item.countInStock).keys()].map((x) => <option key={x + 1} value={x + 1}>{x + 1}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="cart-details">
                    <div>
                      <Typography component="h2" variant="h4">
                        $
                        {item.price}
                      </Typography>
                    </div>
                    <div>
                      <Button
                        type="button"
                        variant="contained"
                        className="button"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </li>
              ))
            )
          }
        </ul>
      </div>
      <div className="cart-action">
        <Typography component="h3" variant="h4">
          Subtotal (
          {' '}
          {Array.from(cartItems).reduce((a, c) => a + Number(c.qty), 0)}
          {' '}
          items ) : $
          {' '}
          {Array.from(cartItems).reduce((a, c) => a + c.price * c.qty, 0)}
        </Typography>
        <Button
          type="button"
          variant="contained"
          className="button primary full-width"
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
