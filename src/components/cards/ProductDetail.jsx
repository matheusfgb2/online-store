import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FormEvaluation from '../FormEvaluation';
import Evaluations from '../Evaluations';
import { fixPriceDisplay } from '../../services/helpers';

export default class ProductDetail extends Component {
  state = {
    evaluations: [],
    itemCartQuantity: null,
  };

  componentDidMount() {
    const { getItemQuantityFromCart, product: { id } } = this.props;

    const evaluations = this.getEvaluationsFromLS();
    const itemCartQuantity = getItemQuantityFromCart(id);

    this.setState({ evaluations, itemCartQuantity });
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

  countAddToCart = () => {
    this.setState((prev) => ({
      itemCartQuantity: prev.itemCartQuantity + 1,
    }));
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
          available_quantity: availableQuantity,
          sale_terms: saleTerms,
          shipping: { free_shipping: freeShipping },
        },
      handleAddToCart } = this.props;
    const { evaluations, itemCartQuantity } = this.state;

    const fullAddress = this.getProductAddress();
    const fixedPrice = fixPriceDisplay(price);
    const remainingProds = availableQuantity - itemCartQuantity;

    return (
      <div className="product-detail-container">
        <div className="product-detail-card">
          <img
            data-testid="product-detail-image"
            src={ thumbnail }
            alt={ title }
          />
          <h2 data-testid="product-detail-name">{title}</h2>
          <h4>{`${remainingProds} ${remainingProds > 1 ? 'restantes' : 'restante'}`}</h4>
          <h3>{`Valor: R$ ${fixedPrice}`}</h3>
          {freeShipping ? (
            <p>Frete Grátis</p>
          ) : null}
          <hr />

          <h3>Especificações</h3>
          {attributes.map(({ name, value_name: value }) => (
            <p key={ Math.random() }>
              <b>{`${name}: `}</b>
              {value}
            </p>
          ))}

          <hr />

          <h3>Garantia</h3>
          {saleTerms.map(({ name, value_name: value }) => (
            <p key={ Math.random() }>
              <b>{`${name}: `}</b>
              {value}
            </p>
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

          <button
            data-testid="product-detail-add-to-cart"
            value={ id }
            disabled={ availableQuantity === itemCartQuantity }
            onClick={ (e) => { handleAddToCart(e); this.countAddToCart(); } }
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
