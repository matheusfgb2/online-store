import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductPage from './pages/ProductPage';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
import Checkout from './pages/Checkout';

export default class App extends Component {
  state = {
    cartItems: JSON.parse(localStorage.getItem('cart-items')) || [],
    categories: [],
    prodList: [],
    categoryId: '',
    searchInput: '',
    didSearch: false,
    loading: false,
  };

  async componentDidMount() {
    this.setState({ categories: await getCategories() });
  }

  saveCartItemsToLS = () => {
    const { cartItems } = this.state;
    localStorage.setItem('cart-items', JSON.stringify(cartItems));
  };

  handleChangeSearch = ({ target }) => {
    const searchInput = target.value;
    this.setState({ searchInput });
  };

  handleChangeCategory = async ({ target }) => {
    const categoryId = target.value;
    const { searchInput } = this.state;
    this.setState({ categoryId, loading: true });

    const prodsData = await getProductsFromCategoryAndQuery(categoryId, searchInput);
    const prodList = prodsData.results;
    this.setState({ prodList, didSearch: true, loading: false });
  };

  handleClickSearch = async () => {
    const { searchInput, categoryId } = this.state;
    this.setState({ loading: true });
    const prodsData = await getProductsFromCategoryAndQuery(categoryId, searchInput);
    const prodList = prodsData.results;
    this.setState({ prodList, didSearch: true, loading: false });
  };

  handleAddToCart = ({ target }) => {
    const prodId = target.value;
    const { prodList, cartItems } = this.state;
    const product = prodList.find(({ id }) => id === prodId);
    const sameProdInCart = cartItems.find(({ id }) => product.id === id);

    if (sameProdInCart) {
      sameProdInCart.cartAmount += 1;
      this.saveCartItemsToLS();
    } else {
      product.cartAmount = 1;
      this.setState((prev) => ({
        cartItems: [...prev.cartItems, product],
      }), this.saveCartItemsToLS);
    }
  };

  handleChangeProdAmount = ({ target }) => {
    const { name: prodId, value } = target;
    let { cartItems } = this.state;

    if (value === 'X') {
      cartItems = cartItems.filter(({ id }) => id !== prodId);
    } else {
      const product = cartItems.find(({ id }) => prodId === id);

      if (value === '+') product.cartAmount += 1;
      if (value === '-' && product.cartAmount > 1) product.cartAmount -= 1;
    }

    this.setState({ cartItems }, this.saveCartItemsToLS);
  };

  clearCartItemsState = () => {
    this.setState({ cartItems: [] });
  };

  render() {
    const {
      cartItems,
      categories,
      prodList,
      categoryId,
      searchInput,
      didSearch,
      loading } = this.state;

    const homeStates = {
      cartItems,
      categories,
      prodList,
      categoryId,
      searchInput,
      didSearch,
      loading };

    return (
      <Switch>

        <Route
          exact
          path="/"
          render={ () => (
            <Home
              homeStates={ homeStates }
              handleChangeCategory={ this.handleChangeCategory }
              handleChangeSearch={ this.handleChangeSearch }
              handleClickSearch={ this.handleClickSearch }
              handleAddToCart={ this.handleAddToCart }
            />
          ) }
        />

        <Route
          path="/cart"
          render={ () => (
            <ShoppingCart
              cartItems={ cartItems }
              handleChangeProdAmount={ this.handleChangeProdAmount }
            />
          ) }
        />

        <Route
          path="/products/:id"
          render={ (props) => (
            <ProductPage
              { ...props }
              handleAddToCart={ this.handleAddToCart }
            />
          ) }
        />

        <Route
          path="/checkout"
          render={ (props) => (
            <Checkout
              { ...props }
              cartItems={ cartItems }
              clearCartItemsState={ this.clearCartItemsState }
            />
          ) }
        />

      </Switch>
    );
  }
}
