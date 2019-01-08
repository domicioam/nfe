import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import CurrencyInput from 'react-currency-input';
import { debug } from 'util';

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
    this.setState({ formErrors }, 
      () => {
        if (this.props.formValid(this.state)) {
          let novoProduto = {
            id: this.state.produtoId,
            quantidade: this.state.quantidade,
            descrição: produtos.filter(produto => produto.id === this.state.produtoId)[0].descrição,
            valorUnitário: this.state.valorUnitário,
            frete: this.state.frete,
            seguro: this.state.seguro,
            outros: this.state.outros,
            desconto: this.state.descontos,
            total: this.state.totalLíquido
          };
    
          this.props.produtos.push(novoProduto);
        } else {
    
        }
      });
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
        let filteredProdutos = this.props.produtos.filter(produto => produto.id === this.state.produto);
        errorMessage = filteredProdutos.length !== 0 ? "Produto duplicado" : errorMessage;
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
    if (
      prevState.quantidade !== this.state.quantidade
      || prevState.valorUnitário !== this.state.valorUnitário
    ) {
      let totalBruto = this.calcularTotalBruto(this.state.quantidade, this.state.valorUnitário);
      this.setState({ totalBruto });
    } else if (
      prevState.totalBruto !== this.state.totalBruto
      || prevState.descontos !== this.state.descontos
      || prevState.frete !== this.state.frete
      || prevState.seguro !== this.state.seguro
      || prevState.outros !== this.state.outros
    ) {
      let totalLíquido = this.calcularTotalLíquido(this.state);
      this.setState({ totalLíquido });
    } else if (
      prevState.produto !== this.state.produto
    ) {
      let id = parseInt(this.state.produto);
      let produto = produtos.filter(produto => produto.id === id);
      let valorUnitário = produto[0] ? produto[0].valorUnitário : "0";
      this.setState({ valorUnitário });
    }
  }

  calcularTotalBruto = (quantidade, valorUnitário) => {
    valorUnitário = valorUnitário ? valorUnitário.replace(".", "").replace(",", ".") : "0";
    valorUnitário = parseFloat(valorUnitário);

    let totalBruto = parseInt(quantidade) * valorUnitário;
    return totalBruto.toLocaleString("pt-BR");
  }

  calcularTotalLíquido = ({ totalBruto, descontos, frete, seguro, outros }) => {
    totalBruto = totalBruto.replace(".", "").replace(",", ".");
    totalBruto = parseFloat(totalBruto);

    descontos = descontos.replace(".", "").replace(",", ".");
    descontos = parseFloat(descontos);

    frete = frete.replace(".", "").replace(",", ".");
    frete = parseFloat(frete);

    seguro = seguro.replace(".", "").replace(",", ".");
    seguro = parseFloat(seguro);

    outros = outros.replace(".", "").replace(",", ".");
    outros = parseFloat(outros);

    return totalBruto - descontos + frete + seguro + outros;
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
  formValid: PropTypes.func.isRequired,
  produtos: PropTypes.array.isRequired
}

export default ProdutoForm;