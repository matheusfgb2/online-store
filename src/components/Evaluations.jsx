import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Evaluation from './cards/Evaluation';

export default class Evaluations extends Component {
  render() {
    const { evaluations } = this.props;
    const haveEvaluations = evaluations.length > 0;

    return haveEvaluations ? (
      <div className="evaluations-container">
        <h2 className="evaluations-title">Avaliações:</h2>
        <ul className="evaluations-list">
          {evaluations.map((evaluation) => (
            <Evaluation key={ Math.random() } evaluation={ evaluation } />
          ))}
        </ul>
      </div>
    ) : (
      <h3 className="no-evaluations">Sem avaliações</h3>
    );
  }
}

Evaluations.propTypes = {
  evaluations: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string,
      text: PropTypes.string,
      rating: PropTypes.number,
    }),
  ),
}.isRequired;
