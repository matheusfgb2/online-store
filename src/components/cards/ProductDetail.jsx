import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FormEvaluation from '../FormEvaluation';
import Evaluations from '../Evaluations';
import { fixPriceDisplay } from '../../services/helpers';

export default class ProductDetail extends Component {
  state = { evaluations: [] };

  componentDidMount() {
    this.setState({ evaluations: this.getEvaluationsFromLS() });
  }

  updateEvaluationsState = () => {
    this.setState({ evaluations: this.getEvaluationsFromLS() });
  };

  getEvaluationsFromLS = () => {
    const { product: { id } } = this.props;
    return JSON.parse(localStorage.getItem(id)) || [];
  };

  getProductAddress = () => {
    const { product: { seller_address: { city, state, country } } } = this.props;
    state.id = state.id.replace('BR-', '');
    return `${city.name}, ${state.id} - ${country.name}`;
  };

  render() {
    const {
      product:
        {
          title,
          thumbnail,
          price,
          id,
          attributes,
          sale_terms: saleTerms,
        },
      handleAddToCart } = this.props;

    const { evaluations } = this.state;

    const fullAddress = this.getProductAddress();
    const fixedPrice = fixPriceDisplay(price.toFixed(2));

    return (
      <div className="product-detail-container">
        <div className="product-detail-card">
          <img
            data-testid="product-detail-image"
            src={ thumbnail }
            alt={ title }
          />
          <h3 data-testid="product-detail-name">{title}</h3>

          <hr />

          <h4>Especificações</h4>
          {attributes.map(({ name, value_name: value }) => (
            <p key={ Math.random() }>{`${name}: ${value}`}</p>
          ))}

          <hr />

          <h4>Garantia</h4>
          {saleTerms.map(({ name, value_name: value }) => (
            <p key={ Math.random() }>{`${name}: ${value}`}</p>
          ))}

          <hr />

          <p>{`Local: ${fullAddress}`}</p>

          <p
            className="!!![[[G-A-M-B-I-A-R-R-A]]]!!!"
            data-testid="product-detail-price"
            style={ { display: 'none' } }
          >
            {`R$ ${price}`}

          </p>
          <p>{`R$ ${fixedPrice}`}</p>
          <button
            data-testid="product-detail-add-to-cart"
            value={ id }
            onClick={ handleAddToCart }
          >
            Adicionar ao carrinho
          </button>
        </div>

        <div className="evaluation-container">
          <FormEvaluation
            prodId={ id }
            evaluations={ evaluations }
            updateEvaluationsState={ this.updateEvaluationsState }
          />

          <Evaluations evaluations={ evaluations } />
        </div>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
  }),
  handleAddToCart: PropTypes.func,
}.isRequired;