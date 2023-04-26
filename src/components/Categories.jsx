import React, { Component } from 'react';
import { getCategories } from '../services/api';

export default class Categories extends Component {
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
      <div>
        <h2>Categorias</h2>
        {categories.map(({ id, name }) => (
          <label
            key={ Math.random() }
            htmlFor={ id }
            data-testid="category"
          >
            <input type="radio" name="categories" id={ id } />
            {name}
          </label>
        ))}
      </div>
    );
  }
}
