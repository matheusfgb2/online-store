import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getProductById } from '../services/api';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Loading from '../components/Loading';

export default class ProductPage extends Component {
  state = {
    product: {},
    loading: true,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({
      product,
      loading: false,
    });
  }

  render() {
    const { product, loading } = this.state;

    if (loading) {
      return (<Loading />);
    }

    return (
      <div className="product-page">
        <Header />
        <ProductCard product={ product } />
      </div>
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
