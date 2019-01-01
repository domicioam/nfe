import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class ProdutoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantidade: "",
      produto: null,
      valorUnitário: null,
      totalBruto: null,
      descontos: null,
      frete: null,
      outros: null,
      seguro: null,
      totalLíquido: null,
      formErrors: {
        quantidade: "",
        produto: "",
        valorUnitário: "",
        totalBruto: "",
        descontos: "",
        frete: "",
        outros: "",
        seguro: "",
        totalLíquido: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.formValid(this.state);

    //this.props.produtos.push()

    console.log("Aqui");
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "quantidade":
        formErrors.quantidade = value.length <= 0 || value < 1 ? "Campo obrigatório" : "";
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log("handle change"));
  }

  render() {
    const { formErrors } = this.state;

    return (
      <div>
        <div className="row">
          <fieldset className="form-group col-lg-2">
            <label>Quantidade:</label>
            <input name="quantidade" type="text" className="form-control form-control-sm" value={this.state.quantidade} onChange={this.handleChange} />
            {formErrors.quantidade.length > 0 && (
              <small className="text-danger">{formErrors.quantidade}</small>
            )}
          </fieldset>
          <fieldset className="form-group col-lg-4">
            <label>Produto:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
          <fieldset className="form-group col-lg-3">
            <label>Valor Unitário:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
          <fieldset className="form-group col-lg-3">
            <label>Total Bruto:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
        </div>
        <div className="row">
          <fieldset className="form-group col-lg-2">
            <label>Descontos:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
          <fieldset className="form-group col-lg-2">
            <label>Frete:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
          <fieldset className="form-group col-lg-2">
            <label>Outros:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
          <fieldset className="form-group col-lg-3">
            <label>Seguro:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
          <fieldset className="form-group col-lg-3">
            <label>Total Líquido:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <button onClick={this.handleSubmit} className="btn btn-success btn-sm float-right">Gravar Produto</button>
          </div>
        </div>
      </div>
    );
  }
}

ProdutoForm.propTypes = {
  formValid: PropTypes.func.isRequired
}

export default ProdutoForm;