import React, { Component } from 'react';
import './NotasFiscais.css';
import NotaFiscalModal from './NotaFiscalModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class NotasFiscais extends Component {
  render() {
    return (
      <section className="NotasFiscais">
        <header className="row">
          <div className="col-lg-12">
            <button className="btn btn-success float-right" data-toggle="modal" data-target="#exampleModal">Nova NF-e</button>
            <button className="btn btn-success float-right" data-toggle="modal" data-target="#exampleModal">Nova NFC-e</button>
          </div>
        </header>
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
            <tr>
              <td>NFC-e</td>
              <td>18500</td>
              <td>23/12/2018 20:15:16</td>
              <td>23/12/2018 20:15:16</td>
              <td>Domício Medeiros</td>
              <td>UF</td>
              <td>R$ 80,00</td>
              <td>Enviada</td>
              <td>
                <FontAwesomeIcon icon="search" />
                <FontAwesomeIcon icon="envelope" />
                <FontAwesomeIcon icon="trash" />
                <FontAwesomeIcon icon="redo" />
              </td>
            </tr>
            <tr>
              <td>NFC-e</td>
              <td>18500</td>
              <td>23/12/2018 20:15:16</td>
              <td>23/12/2018 20:15:16</td>
              <td>Domício Medeiros</td>
              <td>UF</td>
              <td>R$ 80,00</td>
              <td>Enviada</td>
              <td>
                <FontAwesomeIcon icon="search" />
                <FontAwesomeIcon icon="envelope" />
                <FontAwesomeIcon icon="trash" />
                <FontAwesomeIcon icon="redo" />
              </td>
            </tr>
            <tr>
              <td>NFC-e</td>
              <td>18500</td>
              <td>23/12/2018 20:15:16</td>
              <td>23/12/2018 20:15:16</td>
              <td>Domício Medeiros</td>
              <td>UF</td>
              <td>R$ 80,00</td>
              <td>Enviada</td>
              <td>
                <FontAwesomeIcon icon="search" />
                <FontAwesomeIcon icon="envelope" />
                <FontAwesomeIcon icon="trash" />
                <FontAwesomeIcon icon="redo" />
              </td>
            </tr><tr>
              <td>NFC-e</td>
              <td>18500</td>
              <td>23/12/2018 20:15:16</td>
              <td>23/12/2018 20:15:16</td>
              <td>Domício Medeiros</td>
              <td>UF</td>
              <td>R$ 80,00</td>
              <td>Enviada</td>
              <td>
                <FontAwesomeIcon icon="search" />
                <FontAwesomeIcon icon="envelope" />
                <FontAwesomeIcon icon="trash" />
                <FontAwesomeIcon icon="redo" />
              </td>
            </tr><tr>
              <td>NFC-e</td>
              <td>18500</td>
              <td>23/12/2018 20:15:16</td>
              <td>23/12/2018 20:15:16</td>
              <td>Domício Medeiros</td>
              <td>UF</td>
              <td>R$ 80,00</td>
              <td>Enviada</td>
              <td>
                <FontAwesomeIcon icon="search" />
                <FontAwesomeIcon icon="envelope" />
                <FontAwesomeIcon icon="trash" />
                <FontAwesomeIcon icon="redo" />
              </td>
            </tr><tr>
              <td>NFC-e</td>
              <td>18500</td>
              <td>23/12/2018 20:15:16</td>
              <td>23/12/2018 20:15:16</td>
              <td>Domício Medeiros</td>
              <td>UF</td>
              <td>R$ 80,00</td>
              <td>Enviada</td>
              <td>
                <FontAwesomeIcon icon="search" />
                <FontAwesomeIcon icon="envelope" />
                <FontAwesomeIcon icon="trash" />
                <FontAwesomeIcon icon="redo" />
              </td>
            </tr>
          </tbody>
        </table>
        <NotaFiscalModal />
      </section>
    );
  }
}