import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Register from './pages/Auth/Register';
import Signin from './pages/Auth/Signin';
import Cart from './pages/Cart';
import Order from './pages/Checkout/Order';
import Orders from './pages/Checkout/Orders';
import Payment from './pages/Checkout/Payment';
import PlaceOrder from './pages/Checkout/PlaceOrder';
import Shipping from './pages/Checkout/Shipping';
import Home from './pages/Home';
import Product from './pages/Products/Product';
import Products from './pages/Products/Products';
import Profile from './pages/Profile';

const App = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };

  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button type="button" onClick={openMenu}>
              &#9776;
            </button>
            <Link underline="none" href="/">LAM Industries</Link>
          </div>
          <div className="header-links">
            <Link underline="none" href="/cart">Cart</Link>
            {
              userInfo ? (
                <Link underline="none" href="/profile">{userInfo.name}</Link>
              ) : (
                <Link underline="none" href="/signin">Sign in</Link>
              )
            }
            {
              userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link underline="none" href="/">Management</Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link underline="none" href="/orders">Orders</Link>
                      <Link underline="none" href="/products">Products</Link>
                    </li>
                  </ul>
                </div>
              )
            }
          </div>
        </header>
        <aside className="sidebar">
          <br />
          <Typography component="h3" variant="h4">
            Shopping Categories
          </Typography>
          <button type="button" className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul className="categories">
            <li>
              <Link underline="none" href="/category/Pants">Pants</Link>
            </li>
            <li>
              <Link underline="none" href="/category/Shirts">Shirts</Link>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/" exact component={Home} />
            <Route path="/category/:id" component={Home} />
            <Route path="/product/:id" component={Product} />
            <Route path="/products" component={Products} />
            <Route path="/register" component={Register} />
            <Route path="/signin" component={Signin} />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/profile" component={Profile} />
            <Route path="/shipping" component={Shipping} />
            <Route path="/payment" component={Payment} />
            <Route path="/placeorder" component={PlaceOrder} />
            <Route path="/order/:id" component={Order} />
            <Route path="/orders" component={Orders} />
          </div>
        </main>
        <footer className="footer">
          <Typography align="center" component="h3" variant="h5">
            All right reserved.
          </Typography>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
