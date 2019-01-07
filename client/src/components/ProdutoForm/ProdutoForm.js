import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import CurrencyInput from 'react-currency-input';

let produtos = [];

class ProdutoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantidade: "",
      produto: null,
      valorUnitário: "0,00",
      totalBruto: "0,00",
      descontos: "0,00",
      frete: "0,00",
      outros: "0,00",
      seguro: "0,00",
      totalLíquido: "0,00",
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

  async componentDidMount() {
    const res = await axios.get('/api/produtos');
    produtos = res.data;
  }

  handleSubmit = e => {
    e.preventDefault();

    let formErrors = this.validateAll();
    this.setState({ formErrors });

    if (this.props.formValid(this.state)) {
      //this.props.produtos.push()
    } else {

    }
  }

  validateAll = () => {
    let formErrors = { ...this.state.formErrors };

    for (let prop in this.state) {
      let value = this.state[prop];
      formErrors[prop] = this.validateProperty(prop, value);
    }

    return formErrors;
  }

  validateProperty = (name, value) => {
    let errorMessage = "";

    switch (name) {
      case "quantidade":
        errorMessage = value.length <= 0 ? "Campo obrigatório" : "";
        errorMessage = errorMessage ? errorMessage : value < 1 ? "Valor inválido" : "";
        break;
      case "produto":
        errorMessage = value ? "" : "Campo obrigatório";
        break;
    }

    return errorMessage;
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    formErrors[name] = this.validateProperty(name, value);
    this.setState({ formErrors, [name]: value });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.quantidade !== this.state.quantidade || prevState.valorUnitário !== this.state.valorUnitário) {
      let totalBruto = this.calcularTotalBruto(this.state.quantidade, this.state.valorUnitário);
      this.setState({ totalBruto });
    }
  }

  calcularTotalBruto = (quantidade ,valorUnitário) => {
    valorUnitário = valorUnitário.replace(".", "").replace(",", ".");
    valorUnitário = parseFloat(valorUnitário);

    return parseInt(quantidade) * valorUnitário;
  }

  render() {
    const { formErrors } = this.state;

    return (
      <div>
        <div className="row">
          <fieldset className="form-group col-lg-2">
            <label>Quantidade:</label>
            <input name="quantidade" type="number" className="form-control form-control-sm" value={this.state.quantidade} onChange={this.handleChange} />
            {formErrors.quantidade.length > 0 && (
              <small className="text-danger">{formErrors.quantidade}</small>
            )}
          </fieldset>
          <fieldset className="form-group col-lg-4">
            <label>Produto:</label>
            <select className="form-control form-control-sm" name="produto" value={this.state.produto} onChange={this.handleChange}>
              <option></option>
              {
                produtos.map(produto => {
                  return (<option key={produto.id} value={produto.id}>{produto.descrição}</option>)
                })
              }
            </select>
            {formErrors.produto.length > 0 && (
              <small className="text-danger">{formErrors.produto}</small>
            )}
          </fieldset>
          <fieldset className="form-group col-lg-3">
            <label>Valor Unitário:</label>
            <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                <span className="input-group-text">R$</span>
              </div>
              <CurrencyInput name="valorUnitário" value={this.state.valorUnitário}
                onChangeEvent={this.handleChange} className="form-control form-control-sm"
                decimalSeparator="," thousandSeparator="." />
            </div>
          </fieldset>
          <fieldset className="form-group col-lg-3">
            <label>Total Bruto:</label>
            <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                <span className="input-group-text">R$</span>
              </div>
              <CurrencyInput name="totalBruto" value={this.state.totalBruto}
                onChangeEvent={this.handleChange} className="form-control form-control-sm"
                decimalSeparator="," thousandSeparator="." />
            </div>
          </fieldset>
        </div>
        <div className="row">
          <fieldset className="form-group col-lg-2">
            <label>Descontos:</label>
            <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                <span className="input-group-text">R$</span>
              </div>
              <CurrencyInput name="descontos" value={this.state.descontos}
                onChangeEvent={this.handleChange} className="form-control form-control-sm"
                decimalSeparator="," thousandSeparator="." />
            </div>
          </fieldset>
          <fieldset className="form-group col-lg-2">
            <label>Frete:</label>
            <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                <span className="input-group-text">R$</span>
              </div>
              <CurrencyInput name="frete" value={this.state.frete}
                onChangeEvent={this.handleChange} className="form-control form-control-sm"
                decimalSeparator="," thousandSeparator="." />
            </div>
          </fieldset>
          <fieldset className="form-group col-lg-2">
            <label>Outros:</label>
            <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                <span className="input-group-text">R$</span>
              </div>
              <CurrencyInput name="outros" value={this.state.outros}
                onChangeEvent={this.handleChange} className="form-control form-control-sm"
                decimalSeparator="," thousandSeparator="." />
            </div>
          </fieldset>
          <fieldset className="form-group col-lg-3">
            <label>Seguro:</label>
            <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                <span className="input-group-text">R$</span>
              </div>
              <CurrencyInput name="seguro" value={this.state.seguro}
                onChangeEvent={this.handleChange} className="form-control form-control-sm"
                decimalSeparator="," thousandSeparator="." />
            </div>
          </fieldset>
          <fieldset className="form-group col-lg-3">
            <label>Total Líquido:</label>
            <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                <span className="input-group-text">R$</span>
              </div>
              <CurrencyInput name="totalLíquido" value={this.state.totalLíquido}
                onChangeEvent={this.handleChange} className="form-control form-control-sm"
                decimalSeparator="," thousandSeparator="." />
            </div>
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