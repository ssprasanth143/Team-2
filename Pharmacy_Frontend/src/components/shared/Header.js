import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';

const Header = () => {
  const isLoggedIn = authService.isLoggedIn();

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/orders">Orders</Link>
            </li>
          )}
          {isLoggedIn ? (
            <li>
              <button onClick={() => authService.logout()}>Logout</button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

