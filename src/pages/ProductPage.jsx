import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getProductById } from '../services/api';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';

export default class ProductPage extends Component {
  state = {
    product: {},
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({
      product,
    });
  }

  render() {
    const { product } = this.state;
    console.log(product);
    return (
      <>
        <Header />
        <ProductCard product={ product } />
      </>
    );
  }
}

ProductPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
