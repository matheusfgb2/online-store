import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductPage from './pages/ProductPage';
import Checkout from './pages/Checkout';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

const CART_ITEMS = 'cart-items';
const CART_TOTAL_QUANTITY = 'cart-total-quantity';
const NO_CATEGORY = 'no-category';

export default class App extends Component {
  state = {
    cartItems: JSON.parse(localStorage.getItem(CART_ITEMS)) || [],
    categories: [],
    products: { prodList: [], backup: [] },
    categoryId: NO_CATEGORY,
    query: '',
    priceFilter: '',
    didSearch: false,
    loading: false,
    cartTotalQuantity: Number(localStorage.getItem(CART_TOTAL_QUANTITY)) || 0,
    cartTotalPrice: 0,
  };

  async componentDidMount() {
    const noCategory = { id: NO_CATEGORY, name: 'Sem Categoria' };
    const categories = [...await getCategories(), noCategory];
    this.setState({ categories });
    this.getTotalCartPrice();
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

  getItemQuantityFromCart = (id) => {
    const { cartItems } = this.state;
    let cartQuantity = 0;
    if (cartItems.length) {
      const prodInCart = cartItems.find(({ id: prodId }) => prodId === id) || null;
      cartQuantity = prodInCart !== null ? prodInCart.cart_quantity : 0;
    }
    return cartQuantity;
  };

  getTotalCartPrice = () => {
    const { cartItems } = this.state;
    const cartTotalPrice = cartItems
      .reduce((acc, { price, cart_quantity: amount }) => acc + (price * amount), 0);

    this.setState({ cartTotalPrice });
  };

  removeCartItems = () => {
    localStorage.removeItem(CART_ITEMS);
    localStorage.removeItem(CART_TOTAL_QUANTITY);
    localStorage.removeItem('sellers');
    this.setState({ cartItems: [], cartTotalQuantity: 0, cartTotalPrice: 0 });
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
    const { query } = this.state;
    this.setState({ categoryId, loading: true });
    const prodsData = await getProductsFromCategoryAndQuery(categoryId, query);
    const prodList = prodsData.results;
    this.setState({
      products: { prodList, backup: [...prodList] },
      didSearch: !(categoryId === NO_CATEGORY && !query.length),
      loading: false,
    }, this.sortProdsByPrice);
  };

  handleClickSearch = async () => {
    const { query, categoryId } = this.state;
    this.setState({ loading: true });
    const prodsData = await getProductsFromCategoryAndQuery(categoryId, query);
    const prodList = prodsData.results;
    this.setState({
      products: { prodList, backup: [...prodList] },
      didSearch: true,
      loading: false,
    }, this.sortProdsByPrice);
  };

  handleAddToCart = ({ target }) => {
    const prodId = target.value;
    const { products: { prodList }, cartItems } = this.state;
    const prodListCopy = [...prodList];
    const cartItemsCopy = [...cartItems];
    const product = prodListCopy.find(({ id }) => id === prodId);
    const sameProdInCart = cartItemsCopy.find(({ id }) => product.id === id);

    if (sameProdInCart) {
      sameProdInCart.cart_quantity += 1;
      this.setState({ cartItems: cartItemsCopy }, () => {
        this.saveCartItemsIntoLS();
        this.getTotalCartPrice();
      });
    } else {
      product.cart_quantity = 1;
      this.setState((prev) => ({
        cartItems: [...prev.cartItems, product],
      }), () => { this.saveCartItemsIntoLS(); this.getTotalCartPrice(); });
    }
  };

  handleChangeProdQuantity = ({ target }) => {
    const { name: prodId, value } = target;
    const { cartItems } = this.state;
    let cartItemsCopy = [...cartItems];

    if (value === 'X') {
      cartItemsCopy = cartItemsCopy.filter(({ id }) => id !== prodId);
    } else {
      const product = cartItemsCopy.find(({ id }) => prodId === id);
      if (value === '+') product.cart_quantity += 1;
      if (value === '-' && product.cart_quantity > 1) product.cart_quantity -= 1;
    }
    this.setState({ cartItems: cartItemsCopy }, () => {
      this.saveCartItemsIntoLS();
      this.getTotalCartPrice();
    });
  };

  sortProdsByPrice = () => {
    const { priceFilter, products } = this.state;
    let prodListCopy = [...products.prodList];

    switch (priceFilter) {
    case 'asc':
      prodListCopy = prodListCopy.sort(({ price: a }, { price: b }) => a - b);
      break;
    case 'desc':
      prodListCopy = prodListCopy.sort(({ price: a }, { price: b }) => b - a);
      break;
    case 'no-filter':
      prodListCopy = [...products.backup];
      break;
    default: break;
    }

    this.setState((prev) => ({
      products: { ...prev.products, prodList: prodListCopy },
    }));
  };

  render() {
    const {
      cartItems,
      categories,
      products: { prodList },
      categoryId,
      query,
      priceFilter,
      didSearch,
      loading,
      cartTotalQuantity,
      cartTotalPrice } = this.state;
    const homeStates = {
      cartItems,
      categories,
      prodList,
      categoryId,
      query,
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
              getItemQuantityFromCart={ this.getItemQuantityFromCart }
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
              cartTotalPrice={ cartTotalPrice }
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
              getItemQuantityFromCart={ this.getItemQuantityFromCart }
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
              cartTotalPrice={ cartTotalPrice }
            />
          ) }
        />
      </Switch>
    );
  }
}
