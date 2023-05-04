import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class FormCheckout extends Component {
  state = {
    fullname: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
    isFormValidated: true,
  };

  changeCheckoutForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleValidateCheckoutForm = (e) => {
    e.preventDefault();
    const {
      fullname,
      email,
      cpf,
      phone,
      cep,
      address,
      payment,
    } = this.state;

    const emailRegex = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
    const cpfDigits = 11;
    const phoneMinDigits = 10;
    const cepDigits = 8;

    const validations = [
      !Number.isNaN(Number(cpf)),
      !Number.isNaN(Number(phone)),
      !Number.isNaN(Number(cep)),
      cpf.length === cpfDigits,
      phone.length >= phoneMinDigits,
      cep.length === cepDigits,
      fullname.length > 2,
      emailRegex.test(email),
      address.length > 2,
      payment.length > 0,
    ];

    const isFormValidated = validations.every((validation) => validation);
    this.setState({ isFormValidated }, () => (
      isFormValidated ? this.proceedToCheckout() : null
    ));
  };

  proceedToCheckout = () => {
    this.clearCartItemsFromLS();
    const { history, clearCartItemsState } = this.props;
    clearCartItemsState();
    history.push('/');
  };

  clearCartItemsFromLS = () => {
    localStorage.removeItem('cart-items');
  };

  render() {
    const {
      fullname,
      email,
      cpf,
      phone,
      cep,
      address,
      payment,
      isFormValidated,
    } = this.state;

    const paymentOptions = [
      ['Ticket', 'ticket-payment'],
      ['Visa', 'visa-payment'],
      ['MasterCard', 'master-payment'],
      ['Elo', 'elo-payment'],
    ];

    return (
      <form className="checkout-form">
        <input
          type="text"
          placeholder="Nome Completo"
          name="fullname"
          data-testid="checkout-fullname"
          value={ fullname }
          onChange={ this.changeCheckoutForm }
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          data-testid="checkout-email"
          value={ email }
          onChange={ this.changeCheckoutForm }
        />

        <input
          type="text"
          placeholder="CPF"
          name="cpf"
          data-testid="checkout-cpf"
          value={ cpf }
          onChange={ this.changeCheckoutForm }
        />

        <input
          type="text"
          placeholder="Telefone"
          name="phone"
          data-testid="checkout-phone"
          value={ phone }
          onChange={ this.changeCheckoutForm }
        />

        <input
          type="text"
          placeholder="CEP"
          name="cep"
          data-testid="checkout-cep"
          value={ cep }
          onChange={ this.changeCheckoutForm }
        />

        <input
          type="text"
          placeholder="Endereço"
          name="address"
          data-testid="checkout-address"
          value={ address }
          onChange={ this.changeCheckoutForm }
        />

        {paymentOptions.map(([paymentOption, id]) => (
          <label key={ id } htmlFor={ id } data-testid={ id }>
            <input
              type="radio"
              name="payment"
              id={ id }
              value={ paymentOption }
              checked={ payment === paymentOption }
              onChange={ this.changeCheckoutForm }
            />
            {paymentOption}
          </label>
        ))}

        <button
          data-testid="checkout-btn"
          onClick={ this.handleValidateCheckoutForm }
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

FormCheckout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  clearCartItemsState: PropTypes.func,
}.isRequired;
