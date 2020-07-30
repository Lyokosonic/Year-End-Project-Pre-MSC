import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../../components/CheckoutSteps';
import { createOrder } from '../../redux/actions/orderActions';

const PlaceOrder = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, order } = orderCreate;

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cartItems,
      shipping,
      payment,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
    }
    if (cartItems.length !== 0) {
      if (!shipping.address) {
        props.history.push('/shipping');
      } else if (!payment.paymentMethod) {
        props.history.push('/payment');
      }
    } else {
      props.history.push('/cart');
    }
    return () => {};
  }, [
    success,
    order,
    payment.paymentMethod,
    props.history,
    shipping.address,
    cartItems.length,
  ]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <Typography component="h3" variant="p">
              Shipping
            </Typography>
            <Typography component="h3" variant="h5">
              {`${cart.shipping.address}, `}
              {`${cart.shipping.city}, `}
              {`${cart.shipping.postalCode}, `}
              {`${cart.shipping.country}`}
            </Typography>
          </div>
          <div>
            <Typography component="h3" variant="p">
              Payment
            </Typography>
            <Typography component="h3" variant="h5">
              Payment Method: {cart.payment.paymentMethod}
            </Typography>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <Typography component="h3" variant="p">
                  Shopping Cart
                </Typography>
                <Typography component="h3" variant="h5">
                  Price
                </Typography>
              </li>
              {
                cartItems.length === 0 ? (
                  <Typography component="h3" variant="h5">
                    Cart is empty
                  </Typography>
                ) : (
                  cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="cart-image">
                        <img src={item.image} alt="product" />
                      </div>
                      <div className="cart-info">
                        <div className="cart-info-name-container">
                          <Link href={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <Typography component="h3" variant="h5">
                          Qty: {item.qty}
                        </Typography>
                      </div>
                      <Typography className="cart-details" component="h3" variant="h4">
                        ${item.price}
                      </Typography>
                    </li>
                  ))
                )
              }
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <Button
                type="button"
                className="button primary full-width"
                variant="contained"
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </li>
            <li>
              <Typography component="h3" variant="p">
                Order Summary
              </Typography>
            </li>
            <li>
              <Typography className="cart-details" component="h3" variant="h5">
                Items
              </Typography>
              <Typography className="cart-details" component="h3" variant="h5">
                ${itemsPrice}
              </Typography>
            </li>
            <li>
              <Typography component="h3" variant="h5">
                Shipping
              </Typography>
              <Typography component="h3" variant="h5">
                ${shippingPrice}
              </Typography>
            </li>
            <li>
              <Typography component="h3" variant="h5">
                Tax
              </Typography>
              <Typography component="h3" variant="h5">
                ${(Math.round(taxPrice * 100) / 100).toFixed(2)}
              </Typography>
            </li>
            <li>
              <Typography component="h3" variant="p">
                Order Total
              </Typography>
              <Typography component="h3" variant="p">
                ${totalPrice}
              </Typography>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
