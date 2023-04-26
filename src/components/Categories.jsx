import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Categories extends Component {
  render() {
    const { categories } = this.props;
    return (
      <div className="categories-container">
        <h2>Categorias</h2>
        {categories.map(({ id, name }) => (
          <label
            data-testid="category"
            key={ Math.random() }
            htmlFor={ id }
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
