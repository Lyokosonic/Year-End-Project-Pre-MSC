import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaypalButton from '../../components/PayPalButton';
import { detailsOrder, paypalOrder } from '../../redux/actions/orderActions';

const Orders = (props) => {
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPaypal);
  const { loading: loadingPay, success: successPay } = orderPay;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successPay) {
      props.history.push('/profile');
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {};
  }, [successPay, dispatch, props.match.params.id, props.history]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(paypalOrder(order, paymentResult));
  };

  return (
    loading ? (
      <div>Loading ...</div>
    ) : error ? (
      <div>{error}</div>
    ) : !order ? (
      <div>Order does not exist</div>
    ) : (
      <div>
        <div className="placeorder">
          <div className="placeorder-info">
            <div>
              <Typography component="h3" variant="p">
                Shipping
              </Typography>
              <div>
                <Typography component="h3" variant="h5">
                  {`${order.shipping.address}, `}
                  {`${order.shipping.city}, `}
                  {`${order.shipping.postalCode}, `}
                  {`${order.shipping.country}`}
                </Typography>
              </div>
              <div>
                <Typography component="h3" variant="h5">
                  {order.isDelivered ? `Delivered at ${order.deliveredAt}` : 'Not Delivered.'}
                </Typography>
              </div>
            </div>
            <div>
              <Typography component="h3" variant="p">
                Payment
              </Typography>
              <div>
                <Typography component="h3" variant="h5">
                  Payment Method: {order.payment.paymentMethod}
                </Typography>
              </div>
              <div>
                <Typography component="h3" variant="h5">
                  Status: {order.isPaid ? `Paid at ${order.paidAt}` : 'Not Paid.'}
                </Typography>
              </div>
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
                  order.orderItems.length === 0 ? (
                    <Typography component="h3" variant="h5">
                      Cart is empty
                    </Typography>
                  ) : (
                    order.orderItems.map((item) => (
                      <li key={item._id}>
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
              <li className="placeorder-actions-payment">
                {
                  loadingPay && (
                    <div>Finishing Payment...</div>
                  )
                }
                {
                  !order.isPaid && (
                    <PaypalButton
                      amount={order.totalPrice}
                      onSuccess={handleSuccessPayment}
                    />
                  )
                }
              </li>
              <li>
                <Typography component="h3" variant="p">
                  Order Summary
                </Typography>
              </li>
              <li>
                <Typography component="h3" variant="h5">
                  Items
                </Typography>
                <Typography component="h3" variant="h5">
                  ${order.itemsPrice}
                </Typography>
              </li>
              <li>
                <Typography component="h3" variant="h5">
                  Shipping
                </Typography>
                <Typography component="h3" variant="h5">
                  ${order.shippingPrice}
                </Typography>
              </li>
              <li>
                <Typography component="h3" variant="h5">
                  Tax
                </Typography>
                <Typography component="h3" variant="h5">
                  ${(Math.round(order.taxPrice * 100) / 100).toFixed(2)}
                </Typography>
              </li>
              <li>
                <Typography component="h3" variant="h5">
                  Order Total
                </Typography>
                <Typography component="h3" variant="h5">
                  ${order.totalPrice}
                </Typography>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default Orders;
