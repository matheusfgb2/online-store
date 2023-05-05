import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ProductHome extends Component {
  render() {
    const { product, handleAddToCart } = this.props;
    const { title, thumbnail, price, id } = product;

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
            <p>{`R$ ${price.toFixed(2)}`}</p>
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
