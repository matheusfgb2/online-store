import React, { Component } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

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
            .reduce((acc, curr) => {
              if (!acc.some(({ id }) => curr.id === id)) {
                return [...acc, curr];
              } return acc;
            }, [])
            .map((product) => {
              const amount = cartItems.filter(({ id }) => product.id === id).length;

              return (<ProductCard
                key={ Math.random() }
                product={ product }
                amount={ amount }
              />);
            })
        )}

      </div>
    );
  }
}
