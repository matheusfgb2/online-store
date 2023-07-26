import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fixPriceDisplay } from '../../services/helpers';

import './ProductHome.css';

export default class ProductHome extends Component {
  state = {
    itemCartQuantity: null,
  };

  componentDidMount() {
    const { getItemQuantityFromCart } = this.props;
    const { product: { id } } = this.props;
    const itemCartQuantity = getItemQuantityFromCart(id);

    this.setState({ itemCartQuantity });
  }

  countAddToCart = () => {
    this.setState((prev) => ({
      itemCartQuantity: prev.itemCartQuantity + 1,
    }));
  };

  saveSellerName = () => {
    const { product: { id, seller: { nickname } } } = this.props;
    const sellers = JSON.parse(localStorage.getItem('sellers')) || {};

    sellers[nickname] = sellers[nickname] ? [...sellers[nickname], id] : [id];
    localStorage.setItem('sellers', JSON.stringify(sellers));
  };

  render() {
    const {
      product: {
        title,
        thumbnail,
        price,
        id,
        shipping,
        available_quantity: availableQuantity,
        seller: { nickname },
      },
      handleAddToCart } = this.props;
    const { free_shipping: freeShipping } = shipping;

    if (price !== null) {
      const fixedPrice = fixPriceDisplay(price);

      const { itemCartQuantity } = this.state;
      const remainingProds = availableQuantity - itemCartQuantity;
      return (
        <li
          data-testid="product"
          className="product-item"
        >
          <Link
            data-testid="product-detail-link"
            to={ `/products/${id}` }
            onClick={ this.saveSellerName }
          >
            <img
              src={ thumbnail }
              alt={ title }
            />
            <h3>{title}</h3>
            <h5>{nickname}</h5>
            <p>
              <span>{`R$ ${fixedPrice}`}</span>
              {freeShipping ? (
                <span data-testid="free-shipping"> (Frete Grátis)</span>
              ) : null}
            </p>
          </Link>
          <button
            data-testid="product-add-to-cart"
            value={ id }
            disabled={ availableQuantity === itemCartQuantity }
            onClick={ (e) => { handleAddToCart(e); this.countAddToCart(); } }
          >
            Adicionar ao carrinho
          </button>
          <p>
            {`${remainingProds} ${
              availableQuantity > 1 ? 'restantes' : 'restante'}`}
          </p>
        </li>
      );
    }
  }
}

ProductHome.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
  }),
  handleAddToCart: PropTypes.func,
}.isRequired;
