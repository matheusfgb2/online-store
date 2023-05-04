import PropTypes from 'prop-types';
import React, { Component } from 'react';
import EvaluationForm from '../EvaluationForm';
import Evaluations from '../Evaluations';

export default class DetailedProduct extends Component {
  state = {
    forms: [],
  };

  componentDidMount() {
    this.setState({ forms: this.getFormsFromLS() });
  }

  getFormsFromLS = () => {
    const { product: { id } } = this.props;
    return JSON.parse(localStorage.getItem(id)) || [];
  };

  updateFormsState = () => {
    this.setState({ forms: this.getFormsFromLS() });
  };

  render() {
    const {
      product:
        {
          title,
          thumbnail,
          price,
          id,
        },
      handleAddToCart } = this.props;

    const { forms: evaluations } = this.state;

    return (
      <>
        <div className="product-detail-card">
          <img
            data-testid="product-detail-image"
            src={ thumbnail }
            alt={ title }
          />
          <h3 data-testid="product-detail-name">{title}</h3>
          <p data-testid="product-detail-price">{`R$${price}`}</p>
          <button
            data-testid="product-detail-add-to-cart"
            value={ id }
            onClick={ handleAddToCart }
          >
            Adicionar ao carrinho
          </button>
        </div>
        <div className="evaluation-container">
          <EvaluationForm
            prodId={ id }
            getFormsFromLS={ this.getFormsFromLS }
            updateFormsState={ this.updateFormsState }
          />

          <Evaluations evaluations={ evaluations } />
        </div>
      </>
    );
  }
}

DetailedProduct.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
  }),
  handleAddToCart: PropTypes.func,
}.isRequired;
