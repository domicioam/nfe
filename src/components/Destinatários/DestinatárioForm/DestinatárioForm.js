import React, { Component } from 'react';

import './DestinatárioForm.css';
import Endereço from '../../Shared/Endereço/Endereço';

class DestinatárioForm extends Component {
  render() {
    return (
      <form>
        <h6>Identificação</h6>
        <fieldset className="form-group">
          <div className="form-check-inline">
            <input className="form-check-input" type="radio" name="TipoDestinatário" value="PessoaFísica" />
            <label className="form-check-label">Pessoa Física</label>
          </div>
          <div className="form-check-inline">
            <input className="form-check-input" type="radio" name="TipoDestinatário" value="PessoaJudídica" />
            <label className="form-check-label">Pessoa Jurídica</label>
          </div>
          <div className="form-check-inline">
            <input className="form-check-input" type="radio" name="TipoDestinatário" value="Estrangeiro" />
            <label className="form-check-label">Estrangeiro</label>
          </div>
        </fieldset>
        <fieldset className="form-group">
          <label>Nome:</label>
          <input type="text" className="form-control form-control-sm" />
        </fieldset>
        <fieldset className="form-group">
          <label>CPF:</label>
          <input type="text" className="form-control form-control-sm" />
        </fieldset>
        <Endereço />
      </form>
    );
  }
}

export default DestinatárioForm;