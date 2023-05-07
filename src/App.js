import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductPage from './pages/ProductPage';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
import Checkout from './pages/Checkout';

const CART_ITEMS = 'cart-items';
const CART_TOTAL_QUANTITY = 'cart-total-quantity';

export default class App extends Component {
  state = {
    cartItems: JSON.parse(localStorage.getItem(CART_ITEMS)) || [],
    categories: [],
    products: { prodList: [], backup: [] },
    categoryId: '',
    searchInput: '',
    priceFilter: '',
    didSearch: false,
    loading: false,
    cartTotalQuantity: localStorage.getItem(CART_TOTAL_QUANTITY) || 0,
  };

  async componentDidMount() {
    this.setState({ categories: await getCategories() });
  }

  saveCartItemsIntoLS = () => {
    const { cartItems } = this.state;
    localStorage.setItem(CART_ITEMS, JSON.stringify(cartItems));
    this.saveCartTotalQuantityIntoLS();
  };

  saveCartTotalQuantityIntoLS = () => {
    const { cartItems } = this.state;
    const cartTotalQuantity = cartItems
      .reduce((total, { cart_quantity: cartQuantity }) => total + cartQuantity, 0);

    localStorage.setItem(CART_TOTAL_QUANTITY, cartTotalQuantity);

    this.setState({ cartTotalQuantity });
  };

  removeCartItems = () => {
    localStorage.removeItem(CART_ITEMS);
    localStorage.removeItem(CART_TOTAL_QUANTITY);
    this.setState({ cartItems: [], cartTotalQuantity: 0 });
  };

  handleChangeSearch = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { products: { prodList } } = this.state;
      if (prodList.length && name === 'priceFilter') this.sortProdsByPrice();
    });
  };

  handleChangeCategory = async ({ target }) => {
    const categoryId = target.value;
    const { searchInput } = this.state;
    this.setState({ categoryId, loading: true });

    const prodsData = await getProductsFromCategoryAndQuery(categoryId, searchInput);
    const prodList = prodsData.results;
    this.setState({
      products: {
        prodList,
        backup: [...prodList],
      },
      didSearch: true,
      loading: false,
    }, this.sortProdsByPrice);
  };

  handleClickSearch = async () => {
    const { searchInput, categoryId } = this.state;
    this.setState({ loading: true });

    const prodsData = await getProductsFromCategoryAndQuery(categoryId, searchInput);
    const prodList = prodsData.results;
    this.setState({
      products: {
        prodList,
        backup: [...prodList],
      },
      didSearch: true,
      loading: false,
    }, this.sortProdsByPrice);
  };

  handleAddToCart = ({ target }) => {
    const prodId = target.value;
    const { products: { prodList }, cartItems } = this.state;
    const product = prodList.find(({ id }) => id === prodId);
    const sameProdInCart = cartItems.find(({ id }) => product.id === id);

    if (sameProdInCart) {
      sameProdInCart.cart_quantity += 1;
      this.saveCartItemsIntoLS();
    } else {
      product.cart_quantity = 1;
      this.setState((prev) => ({
        cartItems: [...prev.cartItems, product],
      }), this.saveCartItemsIntoLS);
    }
  };

  handleChangeProdQuantity = ({ target }) => {
    const { name: prodId, value } = target;
    let { cartItems } = this.state;

    if (value === 'X') {
      cartItems = cartItems.filter(({ id }) => id !== prodId);
    } else {
      const product = cartItems.find(({ id }) => prodId === id);

      if (value === '+') product.cart_quantity += 1;
      if (value === '-' && product.cart_quantity > 1) product.cart_quantity -= 1;
    }

    this.setState({ cartItems }, this.saveCartItemsIntoLS);
  };

  sortProdsByPrice = () => {
    const { priceFilter, products } = this.state;
    let { prodList } = products;

    switch (priceFilter) {
    case 'asc':
      prodList = prodList.sort(({ price: a }, { price: b }) => a - b);
      break;

    case 'desc':
      prodList = prodList.sort(({ price: a }, { price: b }) => b - a);
      break;

    case 'no-filter':
      prodList = [...products.backup];
      break;

    default:
      break;
    }

    this.setState((prev) => ({
      products: {
        ...prev.products,
        prodList,
      },
    }));
  };

  render() {
    const {
      cartItems,
      categories,
      products: { prodList },
      categoryId,
      searchInput,
      priceFilter,
      didSearch,
      loading,
      cartTotalQuantity } = this.state;

    const homeStates = {
      cartItems,
      categories,
      prodList,
      categoryId,
      searchInput,
      priceFilter,
      didSearch,
      loading,
      cartTotalQuantity };

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
              cartTotalQuantity={ cartTotalQuantity }
              handleChangeProdQuantity={ this.handleChangeProdQuantity }
              removeCartItems={ this.removeCartItems }
            />
          ) }
        />

        <Route
          path="/products/:id"
          render={ (props) => (
            <ProductPage
              { ...props }
              cartTotalQuantity={ cartTotalQuantity }
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
              cartTotalQuantity={ cartTotalQuantity }
              removeCartItems={ this.removeCartItems }
            />
          ) }
        />

      </Switch>
    );
  }
}
