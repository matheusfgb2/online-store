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
    priceFilter: '',
    didSearch: false,
    loading: false,
    cartItemsAmount: localStorage.getItem('cart-amount') || 0,
  };

  async componentDidMount() {
    this.setState({ categories: await getCategories() });
  }

  saveCartItemsIntoLS = () => {
    const { cartItems } = this.state;
    localStorage.setItem('cart-items', JSON.stringify(cartItems));
    this.saveCartItemsAmountIntoLS();
  };

  saveCartItemsAmountIntoLS = () => {
    const { cartItems } = this.state;
    const cartItemsAmount = cartItems
      .reduce((total, { cartAmount }) => total + cartAmount, 0);

    localStorage.setItem('cart-amount', cartItemsAmount);

    this.setState({ cartItemsAmount });
  };

  handleChangeSearch = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { prodList } = this.state;
      if (prodList.length && name === 'priceFilter') this.sortProdsByPrice(prodList);
    });
  };

  handleChangeCategory = async ({ target }) => {
    const categoryId = target.value;
    const { searchInput } = this.state;
    this.setState({ categoryId, loading: true });

    const prodsData = await getProductsFromCategoryAndQuery(categoryId, searchInput);
    const prodList = prodsData.results;
    this.sortProdsByPrice(prodList);
    this.setState({ didSearch: true, loading: false });
  };

  handleClickSearch = async () => {
    const { searchInput, categoryId } = this.state;
    this.setState({ loading: true });

    const prodsData = await getProductsFromCategoryAndQuery(categoryId, searchInput);
    const prodList = prodsData.results;
    this.sortProdsByPrice(prodList);
    this.setState({ didSearch: true, loading: false });
  };

  handleAddToCart = ({ target }) => {
    const prodId = target.value;
    const { prodList, cartItems } = this.state;
    const product = prodList.find(({ id }) => id === prodId);
    const sameProdInCart = cartItems.find(({ id }) => product.id === id);

    if (sameProdInCart) {
      sameProdInCart.cartAmount += 1;
      this.saveCartItemsIntoLS();
    } else {
      product.cartAmount = 1;
      this.setState((prev) => ({
        cartItems: [...prev.cartItems, product],
      }), this.saveCartItemsIntoLS);
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

    this.setState({ cartItems }, this.saveCartItemsIntoLS);
  };

  clearCartItemsState = () => {
    this.setState({ cartItems: [] });
  };

  sortProdsByPrice = (prodList) => {
    const { priceFilter } = this.state;
    if (['asc', 'desc'].includes(priceFilter)) {
      if (priceFilter === 'asc') {
        prodList = prodList.sort(({ price: a }, { price: b }) => a - b);
      } else {
        prodList = prodList.sort(({ price: a }, { price: b }) => b - a);
      }
    } else {
      prodList = prodList.sort(({ id: a }, { id: b }) => a.localeCompare(b));
    }
    this.setState({ prodList });
  };

  render() {
    const {
      cartItems,
      categories,
      prodList,
      categoryId,
      searchInput,
      priceFilter,
      didSearch,
      loading,
      cartItemsAmount } = this.state;

    const homeStates = {
      cartItems,
      categories,
      prodList,
      categoryId,
      searchInput,
      priceFilter,
      didSearch,
      loading,
      cartItemsAmount };

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
              cartItemsAmount={ cartItemsAmount }
              handleChangeProdAmount={ this.handleChangeProdAmount }
            />
          ) }
        />

        <Route
          path="/products/:id"
          render={ (props) => (
            <ProductPage
              { ...props }
              cartItemsAmount={ cartItemsAmount }
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
              cartItemsAmount={ cartItemsAmount }
              clearCartItemsState={ this.clearCartItemsState }
            />
          ) }
        />

      </Switch>
    );
  }
}
