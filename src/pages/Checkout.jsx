import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ProductCheckout from '../components/cards/ProductCheckout';
import Header from '../components/Header';
import FormCheckout from '../components/FormCheckout';

export default class Checkout extends Component {
  render() {
    const { cartItems, cartTotalQuantity, history, removeCartItems } = this.props;
    return (
      <div className="checkout-page">
        <Header cartTotalQuantity={ cartTotalQuantity } />

        {cartItems.map((product) => (
          <ProductCheckout key={ Math.random() } product={ product } />
        ))}

        <FormCheckout history={ history } removeCartItems={ removeCartItems } />
      </div>
    );
  }
}

Checkout.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  })),
  cartTotalQuantity: PropTypes.number,
  removeCartItems: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
