import Cookie from 'js-cookie';
import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
  myOrderListReducer,
  orderCreateReducer,
  orderDeleteReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPaypalReducer,
} from './reducers/orderReducers';
import {
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewSaveReducer,
  productSaveReducer,
} from './reducers/productReducers';
import { userRegisterReducer, userSigninReducer, userUpdateReducer } from './reducers/userReducers';

const userInfo = Cookie.getJSON('userInfo') || null;
const cartItems = Cookie.getJSON('cartItems') || [];

const initialState = {
  userSignin: { userInfo },
  cart: { cartItems, shipping: {}, payment: {} },
};

const reducer = combineReducers({
  productList: productListReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  productDetails: productDetailsReducer,
  productReviewSave: productReviewSaveReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPaypal: orderPaypalReducer,
  myOrderList: myOrderListReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
