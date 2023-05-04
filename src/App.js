import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductPage from './pages/ProductPage';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

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
    this.setState({
      categories: await getCategories(),
    });
  }

  saveCartItemsToLS = () => {
    const { cartItems } = this.state;
    localStorage.setItem('cart-items', JSON.stringify(cartItems));
  };

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
      didSearch: true,
      loading: false,
    });
  };

  handleClickSearch = async () => {
    const { searchInput, categoryId } = this.state;
    this.setState({ loading: true });
    const prodsData = await getProductsFromCategoryAndQuery(categoryId, searchInput);
    this.setState({
      prodList: prodsData.results,
      didSearch: true,
      loading: false,
    });
  };

  handleAddToCart = ({ target }) => {
    const prodId = target.value;
    const { prodList, cartItems } = this.state;
    console.log(prodId);
    const currProduct = prodList.find(({ id }) => id === prodId);
    const equalCartProduct = cartItems.find(({ id }) => currProduct.id === id);

    if (equalCartProduct) {
      equalCartProduct.cartAmount += 1;
      this.saveCartItemsToLS();
    } else {
      currProduct.cartAmount = 1;
      this.setState((prev) => ({
        cartItems: [...prev.cartItems, currProduct],
      }), this.saveCartItemsToLS);
    }
  };

  handleChangeProdAmount = ({ target }) => {
    const { name: prodId, value } = target;
    const { cartItems } = this.state;

    if (value === 'X') {
      const cartItemsWithoutItem = cartItems.filter(({ id }) => id !== prodId);

      this.setState({ cartItems: cartItemsWithoutItem }, this.saveCartItemsToLS);
    } else {
      const item = cartItems.find(({ id }) => prodId === id);
      if (value === '+') item.cartAmount += 1;
      if (value === '-' && item.cartAmount > 1) item.cartAmount -= 1;

      this.setState({ cartItems }, this.saveCartItemsToLS);
    }
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
          render={ () => (<ShoppingCart
            cartItems={ cartItems }
            handleChangeProdAmount={ this.handleChangeProdAmount }
          />) }
        />
        <Route
          path="/products/:id"
          render={ (props) => (<ProductPage
            { ...props }
            handleAddToCart={ this.handleAddToCart }
          />) }
        />
      </Switch>
    );
  }
}
