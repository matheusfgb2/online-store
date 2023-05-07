import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fixPriceDisplay } from '../../services/helpers';

export default class ProductCart extends Component {
  render() {
    const { product, handleChangeProdQuantity } = this.props;

    const { title,
      thumbnail,
      price,
      id,
      cart_quantity: cartQuantity,
      available_quantity: availableQuantity,
    } = product;

    const prodFinalPrice = fixPriceDisplay(price * cartQuantity);

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
        <div className="product-quantity-container">
          <button
            data-testid="remove-product"
            name={ id }
            value="X"
            onClick={ handleChangeProdQuantity }
          >
            X
          </button>
          <button
            data-testid="product-decrease-quantity"
            disabled={ cartQuantity < 2 }
            name={ id }
            value="-"
            onClick={ handleChangeProdQuantity }
          >
            -
          </button>
          <p
            data-testid="shopping-cart-product-quantity"
          >
            {`Quantidade: ${cartQuantity}`}
          </p>
          <button
            data-testid="product-increase-quantity"
            disabled={ cartQuantity === availableQuantity }
            name={ id }
            value="+"
            onClick={ handleChangeProdQuantity }
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
    cartQuantity: PropTypes.number,
    id: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }),
  handleChangeProdQuantity: PropTypes.func,
}.isRequired;
