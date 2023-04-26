import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import Categories from '../components/Categories';
import SearchInputs from '../components/SearchInputs';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  state = {
    isSearchListEmpty: true,
    prodList: [],
    searchInput: '',
  };

  handleChangeSearch = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClickSearch = async () => {
    const { searchInput } = this.state;
    this.setState({
      prodList: await getProductsFromCategoryAndQuery('', searchInput),
      isSearchListEmpty: false,
    });
  };

  render() {
    const { isSearchListEmpty, prodList, searchInput } = this.state;
    const { categories } = this.props;
    return (
      <div>
        <Header />
        <Categories categories={ categories } />
        <SearchInputs
          handleChangeSearch={ this.handleChangeSearch }
          handleClickSearch={ this.handleClickSearch }
          searchInput={ searchInput }
        />
        <ProductList isSearchListEmpty={ isSearchListEmpty } prodList={ prodList } />
      </div>
    );
  }
}

Home.propTypes = {
  categories: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
}.isRequired;
