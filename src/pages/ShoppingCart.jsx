import React, { Component } from 'react';
import Header from '../components/Header';
import CartProduct from '../components/cards/CartProduct';

export default class ShoppingCart extends Component {
  state = {
    cartItems: JSON.parse(localStorage.getItem('cart-items')) || [],
  };

  render() {
    const { cartItems } = this.state;
    const isCartEmpty = !cartItems.length;
    return (
      <div className="cart-page">
        <Header isCart />
        {isCartEmpty ? (
          <h3
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </h3>
        ) : (
          cartItems
            .map((product) => (<CartProduct
              key={ Math.random() }
              product={ product }
            />))
        )}

      </div>
    );
  }
}
