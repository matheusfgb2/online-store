import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default class Header extends Component {
  render() {
    const { cartTotalQuantity } = this.props;
    return (
      <div className="header-container">
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          <p data-testid="shopping-cart-size">{`Carrinho (${cartTotalQuantity})`}</p>

        </Link>

        <Link to="/">Página inicial</Link>
      </div>
    );
  }
}
Header.propTypes = {
  cartTotalQuantity: PropTypes.number,
}.isRequired;
