import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fixPriceDisplay } from '../../services/helpers';

export default class ProductHome extends Component {
  render() {
    const {
      product: {
        title,
        thumbnail,
        price,
        id,
        shipping },
      handleAddToCart } = this.props;
    const { free_shipping: freeShipping } = shipping;

    const fixedPrice = fixPriceDisplay(price.toFixed(2));

    return (
      <div className="product-home-card">
        <Link
          data-testid="product-detail-link"
          to={ `/products/${id}` }
        >
          <li
            data-testid="product"
          >
            <img
              src={ thumbnail }
              alt={ title }
            />
            <h3>{title}</h3>
            <p>
              <span>{`R$ ${fixedPrice}`}</span>
              {freeShipping ? (
                <span data-testid="free-shipping"> (Frete Grátis)</span>
              ) : null}
            </p>
          </li>
        </Link>
        <button
          data-testid="product-add-to-cart"
          value={ id }
          onClick={ handleAddToCart }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductHome.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
  }),
  handleAddToCart: PropTypes.func,
}.isRequired;
