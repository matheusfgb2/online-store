import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  state = {
    isCartEmpty: true,
  };

  render() {
    const { isCartEmpty } = this.state;
    return (
      <div className="cart-container">
        {isCartEmpty ? (
          <h3
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </h3>
        ) : null}

      </div>
    );
  }
}
