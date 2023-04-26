import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Categories extends Component {
  render() {
    const { categories } = this.props;
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

Categories.propTypes = {
  categories: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
}.isRequired;
