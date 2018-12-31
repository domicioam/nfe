import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Destinatários.css';
import DestinatárioModal from './DestinatárioModal/DestinatárioModal';

class Destinatários extends Component {
  render() {
    return (
      <section className="Destinatários">
        <header className="row">
          <div className="col-lg-12">
            <button className="btn btn-success float-right" data-toggle="modal" data-target="#exampleModal">Novo Destinatário</button>
          </div>
        </header>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome / Razão Social</th>
              <th>Documento</th>
              <th>Município</th>
              <th>UF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SUPERGASBRAS ENERGIA LTDA</td>
              <td>19791896000526</td>
              <td>Brasília</td>
              <td>DF</td>
              <td>
                <FontAwesomeIcon icon="edit" />
                <FontAwesomeIcon icon="trash" />
              </td>
            </tr>
            <tr>
              <td>SUPERGASBRAS ENERGIA LTDA</td>
              <td>19791896000526</td>
              <td>Brasília</td>
              <td>DF</td>
              <td>
                <FontAwesomeIcon icon="edit" />
                <FontAwesomeIcon icon="trash" />
              </td>
            </tr>
            <tr>
              <td>SUPERGASBRAS ENERGIA LTDA</td>
              <td>19791896000526</td>
              <td>Brasília</td>
              <td>DF</td>
              <td>
                <FontAwesomeIcon icon="edit" />
                <FontAwesomeIcon icon="trash" />
              </td>
            </tr>
            <tr>
              <td>SUPERGASBRAS ENERGIA LTDA</td>
              <td>19791896000526</td>
              <td>Brasília</td>
              <td>DF</td>
              <td>
                <FontAwesomeIcon icon="edit" />
                <FontAwesomeIcon icon="trash" />
              </td>
            </tr>
            <tr>
              <td>SUPERGASBRAS ENERGIA LTDA</td>
              <td>19791896000526</td>
              <td>Brasília</td>
              <td>DF</td>
              <td>
                <FontAwesomeIcon icon="edit" />
                <FontAwesomeIcon icon="trash" />
              </td>
            </tr>
            <tr>
              <td>SUPERGASBRAS ENERGIA LTDA</td>
              <td>19791896000526</td>
              <td>Brasília</td>
              <td>DF</td>
              <td>
                <FontAwesomeIcon icon="edit" />
                <FontAwesomeIcon icon="trash" />
              </td>
            </tr>
          </tbody>
        </table>
        <DestinatárioModal />
      </section>
    );
  };
}

export default Destinatários;