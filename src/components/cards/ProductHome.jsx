import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fixPriceDisplay } from '../../services/helpers';

export default class ProductHome extends Component {
  state = {
    cartQuantity: null,
  };

  componentDidMount() {
    const cartItemsFromLS = JSON.parse(localStorage.getItem('cart-items'));
    let cartQuantity = 0;

    if (cartItemsFromLS) {
      const { product: { id } } = this.props;
      const prodInCart = cartItemsFromLS.find(({ id: prodId }) => prodId === id) || null;
      cartQuantity = prodInCart !== null ? prodInCart.cart_quantity : 0;
    }

    this.setState({ cartQuantity });
  }

  countAddToCart = () => {
    this.setState((prev) => ({
      cartQuantity: prev.cartQuantity + 1,
    }));
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
      },
      handleAddToCart } = this.props;
    const { free_shipping: freeShipping } = shipping;

    if (price !== null) {
      const fixedPrice = fixPriceDisplay(price);

      const { cartQuantity } = this.state;
      const remainingProds = availableQuantity - cartQuantity;

      return (
        <div className="product-home-card">
          <Link
            data-testid="product-detail-link"
            to={ `/products/${id}` }
          >
            <li
              data-testid="product"
            >
              <img
                src={ thumbnail }
                alt={ title }
              />
              <h3>{title}</h3>
              <p>
                {`${remainingProds} ${
                  availableQuantity > 1 ? 'restantes' : 'restante'}`}
              </p>
              <p>
                <span>{`R$ ${fixedPrice}`}</span>
                {freeShipping ? (
                  <span data-testid="free-shipping"> (Frete Grátis)</span>
                ) : null}
              </p>
            </li>
          </Link>
          <button
            data-testid="product-add-to-cart"
            value={ id }
            disabled={ availableQuantity === cartQuantity }
            onClick={ (e) => { handleAddToCart(e); this.countAddToCart(); } }
          >
            Adicionar ao carrinho
          </button>
        </div>
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
