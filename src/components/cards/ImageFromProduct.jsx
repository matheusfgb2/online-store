import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './ImageFromProduct.css';

export default class ImageFromProduct extends Component {
  state = {
    display: ', hidden',
  };

  hideOrShowModal = () => {
    this.setState((prev) => ({ display: prev.display === '' ? ', hidden' : '' }));
  };

  render() {
    const { id, url } = this.props;
    const { display } = this.state;
    return (
      <div className="product-image-container">
        <button className="no-style-btn" onClick={ this.hideOrShowModal }>
          <img
            data-testid="product-detail-image"
            src={ url }
            alt={ id }
            className="product-image"
          />
        </button>

        <button className="no-style-btn" onClick={ this.hideOrShowModal }>
          <div className={ `modal${display}` }>
            <span className="close">&times;</span>
            <img className="modal-img" src={ url } alt={ id } />
          </div>
        </button>
      </div>
    );
  }
}

ImageFromProduct.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
