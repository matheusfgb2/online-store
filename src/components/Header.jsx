import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default class Header extends Component {
  render() {
    const { isHome, isCart } = this.props;
    return (
      <div className="header-container">
        {isCart ? null : (
          <Link
            to="/cart"
            data-testid="shopping-cart-button"
          >
            Carrinho

          </Link>
        )}
        {isHome ? null : (<Link to="/">Página inicial</Link>)}
      </div>
    );
  }
}
Header.propTypes = {
  isHome: PropTypes.bool,
  isCart: PropTypes.bool,
};

Header.defaultProps = {
  isHome: false,
  isCart: false,
};
