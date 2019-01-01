import React, { Component } from 'react';
import './NotaFiscalForm.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const formValid = ({ formErrors }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  return valid;
};

export default class NotaFiscalForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cabeçalho: {
        destinatário: null,
        cpfCnpj: null,
        indicadorPresença: null,
        dataHoraEmissão: null,
        finalidade: null,
        dataHoraSaída: null,
        naturezaOperação: null,
        tipoImpressão: null
      },
      produto: {
        quantidade: null,
        produto: null,
        valorUnitário: null,
        totalBruto: null,
        descontos: null,
        frete: null,
        outros: null,
        seguro: null,
        totalLíquido: null
      },
      produtos: [],
      pagamento: {
        qtdeParcelas: null,
        valorParcela: null,
        formaPagamento: null
      },
      pagamentos: [],
      formErrors: {
        cabeçalho: {
          destinatário: "",
          cpfCnpj: "",
          indicadorPresença: "",
          dataHoraEmissão: "",
          finalidade: "",
          dataHoraSaída: "",
          naturezaOperação: "",
          tipoImpressão: ""
        },
        produto: {
          quantidade: "",
          produto: "",
          valorUnitário: "",
          totalBruto: "",
          descontos: "",
          frete: "",
          outros: "",
          seguro: "",
          totalLíquido: ""
        },
        produtos: "",
        pagamento: {
          qtdeParcelas: "",
          valorParcela: "",
          formaPagamento: ""
        },
        pagamentos: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if(formValid(this.state)) {
      console.log("Formulário válido");
    }
    else {
      console.log("Formulário inválido");
    }
  }

  handleChange = e => {
    e.preventDefault();

    const { name, value} = e.target;
    let formErrors = { ...this.state.formErrors };

    switch(name) {
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
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
          <fieldset className="form-group col-lg-4">
            <label>CPF / CNPJ:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
          <fieldset className="form-group col-lg-4">
            <label>Indicador Presença:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
        </div>
        <div className="row">
          <fieldset className="form-group col-lg-4">
            <label>Data / Hora Emissão:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
          <fieldset className="form-group col-lg-4">
            <label>Finalidade:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
          <fieldset className="form-group col-lg-4">
            <label>Data / Hora Saída:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
        </div>
        <div className="row">
          <fieldset className="form-group col-lg-4">
            <label>Natureza da Operação:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
          <fieldset className="form-group col-lg-4">
            <label>Tipo de Impressão:</label>
            <input type="text" className="form-control form-control-sm" />
          </fieldset>
        </div>
        <hr />
        <h6>Produtos e Serviços</h6>
        <div className="row">
          <fieldset className="form-group col-lg-2">
            <label>Quantidade:</label>
            <input type="text" className="form-control form-control-sm" />
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
            <button className="btn btn-success btn-sm float-right">Gravar Produto</button>
          </div>
        </div>
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