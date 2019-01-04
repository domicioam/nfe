import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './NotasFiscais.css';
import NotaFiscalModal from '../NotaFiscalModal/NotaFiscalModal';

export default class NotasFiscais extends Component {
  constructor(props) {
    super(props);

    this.state = { notas: [] };
  }

  async componentDidMount() {
    const res = await axios.get('/api/notasfiscais');
    this.setState({ notas: res.data });
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

  render() {
    return (
      <section className="NotasFiscais">
        <header className="row">
          <div className="col-lg-12">
            <button className="btn btn-success float-right" data-toggle="modal" data-target="#exampleModal">Nova NF-e</button>
            <button className="btn btn-success float-right" data-toggle="modal" data-target="#exampleModal">Nova NFC-e</button>
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
        <NotaFiscalModal />
      </section>
    );
  }
}