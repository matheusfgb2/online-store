import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ProductCard from './ProductCard';

export default class ProductList extends Component {
  render() {
    const { isSearchListEmpty, prodList, loading } = this.props;
    const notEmptyProdList = prodList.length;
    return (
      <div>
        {isSearchListEmpty ? (
          <h3
            data-testid="home-initial-message"
            className="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        ) : (
          <div className="product-list-result">
            { notEmptyProdList ? (
              <div className="products-container">
                {loading ? <p className="loading-message">Carregando...</p> : (
                  <ul>
                    {prodList.map((product) => (
                      <ProductCard
                        key={ Math.random() }
                        isHomePageProduct
                        product={ product }
                      />
                    ))}
                  </ul>
                )}
              </div>
            ) : <h3 className="product-not-found">Nenhum produto foi encontrado</h3>}
          </div>
        )}

      </div>
    );
  }
}

ProductList.propTypes = {
  isSearchListEmpty: PropTypes.bool,
  loading: PropTypes.bool,
  prodList: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number,
      thumbnail: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
}.isRequired;
