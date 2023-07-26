import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './Categories.css';

export default class Categories extends Component {
  render() {
    const { categories, handleChangeCategory, category } = this.props;

    return (
      <div className="categories-container">
        <h3>Categorias</h3>
        <div className="categories">
          {categories.map(({ id, name }) => (
            <label
              data-testid="category"
              key={ Math.random() }
              htmlFor={ id }
            >
              <input
                type="radio"
                name="category"
                id={ id }
                value={ id }
                checked={ category === id }
                onChange={ handleChangeCategory }
              />
              {name}
            </label>
          ))}
        </div>
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  handleChangeCategory: PropTypes.func,
}.isRequired;
