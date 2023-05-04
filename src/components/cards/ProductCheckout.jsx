import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class ProductCheckout extends Component {
  render() {
    const { product: { title, cartAmount, price, thumbnail } } = this.props;

    const prodFinalPrice = price * cartAmount;
    const areMultipleProds = cartAmount > 1;

    return (
      <div className="product-checkout-container">
        <img src={ thumbnail } alt={ title } />
        <h4>{title}</h4>
        <p>{`Quantidade: ${cartAmount}`}</p>
        <p>
          {`Total: R$${prodFinalPrice} ${
            areMultipleProds ? `[unid.: R$${price}]` : ''
          }`}

        </p>
      </div>
    );
  }
}

ProductCheckout.propTypes = {
  cartItems: PropTypes.shape({
    cartAmount: PropTypes.number,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }),
}.isRequired;
