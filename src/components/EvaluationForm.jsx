import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class EvaluationForm extends Component {
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

  handleChangeForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: Number(value) ? Number(value) : value });
  };

  handleValidateForm = (e) => {
    e.preventDefault();
    const { email, rating } = this.state;

    const emailRegex = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
    const validations = [emailRegex.test(email), rating > 0];

    const isFormValidated = validations.every((validation) => validation === true);
    this.setState({ isFormValidated }, () => (isFormValidated ? this.saveForm() : null));
  };

  saveForm = () => {
    const { email, text, rating } = this.state;
    const { prodId, updateFormsState } = this.props;
    const form = { email, text, rating };
    this.saveFormIntoLS(prodId, form);
    this.setState({ email: '', text: '', rating: 0 });
    updateFormsState();
  };

  saveFormIntoLS = (prodId, form) => {
    const { getFormsFromLS } = this.props;
    const prevForms = getFormsFromLS();
    if (prevForms !== []) {
      form = [...prevForms, form];
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
          onChange={ this.handleChangeForm }
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
              onChange={ this.handleChangeForm }
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
          onChange={ this.handleChangeForm }
        />

        <button
          data-testid="submit-review-btn"
          onClick={ this.handleValidateForm }
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

EvaluationForm.propTypes = {
  getFormsFromLS: PropTypes.func,
  updateFormsState: PropTypes.func,
  prodId: PropTypes.string,
}.isRequired;
