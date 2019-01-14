import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './NotasFiscais.css';
import NFeForm from './NFeForm/NFeForm';
import NFCeForm from './NFCeForm/NFCeForm';

export default class NotasFiscais extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayNFeForm: false,
      displayNFCeForm: false,
      notas: []
    };
  }

  async componentDidMount() {
    const res = await axios.get('/api/notasfiscais');
    this.setState({ notas: res.data });
  }

  toogleDisplayNFeForm = () => {
    this.setState({ displayNFeForm: !this.state.displayNFeForm });
  }

  toogleDisplayNFCeForm = () => {
    console.log("aqui");
    this.setState({ displayNFCeForm: !this.state.displayNFCeForm });
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
    if (!this.state.displayNFeForm && !this.state.displayNFCeForm) {

      return (
        <React.Fragment>
          <header className="row">
            <div className="col-lg-12">
              <button onClick={this.toogleDisplayNFeForm} className="btn btn-success float-right">Nova NF-e</button>
              <button onClick={this.toogleDisplayNFCeForm} className="btn btn-success float-right">Nova NFC-e</button>
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

  renderNFeForm() {
    if (this.state.displayNFeForm) {
      return (
        <NFeForm toogleDisplayNFeForm={this.toogleDisplayNFeForm} />
      );
    } else {
      return null;
    }
  }

  renderNFCeForm() {
    if (this.state.displayNFCeForm) {
      return (
        <NFCeForm toogleDisplayNFCeForm={this.toogleDisplayNFCeForm} />
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <section className="NotasFiscais">
        {this.renderList()}
        {this.renderNFeForm()}
        {this.renderNFCeForm()}
      </section>
    );
  }
}