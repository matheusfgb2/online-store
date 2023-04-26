import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default class Header extends Component {
  render() {
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
      </div>
    );
  }
}
