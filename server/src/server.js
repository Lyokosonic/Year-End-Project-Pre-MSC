/* eslint-disable no-console */
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import config from './assets/config';
import orderRoute from './database/routes/orderRoute';
import productRoute from './database/routes/productRoute';
import userRoute from './database/routes/userRoute';

dotenv.config();

const {
  MONGO_HOSTNAME, MONGO_PORT, MONGO_DB, SERVER_PORT,
} = config;

const mongodbUrl = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).catch((error) => console.log(error.reason));

mongoose.connection.once('open', () => {
  console.log('Mongodb Connection Successful');
});

const app = express();

app.use(bodyParser.json());
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

app.listen(SERVER_PORT, () => {
  console.log(`Server started at ${SERVER_PORT}`);
});
