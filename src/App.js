import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import { getCategories } from './services/api';

export default class App extends Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    this.setState({
      categories: await getCategories(),
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <Switch>
        <Route exact path="/" render={ () => <Home categories={ categories } /> } />
        <Route path="/cart" component={ ShoppingCart } />
      </Switch>
    );
  }
}
