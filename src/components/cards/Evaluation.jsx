import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Evaluation extends Component {
  render() {
    const { evaluation: { email, text, rating } } = this.props;
    return (
      <li className="evaluation">
        <p data-testid="review-card-email">{email}</p>
        <p data-testid="review-card-rating">{text}</p>
        <p data-testid="review-card-evaluation">{rating}</p>
      </li>
    );
  }
}

Evaluation.propTypes = {
  evaluation: PropTypes.shape({
    email: PropTypes.string,
    text: PropTypes.string,
    rating: PropTypes.number,
  }),
}.isRequired;
