import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { fixPriceDisplay } from '../../services/helpers';

export default class ProductCheckout extends Component {
  render() {
    const {
      product: { title,
        price,
        thumbnail,
        cart_quantity: cartQuantity,
      },
    } = this.props;

    const fixedPrice = fixPriceDisplay(price);
    const prodFinalPrice = fixPriceDisplay(price * cartQuantity);

    const areMultipleProds = cartQuantity > 1;

    return (
      <div className="product-checkout-container">
        <img src={ thumbnail } alt={ title } />
        <h4>{title}</h4>
        <p>{`Quantidade: ${cartQuantity}`}</p>
        <p>
          {`Valor: R$ ${prodFinalPrice} ${
            areMultipleProds ? `[unid.: R$ ${fixedPrice}]` : ''
          }`}

        </p>
      </div>
    );
  }
}

ProductCheckout.propTypes = {
  cartItems: PropTypes.shape({
    cart_quantity: PropTypes.number,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }),
}.isRequired;
