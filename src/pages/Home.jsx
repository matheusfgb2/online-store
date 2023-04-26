import React, { Component } from 'react';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import Categories from '../components/Categories';

export default class Home extends Component {
  state = {
    isSearchListEmpty: true,
  };

  render() {
    const { isSearchListEmpty } = this.state;
    return (
      <div>
        <Header />
        <Categories />
        <ProductList isSearchListEmpty={ isSearchListEmpty } />
      </div>
    );
  }
}
