import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class DetailedProduct extends Component {
  render() {
    const { product, handleAddToCart } = this.props;
    const { title, thumbnail, price, id } = product;
    console.log(id);

    return (
      <div className="product-detail-card">
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ title }
        />
        <h3 data-testid="product-detail-name">{title}</h3>
        <p data-testid="product-detail-price">{`R$${price}`}</p>
        <button
          data-testid="product-detail-add-to-cart"
          value={ id }
          onClick={ handleAddToCart }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

DetailedProduct.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
  }),
  handleAddToCart: PropTypes.func,
}.isRequired;
