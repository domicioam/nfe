import React, { Component } from 'react';

import { PropTypes } from 'prop-types';
import axios from 'axios';
import CurrencyInput from 'react-currency-input';

let produtos = [];

class ProdutoModal extends Component {
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
          let produtoFiltered = produtos.filter(produto => produto.id == this.state.produto);

          let novoProduto = {
            id: this.state.produto,
            quantidade: this.state.quantidade,
            descrição: produtoFiltered[0].descrição,
            valorUnitário: this.state.valorUnitário,
            frete: this.state.frete,
            seguro: this.state.seguro,
            outros: this.state.outros,
            desconto: this.state.descontos,
            total: this.state.totalLíquido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
          };

          this.props.addProduto(novoProduto);
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
        errorMessage = value.length <= 0 ? "Campo obrigatório." : "";
        errorMessage = errorMessage ? errorMessage : value < 1 ? "Valor inválido." : "";
        break;
      case "produto":
        errorMessage = value ? "" : "Campo obrigatório.";
        let filteredProdutos = this.props.produtos.filter(produto => produto.id === this.state.produto);
        errorMessage = filteredProdutos.length !== 0 ? "Produto duplicado." : errorMessage;

        break;
    }

    return errorMessage;
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    formErrors[name] = this.validateProperty(name, value);
    this.setState({ formErrors, [name]: value },
      () => {
        switch (name) {
          case "quantidade":
          case "valorUnitário":
            var totalBruto = this.calcularTotalBruto(this.state.quantidade, this.state.valorUnitário);
            this.setState({ totalBruto },
              () => {
                var totalLíquido = this.calcularTotalLíquido(this.state);
                this.setState({ totalLíquido });
              });
            break;
          case "totalBruto":
          case "descontos":
          case "frete":
          case "seguro":
          case "outros":
            let totalLíquido = this.calcularTotalLíquido(this.state);
            this.setState({ totalLíquido });
            break;
          case "produto":
            let id = parseInt(this.state.produto);
            let produto = produtos.filter(produto => produto.id === id);
            let valorUnitário = produto[0] ? produto[0].valorUnitário : "0";
            var totalBruto = this.calcularTotalBruto(this.state.quantidade, valorUnitário);
            this.setState({ valorUnitário, totalBruto },
              () => {
                var totalLíquido = this.calcularTotalLíquido(this.state);
                this.setState({ totalLíquido });
              });
            break;
        }
      });
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
      <div id="produtoModal" className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Novo Produto / Serviço</h5>
            </div>
            <div className="modal-body">
              <fieldset className="form-group col-lg-3">
                <label>Quantidade:</label>
                <input name="quantidade" type="number" className={"form-control  " + (formErrors.quantidade.length > 0 ? "form-control-invalid" : "")} value={this.state.quantidade} onChange={this.handleChange} />
                {formErrors.quantidade.length > 0 && (
                  <small className="text-danger">{formErrors.quantidade}</small>
                )}
              </fieldset>
              <fieldset className="form-group col-lg-7">
                <label>Produto:</label>
                <select className={"form-control  " + (formErrors.produto.length > 0 ? "form-control-invalid" : "")} name="produto" value={this.state.produto} onChange={this.handleChange}>
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
              <fieldset className="form-group col-lg-5">
                <label>Valor Unitário:</label>
                <div className="input-group ">
                  <div className="input-group-prepend">
                    <span className="input-group-text">R$</span>
                  </div>
                  <CurrencyInput name="valorUnitário" value={this.state.valorUnitário}
                    onChangeEvent={this.handleChange} className="form-control "
                    decimalSeparator="," thousandSeparator="." />
                </div>
              </fieldset>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
              <button onClick={this.handleSubmit} className="btn btn-primary">Gravar Produto</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProdutoModal.propTypes = {
  formValid: PropTypes.func.isRequired,
  produtos: PropTypes.array.isRequired,
  addProduto: PropTypes.func.isRequired
}

export default ProdutoModal;