import React, { Component } from 'react';
import './NFCeForm.css';
import ProdutoModal from './ProdutoModal';
import PagamentoModal from './PagamentoModal';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './react-datetime.css';

export default class NFCeForm extends Component {
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
      showProdutoModal: false,
      showPagamentoModal: false,
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
    this.closeProdutoModal = this.closeProdutoModal.bind(this);
    this.openProdutoModal = this.openProdutoModal.bind(this);
    this.closePagamentoModal = this.closePagamentoModal.bind(this);
    this.openPagamentoModal = this.openPagamentoModal.bind(this);
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
    this.setState({ produtos, totalProdutos, showProdutoModal: false });
  }

  addPagamento(novoPagamento) {
    let pagamentos = this.state.pagamentos;
    pagamentos.push(novoPagamento);

    this.setState({ pagamentos, showPagamentoModal: false });
  }

  openProdutoModal(e) {
    e.preventDefault();
    this.setState({ showProdutoModal: true });
  }

  closeProdutoModal(e) {
    e.preventDefault();
    this.setState({ showProdutoModal: false });
  }

  openPagamentoModal(e) {
    e.preventDefault();
    this.setState({ showPagamentoModal: true });
  }

  closePagamentoModal(e) {
    e.preventDefault();
    this.setState({ showPagamentoModal: false });
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
          <td colSpan="5" className="text-center">Nenhum produto adicionado.</td>
        </tr>
      );
    }
  };

  render() {
    const { formErrors } = this.state;

    return (
      <section className="NFCeForm">
        <header>
          <h2 className="pt-3">Enviar Nova NFC-e</h2>
          <hr />
        </header>
        <form onSubmit={this.handleSubmit} noValidate>
          <section>

            <h5 className="h5-centered">Destinatário</h5>
            <fieldset className="form-group col-lg-3">
              <label>Nome:</label>
              <select className="form-control ">
                <option></option>
                {
                  destinatários.map(dest => {
                    return (<option key={dest.id} value={dest.id}>{dest.nome}</option>)
                  })
                }
              </select>
            </fieldset>
            <fieldset className="form-group col-lg-3">
              <label>CPF / CNPJ:</label>
              <input type="text" className="form-control " />
            </fieldset>
          </section>
          <hr />
          <section>
            <h5 className="h5-centered">Produtos e Serviços</h5>
            <div id="tbProdutos" className={"table-responsive" + (formErrors.produtos.length > 0 ? " table-invalid" : "")}>
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Quantidade</th>
                    <th>Produto</th>
                    <th>Valor</th>
                    <th>Total</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderProdutos()}
                </tbody>
              </table>
            </div>
            <button onClick={this.openProdutoModal} className="btn btn-primary btn-bellow-table">Adicionar novo produto</button>
          </section>
          <hr />
          <section>
            <h5 className="h5-centered">Pagamentos</h5>
            <div className={"table-responsive" + (formErrors.pagamentos.length > 0 ? " table-invalid" : "")}>
              <table className="table">
                <thead className="thead-light">
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
            <button onClick={this.openPagamentoModal} className="btn btn-primary btn-bellow-table">Adicionar novo pagamento</button>
          </section>
          <hr />
          <div id="button-group-submit" className="row">
            <div className="col-lg-12">
              <button type="submit" className="btn btn-success  float-right" style={{ width: "150px" }}>Enviar Nota Fiscal</button>
            </div>
          </div>
          {this.state.showProdutoModal && (<ProdutoModal formValid={formValid} addProduto={this.addProduto}
            closeProdutoModal={this.closeProdutoModal} produtos={this.state.produtos} />)}
          {this.state.showPagamentoModal && (<PagamentoModal formValid={formValid} addPagamento={this.addPagamento}
            closePagamentoModal={this.closePagamentoModal} pagamentos={this.state.pagamentos} totalProdutos={this.state.totalProdutos} />)}
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