import React, { Component } from 'react';

import './Endereço.css';

class Endereço extends Component {
  render() {
    return (
      <section className="Endereço">
        <h6>Endereço</h6>
        <div className="row">
          <fieldset className="form-group col">
            <label>Logradouro:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
          <fieldset className="form-group col">
            <label>Número:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
          <fieldset className="form-group col">
            <label>Bairro:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
        </div>
        <div className="row">
          <fieldset className="form-group col">
            <label>UF:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
          <fieldset className="form-group col">
            <label>Município:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
          <fieldset className="form-group col">
            <label>CEP:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
          <fieldset className="form-group col">
            <label>Telefone:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
        </div>
        <div className="row">
          <fieldset className="form-group col">
            <label>E-mail:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
        </div>
      </section>
    );
  }
}

export default Endereço;