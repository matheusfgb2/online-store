import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import Categories from '../components/Categories';
import SearchInputs from '../components/SearchInputs';
import Loading from '../components/Loading';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  state = {
    isSearchListEmpty: true,
    categories: [],
    prodList: [],
    searchInput: '',
    categoryId: '',
    loading: true,
  };

  async componentDidMount() {
    this.setState({
      categories: await getCategories(),
      loading: false,
    });
  }

  handleChangeSearch = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleChangeCategory = async ({ target }) => {
    const categoryId = target.value;
    const { searchInput } = this.state;
    this.setState({
      categoryId,
      loading: true,
    });
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

  handleAddToCart = ({ target }) => {
    const prodId = target.value;
    const { prodList } = this.state;
    const currCartLS = JSON.parse(localStorage.getItem('cart-items')) || [];
    const cartProduct = prodList.find(({ id }) => id === prodId);
    const cartProducts = [...currCartLS, cartProduct];
    localStorage.setItem('cart-items', JSON.stringify(cartProducts));
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

    if (loading) {
      return (<Loading />);
    }

    return (
      <div className="home-page">
        <Header isHome />
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
          handleAddToCart={ this.handleAddToCart }
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
