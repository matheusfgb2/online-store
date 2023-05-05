import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { fixPriceDisplay } from '../../services/helpers';

export default class ProductCheckout extends Component {
  render() {
    const { product: { title, cartAmount, price, thumbnail } } = this.props;

    const fixedPrice = fixPriceDisplay(price.toFixed(2));
    const prodFinalPrice = fixPriceDisplay((price * cartAmount).toFixed(2));

    const areMultipleProds = cartAmount > 1;

    return (
      <div className="product-checkout-container">
        <img src={ thumbnail } alt={ title } />
        <h4>{title}</h4>
        <p>{`Quantidade: ${cartAmount}`}</p>
        <p>
          {`Total: R$ ${prodFinalPrice} ${
            areMultipleProds ? `[unid.: R$ ${fixedPrice}]` : ''
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
