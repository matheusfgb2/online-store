import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getProductById } from '../services/api';
import ProductDetail from '../components/cards/ProductDetail';
import Header from '../components/Header';
import Loading from '../components/Loading';

export default class ProductPage extends Component {
  state = { product: {}, loading: true };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({ product, loading: false });
  }

  render() {
    const { product, loading } = this.state;
    const { cartItemsAmount, handleAddToCart } = this.props;

    if (loading) {
      return (<Loading />);
    }

    return (
      <div className="product-page">
        <Header cartItemsAmount={ cartItemsAmount } />
        <ProductDetail
          product={ product }
          handleAddToCart={ handleAddToCart }
        />
      </div>
    );
  }
}

ProductPage.propTypes = {
  cartItemsAmount: PropTypes.number,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  handleAddToCart: PropTypes.func,
}.isRequired;
