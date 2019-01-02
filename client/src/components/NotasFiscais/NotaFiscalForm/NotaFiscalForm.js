import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './NotaFiscalForm.css';
import ProdutoForm from './ProdutoForm/ProdutoForm';
import PagamentoForm from './PagamentoForm/PagamentoForm';

const formValid = ({ formErrors }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  return valid;
};

let destinatários = [];

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
  }

  async componentDidMount() {
    const res = await axios.get('/api/destinatarios');
    destinatários = res.data;
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log("Formulário válido");
    }
    else {
      console.log("Formulário inválido");
    }
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

  render() {
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <h6>Cabeçalho da Nota:</h6>
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
            <select className="form-control form-control-sm">
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
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
          <fieldset className="form-group col-lg-4">
            <label>Indicador Presença:</label>
            <select className="form-control form-control-sm">
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
            <select className="form-control form-control-sm">
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
              <input type="text" className="form-control form-control-sm" />
            </div>
          </fieldset>
          <fieldset className="form-group col-lg-4">
            <label>Natureza da Operação:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
        </div>
        <hr />
        <h6>Produtos e Serviços</h6>
        <ProdutoForm formValid={formValid} produtos={this.state.produtos} />
        <table id="tbProdutos" className="table table-striped">
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
            <tr>
              <td>01</td>
              <td>Gás P13</td>
              <td>65,00</td>
              <td>0,00</td>
              <td>0,00</td>
              <td>0,00</td>
              <td>0,00</td>
              <td>65,00</td>
              <td>
                <FontAwesomeIcon icon="trash" />
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <h6>Formas de Pagamentos</h6>
        <PagamentoForm formValid={formValid} pagamentos={this.state.pagamentos} />
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
            <tr>
              <td>01</td>
              <td>65,00</td>
              <td>Dinheiro</td>
              <td>
                <FontAwesomeIcon icon="trash" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}