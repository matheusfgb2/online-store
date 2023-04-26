import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ProductCard from './ProductCard';

export default class ProductList extends Component {
  render() {
    const { isSearchListEmpty, prodList } = this.props;
    const notEmptyProdList = prodList.length;
    return (
      <div>
        {isSearchListEmpty ? (
          <h3
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        ) : (
          <div className="search-result">
            { notEmptyProdList ? (
              <ul>
                {prodList.map((product) => (
                  <ProductCard key={ Math.random() } product={ product } />
                ))}
              </ul>
            ) : <h3>Nenhum produto foi encontrado</h3>}
          </div>
        )}

      </div>
    );
  }
}

ProductList.propTypes = {
  isSearchListEmpty: PropTypes.func,
}.isRequired;
