import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ProductCard extends Component {
  render() {
    const { product, isHomePageProduct } = this.props;
    const { title, thumbnail, price, id } = product;
    if (isHomePageProduct) {
      return (
        <Link
          data-testid="product-detail-link"
          to={ `/products/${id}` }
        >
          <li
            data-testid="product"
            className="product-home-card"
          >
            <img
              src={ thumbnail }
              alt={ title }
            />
            <h3>{title}</h3>
            <p>{`R$${price}`}</p>
          </li>
        </Link>
      );
    }

    return (
      <div className="product-detail-card">
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ title }
        />
        <h3 data-testid="product-detail-name">{title}</h3>
        <p data-testid="product-detail-price">{`R$${price}`}</p>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
  }),
}.isRequired;

ProductCard.defaultProps = {
  isHomePageProduct: false,
};
