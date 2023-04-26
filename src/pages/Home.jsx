import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import Categories from '../components/Categories';
import SearchInputs from '../components/SearchInputs';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  state = {
    isSearchListEmpty: true,
    categories: [],
    prodList: [],
    searchInput: '',
    categoryId: '',
    loading: false,
  };

  async componentDidMount() {
    this.setState({
      categories: await getCategories(),
    });
  }

  handleChangeSearch = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleChangeCategory = async ({ target }) => {
    const categoryId = target.value;
    this.setState({
      categoryId,
    });
    const { searchInput } = this.state;
    this.setState({ loading: true });
    const prodsData = await getProductsFromCategoryAndQuery(categoryId, searchInput);
    this.setState({
      prodList: prodsData.results,
      isSearchListEmpty: false,
      loading: false,
    });
  };

  handleClickSearch = async () => {
    const { searchInput, categoryId } = this.state;
    this.setState({ loading: true });
    const prodsData = await getProductsFromCategoryAndQuery(categoryId, searchInput);
    this.setState({
      prodList: prodsData.results,
      isSearchListEmpty: false,
      loading: false,
    });
  };

  render() {
    const {
      isSearchListEmpty,
      categories,
      prodList,
      searchInput,
      categoryId,
      loading,
    } = this.state;
    return (
      <div>
        <Header />
        <Categories
          categories={ categories }
          handleChangeCategory={ this.handleChangeCategory }
          category={ categoryId }
        />
        <SearchInputs
          handleChangeSearch={ this.handleChangeSearch }
          handleClickSearch={ this.handleClickSearch }
          searchInput={ searchInput }
        />
        <ProductList
          isSearchListEmpty={ isSearchListEmpty }
          prodList={ prodList }
          loading={ loading }
        />
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
