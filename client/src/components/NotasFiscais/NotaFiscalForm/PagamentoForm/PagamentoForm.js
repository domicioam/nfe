import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class PagamentoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qtdeParcelas: null,
      valorParcela: null,
      formaPagamento: null,
      formErrors: {
        qtdeParcelas: "",
        valorParcela: "",
        formaPagamento: ""
      }
    };
  }

  render() {
    return (
      <div className="row">
        <fieldset className="form-group col-lg-2">
          <label>Parcelas:</label>
          <input type="number" className="form-control form-control-sm" />
        </fieldset>
        <fieldset className="form-group col-lg-2">
          <label>Valor Parcela:</label>
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text">R$</span>
            </div>
            <input type="text" className="form-control form-control-sm" />
          </div>
        </fieldset>
        <fieldset className="form-group col-lg-2">
          <label>Forma:</label>
          <select className="form-control form-control-sm">
              <option value="dinheiro">Dinheiro</option>
              <option value="débito">Cartão de Débito</option>
              <option value="crédito">Cartão de Crédito</option>
              
            </select>
        </fieldset>
        <fieldset className="form-group col-lg-auto">
          <button id="btnGravarPagamento" className="btn btn-success btn-sm float-right">Gravar Pagamento</button>
        </fieldset>
      </div>
    );
  }
}

export default PagamentoForm;