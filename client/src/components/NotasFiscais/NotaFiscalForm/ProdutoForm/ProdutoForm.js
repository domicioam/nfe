import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import axios from 'axios';

let produtos = [];

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

  async componentDidMount() {
    const res = await axios.get('/api/produtos');
    produtos = res.data;
  }

  handleSubmit = e => {
    e.preventDefault();

    if(this.props.formValid(this.state)) {
      //this.props.produtos.push()
    }

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
            <input name="quantidade" type="number" className="form-control form-control-sm" value={this.state.quantidade} onChange={this.handleChange} />
            {formErrors.quantidade.length > 0 && (
              <small className="text-danger">{formErrors.quantidade}</small>
            )}
          </fieldset>
          <fieldset className="form-group col-lg-4">
            <label>Produto:</label>
            <select className="form-control form-control-sm">
              <option></option>
              {
                produtos.map(produto => {
                  return (<option key={produto.id} value={produto.id}>{produto.descrição}</option>)
                })
              }
            </select>
          </fieldset>
          <fieldset className="form-group col-lg-3">
            <label>Valor Unitário:</label>
            <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                <span className="input-group-text">R$</span>
              </div>
            <input type="text" className="form-control form-control-sm" />
            </div>
          </fieldset>
          <fieldset className="form-group col-lg-3">
            <label>Total Bruto:</label>
            <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                <span className="input-group-text">R$</span>
              </div>
            <input type="text" className="form-control form-control-sm" />
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
            <input type="text" className="form-control form-control-sm" />
            </div>
          </fieldset>
          <fieldset className="form-group col-lg-2">
            <label>Frete:</label>
            <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                <span className="input-group-text">R$</span>
              </div>
            <input type="text" className="form-control form-control-sm" />
            </div>
          </fieldset>
          <fieldset className="form-group col-lg-2">
            <label>Outros:</label>
            <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                <span className="input-group-text">R$</span>
              </div>
            <input type="text" className="form-control form-control-sm" />
            </div>
          </fieldset>
          <fieldset className="form-group col-lg-3">
            <label>Seguro:</label>
            <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                <span className="input-group-text">R$</span>
              </div>
            <input type="text" className="form-control form-control-sm" />
            </div>
          </fieldset>
          <fieldset className="form-group col-lg-3">
            <label>Total Líquido:</label>
            <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                <span className="input-group-text">R$</span>
              </div>
            <input type="text" className="form-control form-control-sm" />
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