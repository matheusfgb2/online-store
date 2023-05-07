import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ProductHome from './cards/ProductHome';

export default class ProductList extends Component {
  render() {
    const { didSearch, prodList, handleAddToCart } = this.props;
    const emptyProdList = prodList === undefined || !prodList.length;
    return (

      didSearch ? (
        <div className="product-list-container">
          { emptyProdList ? (
            <h4 className="product-not-found">Nenhum produto foi encontrado</h4>
          ) : (
            <ul className="product-list">
              {prodList.map((product) => (
                <ProductHome
                  key={ Math.random() }
                  product={ product }
                  handleAddToCart={ handleAddToCart }
                />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <h4
          data-testid="home-initial-message"
          className="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h4>
      )

    );
  }
}

ProductList.propTypes = {
  didSearch: PropTypes.bool,
  prodList: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number,
      thumbnail: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
  handleAddToCart: PropTypes.func,
}.isRequired;
