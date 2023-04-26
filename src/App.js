import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/cart" component={ ShoppingCart } />
    </Switch>
  );
}

export default App;
