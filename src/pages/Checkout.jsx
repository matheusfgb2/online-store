import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ProductCheckout from '../components/cards/ProductCheckout';
import Header from '../components/Header';
import FormCheckout from '../components/FormCheckout';

export default class Checkout extends Component {
  render() {
    const { cartItems, cartItemsAmount, history, clearCartItemsState } = this.props;
    return (
      <div className="checkout-page">
        <Header cartItemsAmount={ cartItemsAmount } />

        {cartItems.map((product) => (
          <ProductCheckout key={ Math.random() } product={ product } />
        ))}

        <FormCheckout history={ history } clearCartItemsState={ clearCartItemsState } />
      </div>
    );
  }
}

Checkout.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    cartAmount: PropTypes.number,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  })),
  cartItemsAmount: PropTypes.number,
  clearCartItemsState: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
