import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  state = {
    isCartEmpty: true,
  };

  render() {
    const { isCartEmpty } = this.state;
    return (
      <div>
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
