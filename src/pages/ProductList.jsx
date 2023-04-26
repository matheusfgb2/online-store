import React, { Component } from 'react';
import Header from '../components/Header';

export default class ProductList extends Component {
  state = {
    isSearchListEmpty: true,
  };

  render() {
    const { isSearchListEmpty } = this.state;
    return (
      <div>
        <Header />
        {isSearchListEmpty ? (
          <h3
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        ) : null}
      </div>
    );
  }
}
