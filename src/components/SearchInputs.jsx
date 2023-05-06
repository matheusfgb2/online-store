import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class SearchInputs extends Component {
  render() {
    const { searchInput,
      priceFilter,
      handleChangeSearch,
      handleClickSearch } = this.props;

    return (
      <div className="search-container">
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

        <select
          name="priceFilter"
          defaultValue={ priceFilter }
          onChange={ handleChangeSearch }
        >
          <option value="" disabled>(Ordenar por preço)</option>
          <option
            value="no-filter"
            disabled={ !priceFilter.length || priceFilter === 'no-filter' }
          >
            Sem ordenação

          </option>
          <option
            value="asc"
            disabled={ priceFilter === 'asc' }
          >
            Ordem ascendente

          </option>
          <option
            value="desc"
            disabled={ priceFilter === 'desc' }
          >
            Ordem descendente

          </option>
        </select>

      </div>
    );
  }
}

SearchInputs.propTypes = {
  handleChangeSearch: PropTypes.func,
  handleClickSearch: PropTypes.func,
  priceFilter: PropTypes.string,
  searchInput: PropTypes.string,
}.isRequired;
