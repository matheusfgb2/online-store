import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class SearchInputs extends Component {
  render() {
    const { handleChangeSearch, handleClickSearch, searchInput } = this.props;
    return (
      <div>
        <input
          data-testid="query-input"
          type="text"
          name="searchInput"
          value={ searchInput }
          placeholder="Digite o produto"
          onChange={ handleChangeSearch }
        />
        <button
          data-testid="query-button"
          onClick={ handleClickSearch }
        >
          Procurar
        </button>
      </div>
    );
  }
}

SearchInputs.propTypes = {
  handleChangeSearch: PropTypes.func,
  handleClickSearch: PropTypes.func,
}.isRequired;
