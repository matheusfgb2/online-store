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
      loading } = homeStates;

    if (loading) {
      return (<Loading />);
    }

    return (
      <div className="home-page">
        <Header isHome />
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
    categories: PropTypes.arrayOf(
      PropTypes.shape({

      }),
    ),
    categoryId: PropTypes.string,
    didSearch: PropTypes.bool,
    loading: PropTypes.bool,
    prodList: PropTypes.arrayOf(
      PropTypes.shape({

      }),
    ),
    searchInput: PropTypes.string,
  }),

  handleAddToCart: PropTypes.func,
  handleChangeCategory: PropTypes.func,
  handleChangeSearch: PropTypes.func,
  handleClickSearch: PropTypes.func,
}.isRequired;
