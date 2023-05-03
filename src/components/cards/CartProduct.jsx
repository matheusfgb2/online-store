import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class ProductCartCard extends Component {
  render() {
    const { product } = this.props;
    const { title, thumbnail, price, cartAmount } = product;
    return (
      <div className="product-cart-card">
        <img
          src={ thumbnail }
          alt={ title }
        />
        <h3 data-testid="shopping-cart-product-name">{title}</h3>
        <p data-testid="product-detail-price">{`R$${price}`}</p>
        <p
          data-testid="shopping-cart-product-quantity"
        >
          {`Quantidade: ${cartAmount}`}
        </p>
      </div>
    );
  }
}

ProductCartCard.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
  }),
}.isRequired;
