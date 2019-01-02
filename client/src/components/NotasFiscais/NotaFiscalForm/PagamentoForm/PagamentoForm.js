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
        <input type="text" className="form-control form-control-sm" />
      </fieldset>
      <fieldset className="form-group col-lg-2">
        <label>Valor Parcela:</label>
        <input type="text" className="form-control form-control-sm" />
      </fieldset>
      <fieldset className="form-group col-lg-2">
        <label>Forma:</label>
        <input type="text" className="form-control form-control-sm" />
      </fieldset>
      <fieldset className="form-group col-lg-auto">
        <button id="btnGravarPagamento" className="btn btn-success btn-sm float-right">Gravar Pagamento</button>
      </fieldset>
    </div>
    );
  }
}

export default PagamentoForm;