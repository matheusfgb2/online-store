import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class ProductCartCard extends Component {
  render() {
    const { product, handleChangeProdAmount } = this.props;
    const { title, thumbnail, price, cartAmount, id } = product;
    return (
      <div className="product-cart-card">
        <img
          src={ thumbnail }
          alt={ title }
        />
        <h3 data-testid="shopping-cart-product-name">{title}</h3>
        <p data-testid="product-detail-price">{`R$${price}`}</p>
        <button
          data-testid="remove-product"
          name={ id }
          value="X"
          onClick={ handleChangeProdAmount }
        >
          X

        </button>
        <button
          data-testid="product-decrease-quantity"
          name={ id }
          value="-"
          onClick={ handleChangeProdAmount }
        >
          -

        </button>
        <p
          data-testid="shopping-cart-product-quantity"
        >
          {`Quantidade: ${cartAmount}`}
        </p>
        <button
          data-testid="product-increase-quantity"
          name={ id }
          value="+"
          onClick={ handleChangeProdAmount }
        >
          +

        </button>
      </div>
    );
  }
}

ProductCartCard.propTypes = {
  product: PropTypes.shape({
    cartAmount: PropTypes.number,
    id: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }),
  handleChangeProdAmount: PropTypes.func,
}.isRequired;
