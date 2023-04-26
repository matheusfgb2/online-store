import React, { Component } from 'react';

export default class ProductList extends Component {
  render() {
    const { isSearchListEmpty } = this.props;
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
