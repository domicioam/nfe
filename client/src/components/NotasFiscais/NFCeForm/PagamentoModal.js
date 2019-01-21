import React, { Component } from 'react';
import CurrencyInput from 'react-currency-input';
import { PropTypes } from 'prop-types';

class PagamentoModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parcelas: 1,
      valorParcela: this.props.totalProdutos,
      formaPagamento: "Dinheiro",
      formErrors: {
        parcelas: "",
        valorParcela: "",
        formaPagamento: ""
      }
    };
  }

  componentDidUpdate(prevPros) {
    if (prevPros.totalProdutos !== this.props.totalProdutos) {
      this.setState({ valorParcela: this.props.totalProdutos });
    }
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    formErrors[name] = this.validateProperty(name, value);
    this.setState({ formErrors, [name]: value });
  }

  handleSubmit = e => {
    e.preventDefault();

    let formErrors = this.validateAll();
    this.setState({ formErrors },
      () => {
        if (this.props.formValid(this.state)) {
          let novoPagamento = {
            parcelas: this.state.parcelas,
            valorParcela: this.state.valorParcela.toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
            forma: this.state.formaPagamento
          };

          this.props.addPagamento(novoPagamento);
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
      case "parcelas":
        errorMessage = value.length == 0 ? "Campo obrigatório." : "";
        errorMessage = errorMessage ? errorMessage : value < 1 ? "Valor inválido." : "";
        break;
      case "valorParcela":
        errorMessage = value.length == 0 || value == "0,00" ? "Campo obrigatório." : "";
        break;
      case "formaPagamento":
        errorMessage = value ? "" : "Campo obrigatório.";
        let filteredPagamentos = this.props.pagamentos.filter(pagamento => pagamento.forma === value);
        errorMessage = filteredPagamentos.length !== 0 ? "Pagamento duplicado." : errorMessage;
        break;
    }

    return errorMessage;
  }

  render() {
    const { formErrors } = this.state;

    return (
      <div className="modal fade show" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Novo Produto / Serviço</h5>
            </div>
            <div className="modal-body">
              <fieldset className="form-group col-lg-3">
                <label>Parcelas:</label>
                <input type="number" name="parcelas" value={this.state.parcelas} onChange={this.handleChange} className={"form-control  " + (formErrors.parcelas.length > 0 ? "form-control-invalid" : "")} />
                {formErrors.parcelas.length > 0 && (
                  <small className="text-danger">{formErrors.parcelas}</small>
                )}
              </fieldset>
              <fieldset className="form-group col-lg-5">
                <label>Valor Parcela:</label>
                <div className="input-group  ">
                  <div className="input-group-prepend">
                    <span className="input-group-text">R$</span>
                  </div>
                  <CurrencyInput name="valorParcela" value={this.state.valorParcela}
                    onChangeEvent={this.handleChange} className={"form-control  " + (formErrors.valorParcela.length > 0 ? "input-group-form-invalid" : "")}
                    decimalSeparator="," thousandSeparator="." />
                  {formErrors.valorParcela.length > 0 && (
                    <small className="text-danger">{formErrors.valorParcela}</small>
                  )}
                </div>
              </fieldset>
              <fieldset className="form-group col-lg-7">
                <label>Forma:</label>
                <select className={"form-control  " + (formErrors.formaPagamento.length > 0 ? "form-control-invalid" : "")}
                  value={this.state.formaPagamento} onChange={this.handleChange}>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão de Débito">Cartão de Débito</option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                </select>
                {formErrors.formaPagamento.length > 0 && (
                  <small className="text-danger">{formErrors.formaPagamento}</small>
                )}
              </fieldset>
            </div>
            <div className="modal-footer">
              <button onClick={this.props.closePagamentoModal} type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
              <button onClick={this.handleSubmit} className="btn btn-primary">Gravar Pagamento</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PagamentoModal.propTypes = {
  formValid: PropTypes.func.isRequired,
  pagamentos: PropTypes.array.isRequired,
  addPagamento: PropTypes.func.isRequired
}

export default PagamentoModal;