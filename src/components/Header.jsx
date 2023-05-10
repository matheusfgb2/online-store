import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Header.css';
import logo from '../img/logo.png';
import cart from '../img/cart.png';

export default class Header extends Component {
  render() {
    const { cartTotalQuantity } = this.props;
    return (
      <div className="header-container">

        <Link to="/">
          <img
            className="logo-img"
            src={ logo }
            alt="Página inicial"
          />

        </Link>

        <Link
          to="/cart"
          className="cart-img-link-box"
          data-testid="shopping-cart-button"
        >
          <img
            className="cart-img"
            src={ cart }
            alt=""
          />
          <p
            className="cart-amount"
            data-testid="shopping-cart-size"
          >
            {cartTotalQuantity}

          </p>

        </Link>

      </div>
    );
  }
}
Header.propTypes = {
  cartTotalQuantity: PropTypes.number,
}.isRequired;
