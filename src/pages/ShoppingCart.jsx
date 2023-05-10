import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import ProductCart from '../components/cards/ProductCart';
import { fixPriceDisplay } from '../services/helpers';

export default class ShoppingCart extends Component {
  render() {
    const { cartItems,
      cartTotalQuantity,
      handleChangeProdQuantity,
      removeCartItems,
      cartTotalPrice } = this.props;

    const isCartEmpty = !cartItems.length;

    return (
      <div className="cart-page">
        <Header cartTotalQuantity={ cartTotalQuantity } />
        {isCartEmpty ? (
          <h3
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </h3>
        ) : (
          <div className="cart-products-container">
            <button onClick={ removeCartItems }>Limpar carrinho</button>
            {cartItems
              .map((product) => (<ProductCart
                key={ Math.random() }
                product={ product }
                handleChangeProdQuantity={ handleChangeProdQuantity }
              />))}
            <h3>{`Total: R$ ${fixPriceDisplay(cartTotalPrice)}`}</h3>
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
    available_quantity: PropTypes.number,
    cart_quantity: PropTypes.number,
    id: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
  cartTotalPrice: PropTypes.number.isRequired,
  cartTotalQuantity: PropTypes.number.isRequired,
  handleChangeProdQuantity: PropTypes.func.isRequired,
  removeCartItems: PropTypes.func.isRequired,
};
