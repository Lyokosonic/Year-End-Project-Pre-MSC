import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../../redux/actions/orderActions';

const Orders = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, orders } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const { success: successDelete } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {};
  }, [dispatch, successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  };
  return (
    loading ? (
      <div>Loading...</div>
    ) : (
      <div className="content content-margined">
        <div className="order-header">
          <Typography component="h3" variant="p">
            Orders
          </Typography>
        </div>
        <div className="order-list">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>USER</th>
                <th>PAID</th>
                <th>PAID AT</th>
                <th>DELIVERED</th>
                <th>DELIVERED AT</th>
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
                    <td>{order.user.name}</td>
                    <td>{order.isPaid.toString()}</td>
                    <td>{order.paidAt}</td>
                    <td>{order.isDelivered.toString()}</td>
                    <td>{order.deliveredAt ? order.deliveredAt : 'Not delivered yet'}</td>
                    <td>
                      <Link underline="none" href={`/order/${order._id}`} className="button secondary">Details</Link>
                      {' '}
                      <Button
                        type="button"
                        className="button secondary"
                        variant="contained"
                        onClick={() => deleteHandler(order)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};

export default Orders;
