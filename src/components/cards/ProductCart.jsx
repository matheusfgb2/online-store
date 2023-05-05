import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fixPriceDisplay } from '../../services/helpers';

export default class ProductCart extends Component {
  render() {
    const { product, handleChangeProdAmount } = this.props;
    const { title, thumbnail, price, cartAmount, id } = product;

    const prodFinalPrice = fixPriceDisplay((price * cartAmount).toFixed(2));
    return (
      <div className="product-cart-card">
        <Link to={ `/products/${id}` }>
          <img
            src={ thumbnail }
            alt={ title }
          />
          <h3 data-testid="shopping-cart-product-name">{title}</h3>
          <p
            data-testid="product-detail-price"
          >
            {`R$ ${prodFinalPrice}`}
          </p>
        </Link>
        <div className="product-amount-container">
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
            disabled={ cartAmount < 2 }
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
      </div>
    );
  }
}

ProductCart.propTypes = {
  product: PropTypes.shape({
    cartAmount: PropTypes.number,
    id: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }),
  handleChangeProdAmount: PropTypes.func,
}.isRequired;
