import React, { Component } from 'react';
import './NFeForm.css';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Datetime from 'react-datetime';

import './react-datetime.css';
import ProdutoForm from './ProdutoForm/ProdutoForm';
import PagamentoForm from './PagamentoForm/PagamentoForm';

export default class NotaFiscalForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cabeçalho: {
        destinatário: null,
        cpfCnpj: null,
        indicadorPresença: null,
        finalidade: null,
        dataHoraSaída: null,
        naturezaOperação: null
      },
      produtos: [],
      totalProdutos: "0,00",
      pagamentos: [],
      formErrors: {
        cabeçalho: {
          destinatário: "",
          cpfCnpj: "",
          indicadorPresença: "",
          finalidade: "",
          dataHoraSaída: "",
          naturezaOperação: ""
        },
        produtos: "",
        pagamentos: ""
      }
    };

    this.addProduto = this.addProduto.bind(this);
    this.addPagamento = this.addPagamento.bind(this);
  }

  async componentDidMount() {
    const res = await axios.get('/api/destinatarios');
    destinatários = res.data;
  }

  handleSubmit = e => {
    e.preventDefault();

    let formErrors = this.validateAll();
    this.setState({ formErrors },
      () => {
        if (formValid(this.state)) {
          console.log("Formulário válido");
        }
        else {
          console.log("Formulário inválido");
        }
      });
  }

  handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      //case "field name"

      //criar componente para produtos e pagamentos
    }
  }

  addProduto(novoProduto) {
    let produtos = this.state.produtos;
    produtos.push(novoProduto);

    let totalProdutos = this.calcularTotalProdutos().toLocaleString("pt-BR", { minimumFractionDigits: 2 })
    this.setState({ produtos, totalProdutos });
  }

  addPagamento(novoPagamento) {
    let pagamentos = this.state.pagamentos;
    pagamentos.push(novoPagamento);

    this.setState({ pagamentos });
  }

  calcularTotalProdutos = () => {
    let sum = 0;

    for (let produto of this.state.produtos) {

      let total = parseFloat(produto.total
        .replace(".", "")
        .replace(",", "."));

      sum += total;
    }

    return sum;
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
      case "pagamentos":
        errorMessage = value.length <= 0 ? "Campo obrigatório." : "";
        break;
      case "produtos":
        errorMessage = value.length <= 0 ? "Campo obrigatório." : "";
        break;
    }

    return errorMessage;
  }

  renderPagamentos() {
    if (this.state.pagamentos.length != 0) {
      const pagamentos = this.state.pagamentos.map((pagamento) =>
        <tr key={pagamento.forma}>
          <td>{pagamento.parcelas}</td>
          <td>{pagamento.valorParcela}</td>
          <td>{pagamento.forma}</td>
          <td>
            <FontAwesomeIcon icon="trash" />
          </td>
        </tr>
      );

      return pagamentos;
    }
    else {
      return (
        <tr>
          <td colSpan="4" className="text-center">Nenhum pagamento adicionado.</td>
        </tr>
      );
    }
  };

  renderProdutos() {
    if (this.state.produtos.length != 0) {
      const produtos = this.state.produtos.map((produto) =>
        <tr key={produto.id}>
          <td>{produto.quantidade}</td>
          <td>{produto.descrição}</td>
          <td>{produto.valorUnitário}</td>
          <td>{produto.frete}</td>
          <td>{produto.seguro}</td>
          <td>{produto.outros}</td>
          <td>{produto.desconto}</td>
          <td>{produto.total}</td>
          <td>
            <FontAwesomeIcon icon="trash" />
          </td>
        </tr>
      );

      return produtos;
    }
    else {
      return (
        <tr>
          <td colSpan="9" className="text-center">Nenhum produto adicionado.</td>
        </tr>
      );
    }
  };

  render() {
    const { formErrors } = this.state;

    return (
      <section className="NotaFiscalForm">
        <header className="row">
          <div className="col-lg-12">
            <button onClick={this.props.toogleDisplayNFeForm} className="btn btn-secondary float-right">Voltar</button>
          </div>
        </header>
        <hr />
        <form onSubmit={this.handleSubmit} noValidate>
          <h5>Cabeçalho da Nota:</h5>
          <div id="identificação" className="row">
            <fieldset className="col-lg-auto">
              <label>Tipo: NFC-e</label>
            </fieldset>
            <fieldset className="col-lg-auto">
              <label>Série: 003</label>
            </fieldset>
            <fieldset className="col-lg-auto">
              <label>Nº: 368</label>
            </fieldset>
          </div>
          <div className="row">
            <fieldset className="form-group col-lg-4">
              <label>Destinatário:</label>
              <select className="form-control ">
                <option></option>
                {
                  destinatários.map(dest => {
                    return (<option key={dest.id} value={dest.id}>{dest.nome}</option>)
                  })
                }
              </select>
            </fieldset>
            <fieldset className="form-group col-lg-4">
              <label>CPF / CNPJ:</label>
              <input type="text" className="form-control " />
            </fieldset>
            <fieldset className="form-group col-lg-4">
              <label>Indicador Presença:</label>
              <select className="form-control ">
                <option value="presencial">Presencial</option>
                <option value="não_aplica">Não se aplica</option>
                <option value="internet">Não presencial, internet</option>
                <option value="teleatendimento">Não presencial, teleatendimento</option>
                <option value="domicílio">Entrega a domicílio</option>
                <option value="outros">Não presencial, outros</option>
              </select>
            </fieldset>
          </div>
          <div className="row">
            <fieldset className="form-group col-lg-4">
              <label>Finalidade:</label>
              <select className="form-control ">
                <option value="normal">Normal</option>
                <option value="complementar">Complementar</option>
                <option value="ajuste">Ajuste</option>
                <option value="devolução">Devolução</option>
              </select>
            </fieldset>
            <fieldset className="form-group col-lg-4">
              <label>Data / Hora Saída:</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <FontAwesomeIcon icon="calendar-alt" />
                  </div>
                </div>
                <Datetime inputProps={{ className: "form-control  input-group-input" }} />
              </div>
            </fieldset>
            <fieldset className="form-group col-lg-4">
              <label>Natureza da Operação:</label>
              <input type="text" className="form-control " />
            </fieldset>
          </div>
          <hr />
          <h5>Produtos e Serviços</h5>
          <ProdutoForm formValid={formValid} addProduto={this.addProduto} produtos={this.state.produtos} />
          <div id="tbProdutos" className={"table-responsive" + (formErrors.produtos.length > 0 ? " table-invalid" : "")}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Qtde.</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Frete</th>
                  <th>Seguro</th>
                  <th>Outros</th>
                  <th>Desconto</th>
                  <th>Total</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {this.renderProdutos()}
              </tbody>
            </table>
          </div>
          <hr />
          <h5>Formas de Pagamentos</h5>
          <PagamentoForm formValid={formValid} addPagamento={this.addPagamento} pagamentos={this.state.pagamentos} totalProdutos={this.state.totalProdutos} />
          <div className={"table-responsive" + (formErrors.pagamentos.length > 0 ? " table-invalid" : "")}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Parcelas</th>
                  <th>Valor Parcela</th>
                  <th>Forma</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {this.renderPagamentos()}
              </tbody>
            </table>
          </div>
          <div id="button-group-submit" className="row">
            <div className="col-lg-12">
              <button type="submit" className="btn btn-success  float-right">Enviar</button>
              <button type="button" onClick={this.props.toogleDisplayNFeForm} className="btn btn-secondary  float-right" data-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </form>
      </section>
    );
  }
}

const formValid = ({ formErrors }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  return valid;
};

let destinatários = [];