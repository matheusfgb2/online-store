import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class FormEvaluation extends Component {
  state = {
    email: '',
    text: '',
    rating: 0,
    isFormValidated: true,
  };

  generateRatingNumbers = (lastRatingNumber) => {
    let ratings = [];
    for (let index = 1; index <= lastRatingNumber; index += 1) {
      ratings = [...ratings, index];
    }
    return ratings;
  };

  handleChangeEvalForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: Number(value) ? Number(value) : value });
  };

  handleValidateEvalForm = (e) => {
    e.preventDefault();
    const { email, rating } = this.state;

    const emailRegex = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
    const validations = [emailRegex.test(email), rating > 0];

    const isFormValidated = validations.every((validation) => validation);
    this.setState({ isFormValidated }, () => (
      isFormValidated ? this.saveEvalForm() : null
    ));
  };

  saveEvalForm = () => {
    const { email, text, rating } = this.state;
    const { prodId, updateEvaluationsState } = this.props;
    const form = { email, text, rating };
    this.saveEvalFormIntoLS(prodId, form);
    this.setState({ email: '', text: '', rating: 0 });
    updateEvaluationsState();
  };

  saveEvalFormIntoLS = (prodId, form) => {
    const { evaluations } = this.props;
    if (evaluations !== []) {
      form = [...evaluations, form];
      localStorage.setItem(prodId, JSON.stringify(form));
    } else {
      localStorage.setItem(prodId, JSON.stringify([form]));
    }
  };

  render() {
    const lastRatingNumber = 5;
    const radioButtons = this.generateRatingNumbers(lastRatingNumber);

    const { email, text, rating, isFormValidated } = this.state;

    return (
      <form className="evaluation-form">

        <input
          type="email"
          placeholder="Email"
          name="email"
          data-testid="product-detail-email"
          value={ email }
          onChange={ this.handleChangeEvalForm }
        />

        {radioButtons.map((currRating) => (
          <label
            key={ `${currRating}-${Math.random()}` }
            htmlFor={ `${currRating}-rating` }
            data-testid={ `${currRating}-rating` }
          >
            <input
              type="radio"
              name="rating"
              id={ `${currRating}-rating` }
              value={ currRating }
              checked={ currRating === rating }
              onChange={ this.handleChangeEvalForm }
            />
            {currRating}
          </label>
        ))}

        <textarea
          placeholder="Mensagem (opcional)"
          name="text"
          cols="50"
          rows="5"
          data-testid="product-detail-evaluation"
          value={ text }
          onChange={ this.handleChangeEvalForm }
        />

        <button
          data-testid="submit-review-btn"
          onClick={ this.handleValidateEvalForm }
        >
          Enviar
        </button>

        {isFormValidated ? null : (
          <h2 data-testid="error-msg">Campos inválidos</h2>
        )}

      </form>
    );
  }
}

FormEvaluation.propTypes = {
  updateEvaluationsState: PropTypes.func,
  prodId: PropTypes.string,
}.isRequired;
