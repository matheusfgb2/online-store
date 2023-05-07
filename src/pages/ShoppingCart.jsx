import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import ProductCart from '../components/cards/ProductCart';

export default class ShoppingCart extends Component {
  render() {
    const { cartItems,
      cartTotalQuantity,
      handleChangeProdQuantity,
      removeCartItems } = this.props;
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
    id: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  })),
  cartTotalQuantity: PropTypes.number,
  handleChangeProdQuantity: PropTypes.func,
  removeCartItems: PropTypes.func,
}.isRequired;
