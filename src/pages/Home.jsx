import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import Categories from '../components/Categories';
import SearchInputs from '../components/SearchInputs';
import Loading from '../components/Loading';

export default class Home extends Component {
  render() {
    const { homeStates,
      handleChangeCategory,
      handleChangeSearch,
      handleClickSearch,
      handleAddToCart,
      getItemQuantityFromCart } = this.props;

    const {
      didSearch,
      categories,
      prodList,
      query,
      priceFilter,
      categoryId,
      loading,
      cartTotalQuantity } = homeStates;

    return (
      <div className="home-page">
        <Header cartTotalQuantity={ cartTotalQuantity } />
        <Categories
          categories={ categories }
          handleChangeCategory={ handleChangeCategory }
          category={ categoryId }
        />
        <SearchInputs
          handleChangeSearch={ handleChangeSearch }
          handleClickSearch={ handleClickSearch }
          query={ query }
          priceFilter={ priceFilter }
        />
        {loading ? (<Loading />) : (
          <ProductList
            didSearch={ didSearch }
            prodList={ prodList }
            handleAddToCart={ handleAddToCart }
            getItemQuantityFromCart={ getItemQuantityFromCart }
          />
        )}
      </div>
    );
  }
}

Home.propTypes = {
  homeStates: PropTypes.shape({
    categories: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      priceFilter: PropTypes.string,
      query: PropTypes.string,
    }),
    cartTotalQuantity: PropTypes.number,
    categoryId: PropTypes.string,
    didSearch: PropTypes.bool,
    loading: PropTypes.bool,
    prodList: PropTypes.arrayOf(
      PropTypes.shape({
        price: PropTypes.number,
        thumbnail: PropTypes.string,
        title: PropTypes.string,
      }),
    ),
  }),

  handleAddToCart: PropTypes.func,
  handleChangeCategory: PropTypes.func,
  handleChangeSearch: PropTypes.func,
  handleClickSearch: PropTypes.func,
}.isRequired;
