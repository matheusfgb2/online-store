import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ProductCard extends Component {
  render() {
    const { product, isHomePageProduct, handleAddToCart, amount } = this.props;
    const { title, thumbnail, price, id } = product;

    if (isHomePageProduct) {
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
              <p>{`R$${price}`}</p>
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
    return (
      <div className="product-detail-card">
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ title }
        />
        {amount ? (
          <>
            <h3 data-testid="shopping-cart-product-name">{title}</h3>
            <p
              data-testid="shopping-cart-product-quantity"
            >
              {`Quantidade: ${amount}`}
            </p>
          </>
        ) : <h3 data-testid="product-detail-name">{title}</h3>}
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
