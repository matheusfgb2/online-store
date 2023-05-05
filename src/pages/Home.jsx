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
      handleAddToCart } = this.props;

    const {
      didSearch,
      categories,
      prodList,
      searchInput,
      categoryId,
      loading,
      cartItemsAmount } = homeStates;

    if (loading) {
      return (<Loading />);
    }

    return (
      <div className="home-page">
        <Header cartItemsAmount={ cartItemsAmount } />
        <Categories
          categories={ categories }
          handleChangeCategory={ handleChangeCategory }
          category={ categoryId }
        />
        <SearchInputs
          handleChangeSearch={ handleChangeSearch }
          handleClickSearch={ handleClickSearch }
          searchInput={ searchInput }
        />
        <ProductList
          didSearch={ didSearch }
          prodList={ prodList }
          handleAddToCart={ handleAddToCart }
        />
      </div>
    );
  }
}

Home.propTypes = {
  homeStates: PropTypes.shape({
    categories: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    cartItemsAmount: PropTypes.number,
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
    searchInput: PropTypes.string,
  }),

  handleAddToCart: PropTypes.func,
  handleChangeCategory: PropTypes.func,
  handleChangeSearch: PropTypes.func,
  handleClickSearch: PropTypes.func,
}.isRequired;
