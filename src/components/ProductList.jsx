import PropTypes from 'prop-types';
import React, { Component } from 'react';
import HomeProduct from './cards/HomeProduct';

export default class ProductList extends Component {
  render() {
    const { didSearch, prodList, handleAddToCart } = this.props;
    const emptyProdList = prodList === undefined || !prodList.length;
    return (
      <div>
        {didSearch ? (
          <div className="product-list-result">
            { emptyProdList ? (
              <h3 className="product-not-found">Nenhum produto foi encontrado</h3>
            ) : (
              <div className="products-container">
                {prodList.map((product) => (
                  <HomeProduct
                    key={ Math.random() }
                    product={ product }
                    handleAddToCart={ handleAddToCart }
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <h3
            data-testid="home-initial-message"
            className="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        )}

      </div>
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
