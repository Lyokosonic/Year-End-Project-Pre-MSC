import express from 'express';
import Order from '../models/orderModel';
import { isAuth, isAdmin } from '../../utils';

const router = express.Router();

router.get("/", isAuth, async (req, res) => {
  const orders = await Order.find({}).populate('user');
  res.send(orders);
});
router.get("/mine", isAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

// Get specific order
router.get('/:id', isAuth, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });
    return res.send(order);
  } catch (error) {
    return res.status(404).send('Order Not Found.');
  }
});

// Delete order
router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove();
    res.send(deletedOrder);
  } else {
    res.status(404).send("Order Not Found.")
  }
});

// List of all orders
router.post('/', isAuth, async (req, res) => {
  try {
    const newOrder = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });
    const newOrderCreated = await newOrder.save();
    return res.status(201).send({ message: 'New Order Created', data: newOrderCreated });
  } catch (error) {
    return res.status(500).send({ message: 'Error occured while creating a new order' });
  }
});

// PayPal
router.put('/:id/pay', isAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: 'paypal',
      paymentResult: {
        payerID: req.body.payerID,
        orderID: req.body.orderID,
        paymentID: req.body.paymentID,
      },
    };
    const updatedOrder = await order.save();
    res.send({ message: 'Order Paid.', order: updatedOrder });
  } catch (error) {
    res.status(404).send({ message: 'Order not found.' });
  }
});

export default router;
