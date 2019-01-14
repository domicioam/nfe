import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './NotasFiscais.css';
import NotaFiscalForm from '../NotaFiscalForm/NotaFiscalForm';

export default class NotasFiscais extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayForm: false,
      notas: []
    };
  }

  async componentDidMount() {
    const res = await axios.get('/api/notasfiscais');
    this.setState({ notas: res.data });
  }

  toogleDisplayForm = () => {
    this.setState({ displayForm: !this.state.displayForm });
  }

  renderContent() {
    const notas = this.state.notas.map((nota) =>
      <tr key={nota.id}>
        <td>{nota.modelo}</td>
        <td>{nota.número}</td>
        <td>{nota.dataHoraEmissão}</td>
        <td>{nota.dataHoraAutorização}</td>
        <td>{nota.destinatário}</td>
        <td>{nota.UF}</td>
        <td>{nota.valor}</td>
        <td>{nota.status}</td>
        <td>
          <FontAwesomeIcon icon="search" />
          <FontAwesomeIcon icon="envelope" />
          <FontAwesomeIcon icon="trash" />
          <FontAwesomeIcon icon="redo" />
        </td>
      </tr>
    );

    return notas;
  }

  renderList() {
    if (!this.state.displayForm) {

      return (
        <React.Fragment>
          <header className="row">
            <div className="col-lg-12">
              <button onClick={this.toogleDisplayForm} className="btn btn-success float-right">Nova NF-e</button>
              <button onClick={this.toogleDisplayForm} className="btn btn-success float-right">Nova NFC-e</button>
            </div>
          </header>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Modelo</th>
                  <th>Número</th>
                  <th>Data / Hora Emissão</th>
                  <th>Data / Hora Autorização</th>
                  <th>Destinatário</th>
                  <th>UF</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {this.renderContent()}
              </tbody>
            </table>
          </div>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }

  renderForm() {
    if (this.state.displayForm) {
      return (
        <NotaFiscalForm toogleDisplayForm={this.toogleDisplayForm} />
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <section className="NotasFiscais">
        {this.renderList()}
        {this.renderForm()}
      </section>
    );
  }
}