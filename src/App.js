import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ ProductList } />
      <Route path="/cart" component={ ShoppingCart } />
    </Switch>
  );
}

export default App;
