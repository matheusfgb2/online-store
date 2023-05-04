import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import ProductCart from '../components/cards/ProductCart';

export default class ShoppingCart extends Component {
  render() {
    const { cartItems, handleChangeProdAmount } = this.props;
    const isCartEmpty = !cartItems.length;
    return (
      <div className="cart-page">
        <Header isCart />
        {isCartEmpty ? (
          <h3
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </h3>
        ) : (
          <div className="cart-products-container">
            {cartItems
              .map((product) => (<ProductCart
                key={ Math.random() }
                product={ product }
                handleChangeProdAmount={ handleChangeProdAmount }
              />))}

            <Link
              to="/checkout"
              data-testid="checkout-products"
            >
              Finalizar compra
            </Link>
          </div>
        )}

      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    cartAmount: PropTypes.number,
    id: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  })),
  handleChangeProdAmount: PropTypes.func,
}.isRequired;
