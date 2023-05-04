import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import CartProduct from '../components/cards/CartProduct';

export default class ShoppingCart extends Component {
  render() {
    const { cartItems, handleChangeProdAmount } = this.props;
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
              handleChangeProdAmount={ handleChangeProdAmount }
            />))
        )}

      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    cartAmount: PropTypes.number,
    id: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  })),
  handleChangeProdAmount: PropTypes.func,
}.isRequired;
