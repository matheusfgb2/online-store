import React, { Component } from 'react';

export default class ProductList extends Component {
  state = {
    isSearchListEmpty: true,
  };

  render() {
    const { isSearchListEmpty } = this.state;
    return (
      <div>
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
